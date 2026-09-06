// ============================================================
// AdhiNav — Main Application Controller
// Screen management, QR scanning, navigation engine, AI chat
// ============================================================

// ── Config ─────────────────────────────────────────────────
const GROQ_API_KEY = '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';

// ── State ──────────────────────────────────────────────────
let currentScreen = 'screen-landing';
let currentLocationId = null;
let selectedDestinationId = null;
let selectedManualLocationId = null;
let navSession = null;
let qrScanner = null;
let scannerActive = false;

// ── Screen Manager ─────────────────────────────────────────

function showScreen(screenId) {
  // Hide current screen
  const allScreens = document.querySelectorAll('.screen');
  allScreens.forEach(s => s.classList.remove('active'));

  // Show new screen
  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add('active');
    currentScreen = screenId;

    // Trigger screen-specific setup
    onScreenEnter(screenId);
  }
}

function onScreenEnter(screenId) {
  switch (screenId) {
    case 'screen-scanner':
      startQRScanner();
      break;
    case 'screen-manual-location':
      populateManualLocations();
      break;
    case 'screen-destination':
      populateDestinations();
      updateCurrentLocationDisplay();
      break;
    case 'screen-navigation':
      // Navigation setup happens in startNavigation()
      break;
    default:
      stopQRScanner();
      break;
  }

  // Stop scanner when leaving scanner screen
  if (screenId !== 'screen-scanner') {
    stopQRScanner();
  }
}


// ── QR Scanner ─────────────────────────────────────────────

function startQRScanner() {
  // Reset scan UI
  document.getElementById('scan-result').classList.add('hidden');
  document.getElementById('scan-confirm').classList.add('hidden');

  if (scannerActive) return;

  try {
    qrScanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
        showTorchButtonIfSupported: true,
        rememberLastUsedCamera: true
      },
      false // verbose
    );

    qrScanner.render(onScanSuccess, onScanError);
    scannerActive = true;
  } catch (e) {
    console.error('Failed to start QR scanner:', e);
    showToast('📷 Camera access needed for scanning', 'warning');
  }
}

function stopQRScanner() {
  if (qrScanner && scannerActive) {
    try {
      qrScanner.clear();
    } catch (e) {
      // Ignore cleanup errors
    }
    scannerActive = false;
  }
}

function onScanSuccess(decodedText, decodedResult) {
  // Parse QR code
  const location = parseQRCode(decodedText);

  if (location) {
    // Valid AdhiNav QR code
    currentLocationId = location.id;
    stopQRScanner();
    showToast(`📍 Scanned: ${location.name}`, 'success');
    showScreen('screen-destination');
  } else {
    // Not an AdhiNav QR code
    document.getElementById('scan-result').classList.remove('hidden');
    document.getElementById('scan-result').innerHTML = `
      <div class="scan-result" style="background: rgba(239, 68, 68, 0.08); border-color: rgba(239, 68, 68, 0.2);">
        <span class="icon">❌</span>
        <div class="info">
          <div class="label">Not recognized</div>
          <div class="value" style="color: var(--accent-danger);">This QR code is not an AdhiNav location</div>
        </div>
      </div>
    `;
  }
}

function onScanError(errorMessage) {
  // Ignore continuous scan errors (they fire constantly when no QR is in frame)
}


// ── Manual Location Selection ──────────────────────────────

function populateManualLocations() {
  selectedManualLocationId = null;
  document.getElementById('btn-manual-confirm').classList.add('hidden');
  document.getElementById('manual-search').value = '';
  renderManualLocationList(getScannableLocations());
}

