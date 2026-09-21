// ============================================================
// AdhiNav — Main Application Controller (v2.0)
// Screen management, QR scanning, navigation, map integration
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
let mapRenderer = null;
let mapPanelOpen = false;
let activeBlockFilter = 'ALL';

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
      activeBlockFilter = 'ALL';
      populateDestinations();
      updateCurrentLocationDisplay();
      resetBlockFilterChips();
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


// ── QR Scanner (Rear Camera Only + Permission Retry) ───────

let cameraRetryCount = 0;
const MAX_CAMERA_RETRIES = 3;

async function startQRScanner() {
  // Reset scan UI
  const scanResult = document.getElementById('scan-result');
  if (scanResult) scanResult.classList.add('hidden');

  const deniedPanel = document.getElementById('camera-denied-panel');
  if (deniedPanel) deniedPanel.classList.add('hidden');

  if (scannerActive) return;

  // Step 1: Explicitly request camera permission via getUserMedia
  // This forces the browser to show the permission prompt
  let permissionGranted = false;
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    });
    // Permission granted — stop the test stream immediately
    stream.getTracks().forEach(track => track.stop());
    permissionGranted = true;
    console.log('📷 Camera permission granted');
  } catch (permErr) {
    console.warn('📷 Camera permission check failed:', permErr.name, permErr.message);

    if (permErr.name === 'NotAllowedError' || permErr.name === 'PermissionDeniedError') {
      // User denied permission — show the denied panel
      showCameraDeniedPanel();
      return;
    }

    if (permErr.name === 'NotFoundError' || permErr.name === 'DevicesNotFoundError') {
      showToast('📷 No camera found on this device', 'error');
      return;
    }

    // For OverconstrainedError (no environment camera), try without exact constraint
    if (permErr.name === 'OverconstrainedError') {
      try {
        const fallbackStream = await navigator.mediaDevices.getUserMedia({ video: true });
        fallbackStream.getTracks().forEach(track => track.stop());
        permissionGranted = true;
        console.log('📷 Camera permission granted (fallback)');
      } catch (fallbackPermErr) {
        if (fallbackPermErr.name === 'NotAllowedError' || fallbackPermErr.name === 'PermissionDeniedError') {
          showCameraDeniedPanel();
          return;
        }
        showToast('📷 Camera not available', 'error');
        return;
      }
    }

    // Other errors — still try to proceed
    if (!permissionGranted) {
      permissionGranted = true; // optimistic
    }
  }

  if (!permissionGranted) return;

  // Step 2: Start the QR scanner with the confirmed permission
  try {
    // Clear any leftover DOM nodes from a previous scanner session
    const readerEl = document.getElementById('qr-reader');
    if (readerEl) readerEl.innerHTML = '';

    qrScanner = new Html5Qrcode("qr-reader");

    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      aspectRatio: 1.0
    };

    // Try rear camera first
    try {
      await qrScanner.start(
        { facingMode: { exact: "environment" } },
        config,
        onScanSuccess,
        onScanError
      );
      scannerActive = true;
      cameraRetryCount = 0;
      console.log('📷 Rear camera started successfully');
    } catch (envErr) {
      console.warn('⚠️ Environment camera failed, trying fallback:', envErr);
      // Fallback: try without exact constraint
      try {
        await qrScanner.start(
          { facingMode: "environment" },
          config,
          onScanSuccess,
          onScanError
        );
        scannerActive = true;
        cameraRetryCount = 0;
        console.log('📷 Camera started (fallback mode)');
      } catch (fallbackErr) {
        console.error('❌ All camera start attempts failed:', fallbackErr);
        handleCameraStartError(fallbackErr);
      }
    }

  } catch (e) {
    console.error('Failed to initialize QR scanner:', e);
    handleCameraStartError(e);
  }
}

function handleCameraStartError(error) {
  const errorStr = String(error).toLowerCase();
  const errorName = error?.name?.toLowerCase() || '';

  if (errorStr.includes('permission') || errorStr.includes('denied') ||
      errorStr.includes('notallowed') || errorName === 'notallowederror') {
    showCameraDeniedPanel();
  } else {
    showToast('📷 Could not start camera. Try again.', 'warning');
    showCameraDeniedPanel();
  }
}

function showCameraDeniedPanel() {
  const deniedPanel = document.getElementById('camera-denied-panel');
  if (deniedPanel) {
    deniedPanel.classList.remove('hidden');
  }
  // Hide the scanner container since there's no camera feed
  const scannerContainer = document.getElementById('scanner-container');
  if (scannerContainer) {
    scannerContainer.style.display = 'none';
  }
}

