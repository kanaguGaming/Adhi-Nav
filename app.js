// ============================================================
// AdhiNav — Main Application Controller
// Screen management, QR scanning (rear cam only), navigation
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


// ── QR Scanner (Rear Camera Only) ──────────────────────────

function startQRScanner() {
  // Reset scan UI
  const scanResult = document.getElementById('scan-result');
  if (scanResult) scanResult.classList.add('hidden');

  if (scannerActive) return;

  try {
    // Use Html5Qrcode (not Scanner) for full programmatic control
    qrScanner = new Html5Qrcode("qr-reader");

    // Configuration for rear camera only
    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      aspectRatio: 1.0
    };

    // Force rear/environment camera — no selfie cam
    const cameraConstraints = {
      facingMode: { exact: "environment" }
    };

    qrScanner.start(
      cameraConstraints,
      config,
      onScanSuccess,
      onScanError
    ).then(() => {
      scannerActive = true;
      console.log('📷 Rear camera started successfully');
    }).catch((err) => {
      console.warn('⚠️ Environment camera failed, trying any camera:', err);
      // Fallback: try any available camera
      qrScanner.start(
        { facingMode: "environment" },
        config,
        onScanSuccess,
        onScanError
      ).then(() => {
        scannerActive = true;
        console.log('📷 Camera started (fallback mode)');
      }).catch((fallbackErr) => {
        console.error('❌ All camera attempts failed:', fallbackErr);
        showToast('📷 Camera access needed for scanning', 'warning');
      });
    });

  } catch (e) {
    console.error('Failed to initialize QR scanner:', e);
    showToast('📷 Camera access needed for scanning', 'warning');
  }
}

function stopQRScanner() {
  if (qrScanner && scannerActive) {
    try {
      qrScanner.stop().then(() => {
        scannerActive = false;
        console.log('📷 Camera stopped');
      }).catch((e) => {
        // Ignore cleanup errors
        scannerActive = false;
      });
    } catch (e) {
      // Ignore cleanup errors
      scannerActive = false;
    }
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
    const scanResult = document.getElementById('scan-result');
    if (scanResult) {
      scanResult.classList.remove('hidden');
      scanResult.innerHTML = `
        <div class="scan-result" style="background: rgba(239, 68, 68, 0.06); border-color: rgba(239, 68, 68, 0.18);">
          <span class="icon">❌</span>
          <div class="info">
            <div class="label">Not recognized</div>
            <div class="value" style="color: var(--accent-danger);">This QR code is not an AdhiNav location</div>
          </div>
        </div>
      `;
    }
  }
}

function onScanError(errorMessage) {
  // Ignore continuous scan errors (they fire constantly when no QR is in frame)
}


// ── Manual Location Selection ──────────────────────────────

function populateManualLocations() {
  selectedManualLocationId = null;
  const searchInput = document.getElementById('manual-search');
  if (searchInput) searchInput.value = '';
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
  const searchInput = document.getElementById('dest-search');
  if (searchInput) searchInput.value = '';
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

  // On the last step, Next button leads to arrived screen
  const nextBtn = document.getElementById('btn-next');
  if (current === total) {
    nextBtn.disabled = false;
    nextBtn.innerHTML = 'Arrived 🏁';
  } else {
    nextBtn.disabled = false;
    nextBtn.innerHTML = 'Next ▶';
  }
}

function navNext() {
  if (!navSession) return;

  const total = navSession.getTotalSteps();
  const current = navSession.currentStepIndex + 1;

  // If on the last step, show the arrived screen
  if (current === total) {
    const destLoc = navSession.endLocation;
    document.getElementById('arrived-destination').textContent =
      `You have arrived at ${destLoc?.name || 'your destination'}! 🎉`;
    showScreen('screen-arrived');
    showToast('🎉 You\'ve arrived!', 'success');
    return;
  }

  if (navSession.canGoNext()) {
    navSession.next();
    renderCurrentStep();
  }
}

function navPrevious() {
  if (navSession && navSession.canGoPrevious()) {
    navSession.previous();
    renderCurrentStep();
    showScreen('screen-navigation');
  }
}

function returnToLastStep() {
  // Go back from arrived screen to the last navigation step
  showScreen('screen-navigation');
  renderCurrentStep();
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