function renderManualLocationList(locations) {
  const list = document.getElementById('manual-location-list');
  const grouped = {};

  locations.forEach(loc => {
    const blockName = BLOCKS[loc.block] || loc.block;
    if (!grouped[blockName]) grouped[blockName] = [];
    grouped[blockName].push(loc);
  });

  let html = '';
  Object.entries(grouped).forEach(([blockName, locs]) => {
    html += `<div class="dest-group-label">${blockName}</div>`;
    locs.forEach(loc => {
      const iconClass = getBlockIconClass(loc.block);
      const icon = getLocationIcon(loc);
      const isSelected = selectedManualLocationId === loc.id;
      html += `
        <div class="dest-item ${isSelected ? 'selected' : ''}" onclick="selectManualLocation('${loc.id}')">
          <div class="dest-icon ${iconClass}">${icon}</div>
          <div>
            <div class="dest-name">${loc.name}</div>
            <div class="dest-block">${getLocationTypeName(loc.type)}</div>
          </div>
        </div>
      `;
    });
  });

  if (!locations.length) {
    html = `
      <div class="no-results">
        <div class="icon">🔍</div>
        <p>No locations found</p>
      </div>
    `;
  }

  list.innerHTML = html;
}

function filterManualLocations(query) {
  const q = query.toLowerCase().trim();
  let locations = getScannableLocations();

  if (q) {
    locations = locations.filter(loc => {
      if (loc.id.toLowerCase().includes(q)) return true;
      if (loc.name.toLowerCase().includes(q)) return true;
      if (loc.aliases.some(a => a.includes(q))) return true;
      return false;
    });
  }

  renderManualLocationList(locations);
}

function selectManualLocation(locId) {
  currentLocationId = locId;
  showScreen('screen-destination');
}


// ── Destination Selection ──────────────────────────────────

function populateDestinations() {
  selectedDestinationId = null;
  document.getElementById('btn-navigate').classList.add('hidden');
  document.getElementById('dest-search').value = '';
  renderDestinationList(getSelectableLocations());
}

function renderDestinationList(locations) {
  const list = document.getElementById('destination-list');

  // Filter out current location
  const filtered = locations.filter(loc => loc.id !== currentLocationId);

  const grouped = {};
  filtered.forEach(loc => {
    const blockName = BLOCKS[loc.block] || loc.block;
    if (!grouped[blockName]) grouped[blockName] = [];
    grouped[blockName].push(loc);
  });

  let html = '';
  Object.entries(grouped).forEach(([blockName, locs]) => {
    html += `<div class="dest-group-label">${blockName}</div>`;
    locs.forEach(loc => {
      const iconClass = getBlockIconClass(loc.block);
      const icon = getLocationIcon(loc);
      const isSelected = selectedDestinationId === loc.id;
      html += `
        <div class="dest-item ${isSelected ? 'selected' : ''}" onclick="selectDestination('${loc.id}', this)">
          <div class="dest-icon ${iconClass}">${icon}</div>
          <div>
            <div class="dest-name">${loc.name}</div>
            <div class="dest-block">${BLOCKS[loc.block] || loc.block} · ${getLocationTypeName(loc.type)}</div>
          </div>
        </div>
      `;
    });
  });

  if (!filtered.length) {
    html = `
      <div class="no-results">
        <div class="icon">🔍</div>
        <p>No destinations found</p>
      </div>
    `;
  }

  list.innerHTML = html;
}

function filterDestinations(query) {
  const q = query.toLowerCase().trim();
  let locations = getSelectableLocations();

  if (q) {
    locations = locations.filter(loc => {
      if (loc.id.toLowerCase().includes(q)) return true;
      if (loc.name.toLowerCase().includes(q)) return true;
      if (loc.aliases.some(a => a.includes(q))) return true;
      return false;
    });
  }

  renderDestinationList(locations);
}

function selectDestination(locId, element) {
  selectedDestinationId = locId;
  startNavigation();
}

function updateCurrentLocationDisplay() {
  const loc = getLocationById(currentLocationId);
  if (loc) {
    document.getElementById('current-location-display').textContent = loc.name;
  }
}

function goBackFromDestination() {
  showScreen('screen-landing');
}


// ── Navigation Engine ──────────────────────────────────────