function hideCameraDeniedPanel() {
  const deniedPanel = document.getElementById('camera-denied-panel');
  if (deniedPanel) {
    deniedPanel.classList.add('hidden');
  }
  const scannerContainer = document.getElementById('scanner-container');
  if (scannerContainer) {
    scannerContainer.style.display = '';
  }
}

async function retryCameraPermission() {
  cameraRetryCount++;
  console.log(`📷 Camera retry attempt ${cameraRetryCount}/${MAX_CAMERA_RETRIES}`);

  // Stop any existing scanner first
  stopQRScanner();

  // Clear out the qr-reader div so Html5Qrcode can reinitialize
  const readerEl = document.getElementById('qr-reader');
  if (readerEl) readerEl.innerHTML = '';

  // Hide denied panel, show scanner container
  hideCameraDeniedPanel();

  if (cameraRetryCount > MAX_CAMERA_RETRIES) {
    showToast('📷 Camera blocked. Please enable in browser settings.', 'error');
    showCameraDeniedPanel();
    return;
  }

  // Re-trigger the full permission + scanner flow
  await startQRScanner();
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
            <div class="dest-block">${getLocationTypeName(loc.type)}${loc.floor !== undefined ? ' · ' + getFloorName(loc.floor) : ''}</div>
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
  let filtered = locations.filter(loc => loc.id !== currentLocationId);

  // Apply block filter
  if (activeBlockFilter && activeBlockFilter !== 'ALL') {
    filtered = filtered.filter(loc => loc.block === activeBlockFilter);
  }

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
      const typeBadge = getTypeBadge(loc.type);
      html += `
        <div class="dest-item ${isSelected ? 'selected' : ''}" onclick="selectDestination('${loc.id}', this)">
          <div class="dest-icon ${iconClass}">${icon}</div>
          <div>
            <div class="dest-name">${loc.name}${typeBadge}</div>
            <div class="dest-block">${BLOCKS[loc.block] || loc.block} · ${getFloorName(loc.floor)}</div>
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

  if (q) {
    // Use the smart search function from locations.js
    const results = searchLocations(q);
    renderDestinationList(results);
  } else {
    renderDestinationList(getSelectableLocations());
  }
}

function setBlockFilter(block, element) {
  activeBlockFilter = block;

  // Update active chip
  document.querySelectorAll('#block-filter-chips .filter-chip').forEach(chip => {
    chip.classList.remove('active');
  });
  if (element) element.classList.add('active');

  // Re-render with filter
  const searchInput = document.getElementById('dest-search');
  const query = searchInput ? searchInput.value.trim() : '';
  if (query) {
    filterDestinations(query);
  } else {
    renderDestinationList(getSelectableLocations());
  }
}

function resetBlockFilterChips() {
  document.querySelectorAll('#block-filter-chips .filter-chip').forEach(chip => {
    chip.classList.remove('active');
    if (chip.dataset.block === 'ALL') chip.classList.add('active');
  });
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


// ── Map Panel ──────────────────────────────────────────────

function toggleMapPanel() {
  mapPanelOpen = !mapPanelOpen;
  const content = document.getElementById('map-panel-content');
  const toggle = document.getElementById('map-toggle');

  if (mapPanelOpen) {
    content.classList.add('open');
    toggle.classList.add('open');
    // Render map if navigation is active
    if (navSession && mapRenderer) {
      updateMapForCurrentStep();
    }
  } else {
    content.classList.remove('open');
    toggle.classList.remove('open');
  }
}

function initMapRenderer() {
  mapRenderer = new MapRenderer('nav-map-container');
}

function updateMapForCurrentStep() {
  if (!mapRenderer || !navSession) return;

  const step = navSession.getCurrentStep();
  if (!step) return;

  const allStepNodeIds = navSession.getAllSteps().map(s => s.nodeId);
  mapRenderer.updateForNavStep(
    step.nodeId,
    navSession.startId,
    navSession.endId,
    allStepNodeIds
  );
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

  // Initialize map
  initMapRenderer();
  mapPanelOpen = false;
  const content = document.getElementById('map-panel-content');
  const toggle = document.getElementById('map-toggle');
  if (content) content.classList.remove('open');
  if (toggle) toggle.classList.remove('open');

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

  // Update map if panel is open
  if (mapPanelOpen && mapRenderer) {
    updateMapForCurrentStep();
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
  mapRenderer = null;
  mapPanelOpen = false;
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
  // Use the enhanced icon function from locations.js if available
  if (typeof getLocationTypeIcon === 'function') {
    return getLocationTypeIcon(loc.type);
  }

  switch (loc.type) {
    case LOCATION_TYPES.ROOM: return '🚪';
    case LOCATION_TYPES.STAFFROOM: return '👨‍🏫';
    case LOCATION_TYPES.LAB: return '🔬';
    case LOCATION_TYPES.RESTROOM: return '🚻';
    case LOCATION_TYPES.SEMINAR_HALL: return '🎤';
    case LOCATION_TYPES.LIBRARY: return '📚';
    case LOCATION_TYPES.OFFICE: return '🏢';
    case LOCATION_TYPES.SHOP: return '🛒';
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
    staffroom: 'Staffroom',
    lab: 'Lab',
    restroom: 'Restroom',
    seminar_hall: 'Seminar Hall',
    library: 'Library',
    office: 'Office',
    shop: 'Shop',
    stairs: 'Stairs',
    entrance: 'Entrance',
    portico: 'Portico',
    corridor: 'Corridor',
    landmark: 'Landmark',
    waypoint: 'Waypoint'
  };
  return map[type] || type;
}

function getTypeBadge(type) {
  switch (type) {
    case LOCATION_TYPES.STAFFROOM:
      return '<span class="dest-type-badge badge-staffroom">Staff</span>';
    case LOCATION_TYPES.LAB:
      return '<span class="dest-type-badge badge-lab">Lab</span>';
    case LOCATION_TYPES.RESTROOM:
      return '<span class="dest-type-badge badge-restroom">WC</span>';
    case LOCATION_TYPES.OFFICE:
      return '<span class="dest-type-badge badge-office">Office</span>';
    case LOCATION_TYPES.LIBRARY:
      return '<span class="dest-type-badge badge-library">Library</span>';
    default:
      return '';
  }
}

function getStepIcon(step, current, total) {
  if (current === 1) return '📍';
  if (current === total) return '🏁';

  // Smart directional parsing
  if (step && step.instruction) {
    const text = step.instruction.toLowerCase();
    if (text.includes('climb up') || text.includes('walk down') || text.includes('stairs') || text.includes('flight')) return '🪜';
    if (text.includes('turn left') || text.includes('take left')) return '⬅️';
    if (text.includes('turn right') || text.includes('take right')) return '➡️';
    if (text.includes('straight') || text.includes('ahead') || text.includes('walk along') || text.includes('continue')) return '⬆️';
    if (text.includes('enter') || text.includes('entrance')) return '🏛️';
    if (text.includes('exit')) return '🚪';
    if (text.includes('glass door')) return '🚪';
  }

  const loc = step.location;
  if (!loc) return '🚶';

  switch (loc.type) {
    case LOCATION_TYPES.STAIRS: return '🪜';
    case LOCATION_TYPES.ENTRANCE: return '🏛️';
    case LOCATION_TYPES.ROOM: return '🚪';
    case LOCATION_TYPES.STAFFROOM: return '👨‍🏫';
    case LOCATION_TYPES.LAB: return '🔬';
    case LOCATION_TYPES.RESTROOM: return '🚻';
    case LOCATION_TYPES.SEMINAR_HALL: return '🎤';
    case LOCATION_TYPES.LIBRARY: return '📚';
    case LOCATION_TYPES.OFFICE: return '🏢';
    case LOCATION_TYPES.SHOP: return '🛒';
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

// ── Splash Screen ──────────────────────────────────────────

function dismissSplash() {
  const splash = document.getElementById('splash-screen');
  if (splash) {
    splash.classList.add('hidden');
  }
}

// ── Initialization ─────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  console.log('🧭 AdhiNav v2.0 initialized');
  console.log(`📍 ${LOCATIONS.length} locations loaded`);
  console.log(`🔗 ${Object.keys(ADJACENCY).length} graph nodes`);
  console.log(`🗺️ ${Object.keys(FLOOR_LAYOUTS).length} floor maps loaded`);

  // Dismiss splash screen after fade-out animation completes
  const splash = document.getElementById('splash-screen');
  if (splash) {
    // The CSS animation is: fade out at 2.8s, takes 0.6s → done at 3.4s
    splash.addEventListener('animationend', (e) => {
      if (e.animationName === 'splashFadeOut') {
        dismissSplash();
      }
    });
    // Fallback timeout in case animationend doesn't fire
    setTimeout(dismissSplash, 3600);
  }
});