function startNavigation() {
  if (!currentLocationId || !selectedDestinationId) return;

  // Create navigation session
  navSession = new NavigationSession(currentLocationId, selectedDestinationId);

  if (!navSession.hasPath()) {
    showToast('❌ No path found between these locations', 'error');
    return;
  }

  // Set route display
  document.getElementById('nav-from').textContent = navSession.startLocation?.name || currentLocationId;
  document.getElementById('nav-to').textContent = navSession.endLocation?.name || selectedDestinationId;

  // Show navigation screen
  showScreen('screen-navigation');

  // Render first step
  renderCurrentStep();

  // Reset AI chat
  resetAIChat();
}

function renderCurrentStep() {
  if (!navSession) return;

  const step = navSession.getCurrentStep();
  if (!step) return;

  // Update step counter
  const total = navSession.getTotalSteps();
  const current = navSession.currentStepIndex + 1;
  document.getElementById('step-counter').textContent = `Step ${current} of ${total}`;

  // Update progress bar
  document.getElementById('progress-fill').style.width = `${navSession.getProgress()}%`;

  // Update instruction
  document.getElementById('instruction-icon').textContent = getStepIcon(step, current, total);
  document.getElementById('instruction-text').textContent = step.instruction;
  document.getElementById('instruction-location').textContent = step.location?.name || step.nodeId || '';

  // Update card state
  const card = document.getElementById('instruction-card');
  card.classList.remove('complete');
  if (current === total) {
    card.classList.add('complete');
  }

  // Animate instruction
  card.style.animation = 'none';
  card.offsetHeight; // Trigger reflow
  card.style.animation = 'fadeSlideIn 0.3s ease both';

  // Update button states
  document.getElementById('btn-prev').disabled = !navSession.canGoPrevious();
  document.getElementById('btn-next').disabled = !navSession.canGoNext();

  // Update "I Reached" button label based on step position
  const reachedBtn = document.getElementById('btn-reached');
  if (current === total) {
    document.getElementById('btn-next').disabled = true;
    reachedBtn.innerHTML = '🏁 I\'ve Arrived!';
  } else {
    reachedBtn.innerHTML = '✅ I Reached Here';
  }
}

function navNext() {
  if (navSession && navSession.canGoNext()) {
    navSession.next();
    renderCurrentStep();
  }
}

function navPrevious() {
  if (navSession && navSession.canGoPrevious()) {
    navSession.previous();
    renderCurrentStep();
  }
}

function navReached() {
  if (!navSession) return;

  // If on the last step, mark complete and show success
  if (!navSession.canGoNext()) {
    navSession.markReached();
    const destLoc = navSession.endLocation;
    document.getElementById('success-destination').textContent =
      `You've successfully navigated to ${destLoc?.name || 'your destination'}`;
    showScreen('screen-success');
    showToast('🎉 Navigation complete!', 'success');
  } else {
    // Otherwise, advance to the next step ("I reached this point")
    navSession.next();
    renderCurrentStep();
    showToast('✅ Great! Here\'s your next step', 'success');
  }
}

function navLost() {
  if (!navSession) return;

  // Get nearby scan points
  const nearbyPoints = getNearbyScanPoints(
    navSession.getCurrentStep()?.nodeId || currentLocationId
  );

  const listEl = document.getElementById('scan-points-list');
  listEl.innerHTML = nearbyPoints.map(loc => `
    <div class="scan-point-item">
      <span class="icon">📌</span>
      <span>${loc.name}</span>
    </div>
  `).join('');

  showScreen('screen-lost');
}

function returnToNavigation() {
  showScreen('screen-navigation');
}

function rescanQR() {
  // Go back to scanner, but keep current nav session alive
  showScreen('screen-scanner');
}

function exitNavigation() {
  navSession = null;
  showScreen('screen-landing');
}

function navigateAgain() {
  // Keep current location, go to destination picker
  if (navSession) {
    currentLocationId = navSession.endId;
  }
  selectedDestinationId = null;
  showScreen('screen-destination');
}


// ── AI Chat (Groq Integration) ─────────────────────────────

function toggleAIChat() {
  const panel = document.getElementById('ai-chat-panel');
  panel.classList.toggle('open');

  const btn = document.getElementById('ai-toggle');
  btn.textContent = panel.classList.contains('open')
    ? '🤖 Hide AI Assistant'
    : '🤖 Ask AI Assistant for Help';
}

function resetAIChat() {
  document.getElementById('chat-messages').innerHTML = `
    <div class="chat-bubble ai">
      <div class="ai-label">AI Assistant</div>
      Hi! I'm here to help you navigate. Ask me anything about directions, rooms, or the campus! 😊
    </div>
  `;
  document.getElementById('ai-chat-panel').classList.remove('open');
  document.getElementById('ai-toggle').textContent = '🤖 Ask AI Assistant for Help';
}

async function sendChat() {
  const input = document.getElementById('chat-input');
  const message = input.value.trim();
  if (!message) return;

  const apiKey = GROQ_API_KEY;

  // Add user message
  addChatBubble(message, 'user');
  input.value = '';

  // Show typing indicator
  const typingId = addTypingIndicator();

  try {
    const context = navSession ? navSession.getContextForAI() : {};

    const systemPrompt = buildAISystemPrompt(context);

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 300
      })
    });

    removeTypingIndicator(typingId);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const aiMessage = data.choices?.[0]?.message?.content || 'Sorry, I couldn\'t process that. Try again!';

    addChatBubble(aiMessage, 'ai');

  } catch (error) {
    removeTypingIndicator(typingId);
    console.error('AI Chat error:', error);

    if (error.message.includes('401')) {
      addChatBubble('⚠️ Invalid API key. Please check your Groq API key in Settings.', 'ai');
    } else {
      addChatBubble('😔 Sorry, I couldn\'t connect to the AI service. Please check your internet connection and try again.', 'ai');
    }
  }
}

function buildAISystemPrompt(context) {
  return `You are AdhiNav AI, a friendly and helpful campus navigation assistant for ACET (Adhiparasakthi College of Engineering and Technology). You help students and visitors find their way around campus.

CAMPUS LAYOUT:
- Main Block (MB): Central building. The Main Entrance (West Portico) is on the WEST side. East Portico is on the EAST side. Rooms are named MBxyz where x=floor, yz=room number.
  - The main staircase is located immediately inside the West Entrance.
  - The left-most room (North side) of each floor is always the Girls Restroom.
  - The right-most room (South side) of each floor is always the Boys Restroom.
  - Ground Floor: MB_GF_GIRLS_RESTROOM, MB001-MB003 (North side), MB004, MB_GF_BOYS_RESTROOM (South side)
  - First Floor: MB_F1_GIRLS_RESTROOM, MB102/Radhakrishnan Seminar Hall (turn left from stairs), MB103A/B (straight from stairs), MB103C (north side east portico stairs), MB104-MB106, MB_F1_BOYS_RESTROOM (turn right from stairs)
  - Second Floor: MB_F2_GIRLS_RESTROOM, MB202, MB203 (turn left from stairs), MB203x (straight from stairs), MB_F2_BOYS_RESTROOM (turn right from stairs)
  - Third Floor: MB_F3_GIRLS_RESTROOM, MB301A, MB301B, MB302 (turn left from stairs), MB304-MB307, MB_F3_BOYS_RESTROOM (turn right from stairs)
- ECE Block (EC): Located South of the Main Block's West Entrance, along the West path.
- Admin Block (AB): Located far South of the ECE Block. Entrance faces West.
  - Ground Floor: AB002 (immediate left entering), AB003 (left lane, left of elevator), AB004 (end of left lane), AB005 (turn right from AB004)
- Canteen: Located far East. Accessible via a path running East-West on the South side of the Main Block.

CURRENT NAVIGATION STATE:
${context.from ? `- Navigating FROM: ${context.from}` : '- No active navigation'}
${context.to ? `- Navigating TO: ${context.to}` : ''}
${context.currentStep ? `- Current step: ${context.currentStep} of ${context.totalSteps}` : ''}
${context.currentInstruction ? `- Current instruction: ${context.currentInstruction}` : ''}
${context.currentLocation ? `- Currently at/near: ${context.currentLocation}` : ''}
${context.progress ? `- Progress: ${context.progress}%` : ''}

RULES:
- Be concise, friendly, and encouraging. Use emojis sparingly.
- Give clear directional instructions (left, right, straight, up, down).
- Reference landmarks (stairs, portico, elevator) when helpful.
- If asked about rooms you don't know about, say so honestly.
- Keep responses SHORT (2-4 sentences max).
- Always orient directions with "facing east" in Main Block and "facing west" in Admin Block.`;
}

function addChatBubble(message, type) {
  const container = document.getElementById('chat-messages');
  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${type}`;

  if (type === 'ai') {
    bubble.innerHTML = `<div class="ai-label">AI Assistant</div>${escapeHtml(message)}`;
  } else {
    bubble.textContent = message;
  }

  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;
}

function addTypingIndicator() {
  const container = document.getElementById('chat-messages');
  const id = 'typing-' + Date.now();
  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble ai loading';
  bubble.id = id;
  bubble.innerHTML = `
    <div class="ai-label">AI Assistant</div>
    <div class="typing-dots">
      <span></span><span></span><span></span>
    </div>
  `;
  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;
  return id;
}

function removeTypingIndicator(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}


// ── Toast Notifications ────────────────────────────────────

function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  const icon = document.getElementById('toast-icon');
  const text = document.getElementById('toast-text');

  const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
  icon.textContent = icons[type] || 'ℹ️';
  text.textContent = message;

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}


// ── Helper Functions ───────────────────────────────────────

function getBlockIconClass(block) {
  const map = {
    MB: 'mb-icon',
    AB: 'ab-icon',
    CN: 'cn-icon',
    EC: 'ec-icon',
    CAMPUS: 'campus-icon'
  };
  return map[block] || 'campus-icon';
}

function getLocationIcon(loc) {
  switch (loc.type) {
    case LOCATION_TYPES.ROOM: return '🚪';
    case LOCATION_TYPES.ENTRANCE: return '🏛️';
    case LOCATION_TYPES.STAIRS: return '🪜';
    case LOCATION_TYPES.PORTICO: return '🏗️';
    case LOCATION_TYPES.LANDMARK: return '📍';
    case LOCATION_TYPES.CORRIDOR: return '🚶';
    default: return '📌';
  }
}

function getLocationTypeName(type) {
  const map = {
    room: 'Room',
    stairs: 'Stairs',
    entrance: 'Entrance',
    portico: 'Portico',
    corridor: 'Corridor',
    landmark: 'Landmark',
    waypoint: 'Waypoint'
  };
  return map[type] || type;
}

function getStepIcon(step, current, total) {
  if (current === 1) return '📍';
  if (current === total) return '🏁';

  // Smart directional parsing
  if (step && step.instruction) {
    const text = step.instruction.toLowerCase();
    if (text.includes('stairs') || text.includes(' up ') || text.includes(' down ')) return '🪜';
    if (text.includes('left')) return '⬅️';
    if (text.includes('right')) return '➡️';
    if (text.includes('straight') || text.includes('forward')) return '⬆️';
  }

  const loc = step.location;
  if (!loc) return '🚶';

  switch (loc.type) {
    case LOCATION_TYPES.STAIRS: return '🪜';
    case LOCATION_TYPES.ENTRANCE: return '🏛️';
    case LOCATION_TYPES.ROOM: return '🚪';
    case LOCATION_TYPES.PORTICO: return '🏗️';
    case LOCATION_TYPES.LANDMARK: return '📍';
    default: return '🚶';
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ── Initialization ─────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  console.log('🧭 AdhiNav initialized');
  console.log(`📍 ${LOCATIONS.length} locations loaded`);
  console.log(`🔗 ${Object.keys(ADJACENCY).length} graph nodes`);
});
