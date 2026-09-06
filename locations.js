// ============================================================
// AdhiNav — Location Master Data
// All rooms, waypoints, landmarks, and scannable locations
// ============================================================

const LOCATION_TYPES = {
  ROOM: 'room',
  STAIRS: 'stairs',
  ENTRANCE: 'entrance',
  PORTICO: 'portico',
  CORRIDOR: 'corridor',
  LANDMARK: 'landmark',
  WAYPOINT: 'waypoint'
};

const BLOCKS = {
  MB: 'Main Block',
  AB: 'Admin Block',
  EC: 'ECE Block',
  CN: 'Canteen',
  CAMPUS: 'Campus'
};

// ── All locations ──────────────────────────────────────────
// id:        Unique identifier (used in QR codes as ADHINAV:<id>)
// name:      Human-readable display name
// aliases:   Alternative names for search
// block:     Which block this belongs to
// floor:     Floor number (0 = ground)
// type:      LOCATION_TYPES value
// scannable: true if a QR code is placed here
// selectable: true if user can pick this as a destination

const LOCATIONS = [

  // ═══════════════════════════════════════════════════════════
  // MAIN BLOCK — WAYPOINTS & ENTRANCES
  // ═══════════════════════════════════════════════════════════

  // Ground Floor
  {
    id: 'MB_ENTRANCE',
    name: 'Main Block Entrance',
    aliases: ['mb entrance', 'main entrance', 'main block', 'main gate', 'mb ground floor entrance'],
    block: 'MB',
    floor: 0,
    type: LOCATION_TYPES.ENTRANCE,
    scannable: true,
    selectable: true
  },
  {
    id: 'MB_GF_CORRIDOR',
    name: 'MB Ground Floor Corridor',
    aliases: ['mb ground corridor'],
    block: 'MB',
    floor: 0,
    type: LOCATION_TYPES.CORRIDOR,
    scannable: false,
    selectable: false
  },
  {
    id: 'MB_GF_LEFT_WING',
    name: 'MB Ground Floor Left Wing',
    aliases: ['mb ground left'],
    block: 'MB',
    floor: 0,
    type: LOCATION_TYPES.CORRIDOR,
    scannable: false,
    selectable: false
  },
  {
    id: 'MB_GF_RIGHT_WING',
    name: 'MB Ground Floor Right Wing',
    aliases: ['mb ground right'],
    block: 'MB',
    floor: 0,
    type: LOCATION_TYPES.CORRIDOR,
    scannable: false,
    selectable: false
  },
  {
    id: 'MB_EAST_PORTICO',
    name: 'MB East Portico',
    aliases: ['east portico', 'mb east', 'east side portico'],
    block: 'MB',
    floor: 0,
    type: LOCATION_TYPES.PORTICO,
    scannable: true,
    selectable: true
  },
  {
    id: 'MB_WEST_PORTICO',
    name: 'MB West Portico',
    aliases: ['west portico', 'mb west', 'west side portico'],
    block: 'MB',
    floor: 0,
    type: LOCATION_TYPES.PORTICO,
    scannable: true,
    selectable: true
  },

  // Stairs (one per floor transition)
  {
    id: 'MB_GF_STAIRS',
    name: 'MB Ground Floor Stairs',
    aliases: ['mb ground stairs', 'mb stairs ground'],
    block: 'MB',
    floor: 0,
    type: LOCATION_TYPES.STAIRS,
    scannable: true,
    selectable: true
  },
  {
    id: 'MB_F1_STAIRS',
    name: 'MB First Floor Stairs',
    aliases: ['mb first floor stairs', 'mb 1st floor stairs', 'mb stairs first'],
    block: 'MB',
    floor: 1,
    type: LOCATION_TYPES.STAIRS,
    scannable: true,
    selectable: true
  },
  {
    id: 'MB_F2_STAIRS',
    name: 'MB Second Floor Stairs',
    aliases: ['mb second floor stairs', 'mb 2nd floor stairs', 'mb stairs second'],
    block: 'MB',
    floor: 2,
    type: LOCATION_TYPES.STAIRS,
    scannable: true,
    selectable: true
  },
  {
    id: 'MB_F3_STAIRS',
    name: 'MB Third Floor Stairs',
    aliases: ['mb third floor stairs', 'mb 3rd floor stairs', 'mb stairs third'],
    block: 'MB',
    floor: 3,
    type: LOCATION_TYPES.STAIRS,
    scannable: true,
    selectable: true
  },

  // First Floor corridors
  {
    id: 'MB_F1_LEFT_WING',
    name: 'MB First Floor Left Wing',
    aliases: [],
    block: 'MB',
    floor: 1,
    type: LOCATION_TYPES.CORRIDOR,
    scannable: false,
    selectable: false
  },
  {
    id: 'MB_F1_STRAIGHT',
    name: 'MB First Floor Straight Ahead',
    aliases: [],
    block: 'MB',
    floor: 1,
    type: LOCATION_TYPES.CORRIDOR,
    scannable: false,
    selectable: false
  },
  {
    id: 'MB_F1_RIGHT_WING',
    name: 'MB First Floor Right Wing',
    aliases: [],
    block: 'MB',
    floor: 1,
    type: LOCATION_TYPES.CORRIDOR,
    scannable: false,
    selectable: false
  },
  {
    id: 'MB_F1_EAST_PORTICO_STAIRS',
    name: 'MB First Floor East Portico Stairs',
    aliases: ['east portico stairs first floor', 'north side stairs east portico'],
    block: 'MB',
    floor: 1,
    type: LOCATION_TYPES.STAIRS,
    scannable: false,
    selectable: false
  },

  // Second Floor corridors
  {
    id: 'MB_F2_LEFT_WING',
    name: 'MB Second Floor Left Wing',
    aliases: [],
    block: 'MB',
    floor: 2,
    type: LOCATION_TYPES.CORRIDOR,
    scannable: false,
    selectable: false
  },
  {
    id: 'MB_F2_STRAIGHT',
    name: 'MB Second Floor Straight Ahead',
    aliases: [],
    block: 'MB',
    floor: 2,
    type: LOCATION_TYPES.CORRIDOR,
    scannable: false,
    selectable: false
  },

  // Third Floor corridors
  {
    id: 'MB_F3_LEFT_WING',
    name: 'MB Third Floor Left Wing',
    aliases: [],
    block: 'MB',
    floor: 3,
    type: LOCATION_TYPES.CORRIDOR,
    scannable: false,
    selectable: false
  },
  {
    id: 'MB_F3_RIGHT_WING',
    name: 'MB Third Floor Right Wing',
    aliases: [],
    block: 'MB',
    floor: 3,
    type: LOCATION_TYPES.CORRIDOR,
    scannable: false,
    selectable: false
  },


  // ═══════════════════════════════════════════════════════════
  // MAIN BLOCK — ROOMS
  // ═══════════════════════════════════════════════════════════

  // Ground Floor Rooms
  {
    id: 'MB001',
    name: 'MB001',
    aliases: ['mb 001', 'mb ground 1', 'main block 001'],
    block: 'MB',
    floor: 0,
    type: LOCATION_TYPES.ROOM,
    scannable: false,
    selectable: true
  },
  {
    id: 'MB002',
    name: 'MB002',
    aliases: ['mb 002', 'mb ground 2', 'main block 002'],
    block: 'MB',
    floor: 0,
    type: LOCATION_TYPES.ROOM,
    scannable: false,
    selectable: true
  },
  {
    id: 'MB003',
    name: 'MB003',
    aliases: ['mb 003', 'mb ground 3', 'main block 003'],
    block: 'MB',
    floor: 0,
    type: LOCATION_TYPES.ROOM,
    scannable: false,
    selectable: true
  },
  {
    id: 'MB004',
    name: 'MB004',
    aliases: ['mb 004', 'mb ground 4', 'main block 004'],
    block: 'MB',
    floor: 0,
    type: LOCATION_TYPES.ROOM,
    scannable: false,
    selectable: true
  },

  // First Floor Rooms
  {
    id: 'MB102',
    name: 'MB102 — Radhakrishnan Seminar Hall',
    aliases: ['mb 102', 'seminar hall', 'radhakrishnan hall', 'radhakrishnan seminar hall', 'main block 102'],
    block: 'MB',
    floor: 1,
    type: LOCATION_TYPES.ROOM,
    scannable: true,
    selectable: true
  },
  {
    id: 'MB103AB',
    name: 'MB103 A/B',
    aliases: ['mb 103', 'mb103a', 'mb103b', 'mb 103a', 'mb 103b', 'mb103 a', 'mb103 b', 'main block 103'],
    block: 'MB',
    floor: 1,
    type: LOCATION_TYPES.ROOM,
    scannable: false,
    selectable: true
  },
  {
    id: 'MB103C',
    name: 'MB103C',
    aliases: ['mb 103c', 'mb103 c', 'main block 103c'],
    block: 'MB',
    floor: 1,
    type: LOCATION_TYPES.ROOM,
    scannable: false,
    selectable: true
  },
  {
    id: 'MB104',
    name: 'MB104',
    aliases: ['mb 104', 'main block 104'],
    block: 'MB',
    floor: 1,
    type: LOCATION_TYPES.ROOM,
    scannable: false,
    selectable: true
  },
  {
    id: 'MB105',
    name: 'MB105',
    aliases: ['mb 105', 'main block 105'],
    block: 'MB',
    floor: 1,
    type: LOCATION_TYPES.ROOM,
    scannable: false,
    selectable: true
  },
  {
    id: 'MB106',
    name: 'MB106',
    aliases: ['mb 106', 'main block 106'],
    block: 'MB',
    floor: 1,
    type: LOCATION_TYPES.ROOM,
    scannable: false,
    selectable: true
  },

  // Second Floor Rooms
  {
    id: 'MB202',
    name: 'MB202',
    aliases: ['mb 202', 'main block 202'],
    block: 'MB',
    floor: 2,
    type: LOCATION_TYPES.ROOM,
    scannable: false,
    selectable: true
  },
  {
    id: 'MB203',
    name: 'MB203',
    aliases: ['mb 203', 'main block 203'],
    block: 'MB',
    floor: 2,
    type: LOCATION_TYPES.ROOM,
    scannable: false,
    selectable: true
  },
  {
    id: 'MB203X',
    name: 'MB203x',
    aliases: ['mb 203x', 'mb203 x', 'main block 203x'],
    block: 'MB',
    floor: 2,
    type: LOCATION_TYPES.ROOM,
    scannable: false,
    selectable: true
  },

  // Third Floor Rooms
  {
    id: 'MB301A',
    name: 'MB301A',
    aliases: ['mb 301a', 'mb301 a', 'main block 301a'],
    block: 'MB',
    floor: 3,
    type: LOCATION_TYPES.ROOM,
    scannable: false,
    selectable: true
  },
  {
    id: 'MB301B',
    name: 'MB301B',
    aliases: ['mb 301b', 'mb301 b', 'main block 301b'],
    block: 'MB',
    floor: 3,
    type: LOCATION_TYPES.ROOM,
    scannable: false,
    selectable: true
  },
  {
    id: 'MB302',
    name: 'MB302',
    aliases: ['mb 302', 'main block 302'],
    block: 'MB',
    floor: 3,
    type: LOCATION_TYPES.ROOM,
    scannable: false,
    selectable: true
  },
  {
    id: 'MB304',
    name: 'MB304',
    aliases: ['mb 304', 'main block 304'],
    block: 'MB',
    floor: 3,
    type: LOCATION_TYPES.ROOM,
    scannable: false,
    selectable: true
  },
  {
    id: 'MB305',
    name: 'MB305',
    aliases: ['mb 305', 'main block 305'],
    block: 'MB',
    floor: 3,
    type: LOCATION_TYPES.ROOM,
    scannable: false,
    selectable: true
  },
  {
    id: 'MB306',
    name: 'MB306',
    aliases: ['mb 306', 'main block 306'],
    block: 'MB',
    floor: 3,
    type: LOCATION_TYPES.ROOM,
    scannable: false,
    selectable: true
  },
  {
    id: 'MB307',
    name: 'MB307',
    aliases: ['mb 307', 'main block 307'],
    block: 'MB',
    floor: 3,
    type: LOCATION_TYPES.ROOM,
    scannable: false,
    selectable: true
  },


  // ═══════════════════════════════════════════════════════════
  // ADMIN BLOCK — WAYPOINTS & ENTRANCES
  // ═══════════════════════════════════════════════════════════

  {
    id: 'AB_ENTRANCE',
    name: 'Admin Block Entrance',
    aliases: ['admin entrance', 'ab entrance', 'admin block', 'ab ground floor'],
    block: 'AB',
    floor: 0,
    type: LOCATION_TYPES.ENTRANCE,
    scannable: true,
    selectable: true
  },
  {
    id: 'AB_GF_LEFT_LANE',
    name: 'AB Ground Floor Left Lane',
    aliases: ['admin left lane', 'ab left lane'],
    block: 'AB',
    floor: 0,
    type: LOCATION_TYPES.CORRIDOR,
    scannable: false,
    selectable: false
  },
  {
    id: 'AB_GF_IMMEDIATE_LEFT',
    name: 'AB Ground Floor Immediate Left',
    aliases: [],
    block: 'AB',
    floor: 0,
    type: LOCATION_TYPES.CORRIDOR,
    scannable: false,
    selectable: false
  },
  {
    id: 'AB_GF_TURN_RIGHT',
    name: 'AB Ground Floor Turn Right',
    aliases: [],
    block: 'AB',
    floor: 0,
    type: LOCATION_TYPES.CORRIDOR,
    scannable: false,
    selectable: false
  },

  // ═══════════════════════════════════════════════════════════
  // ADMIN BLOCK — ROOMS
  // ═══════════════════════════════════════════════════════════

  {
    id: 'AB002',
    name: 'AB002',
    aliases: ['ab 002', 'admin block 002', 'admin 002'],
    block: 'AB',
    floor: 0,
    type: LOCATION_TYPES.ROOM,
    scannable: false,
    selectable: true
  },
  {
    id: 'AB003',
    name: 'AB003',
    aliases: ['ab 003', 'admin block 003', 'admin 003'],
    block: 'AB',
    floor: 0,
    type: LOCATION_TYPES.ROOM,
    scannable: false,
    selectable: true
  },
  {
    id: 'AB004',
    name: 'AB004',
    aliases: ['ab 004', 'admin block 004', 'admin 004'],
    block: 'AB',
    floor: 0,
    type: LOCATION_TYPES.ROOM,
    scannable: false,
    selectable: true
  },
  {
    id: 'AB005',
    name: 'AB005',
    aliases: ['ab 005', 'admin block 005', 'admin 005'],
    block: 'AB',
    floor: 0,
    type: LOCATION_TYPES.ROOM,
    scannable: false,
    selectable: true
  },


  // ═══════════════════════════════════════════════════════════
  // CAMPUS LANDMARKS
  // ═══════════════════════════════════════════════════════════

  {
    id: 'ECE_BLOCK',
    name: 'ECE Block',
    aliases: ['ece', 'ece building', 'ece block entrance'],
    block: 'EC',
    floor: 0,
    type: LOCATION_TYPES.LANDMARK,
    scannable: true,
    selectable: true
  },
  {
    id: 'CANTEEN',
    name: 'Canteen',
    aliases: ['canteen', 'mess', 'food court', 'cafeteria'],
    block: 'CN',
    floor: 0,
    type: LOCATION_TYPES.LANDMARK,
    scannable: true,
    selectable: true
  },

  // Campus paths (non-selectable waypoints)
  {
    id: 'CAMPUS_SOUTH_PATH',
    name: 'Campus South Path',
    aliases: [],
    block: 'CAMPUS',
    floor: 0,
    type: LOCATION_TYPES.WAYPOINT,
    scannable: false,
    selectable: false
  },
  {
    id: 'CAMPUS_EAST_PATH',
    name: 'Campus East Path',
    aliases: [],
    block: 'CAMPUS',
    floor: 0,
    type: LOCATION_TYPES.WAYPOINT,
    scannable: false,
    selectable: false
  }
];


// ── Helper functions ───────────────────────────────────────

/**
 * Get a location by its ID
 */
function getLocationById(id) {
  return LOCATIONS.find(loc => loc.id === id) || null;
}

/**
 * Get all selectable locations (destinations the user can choose)
 */
function getSelectableLocations() {
  return LOCATIONS.filter(loc => loc.selectable);
}

/**
 * Get all scannable locations (QR code points)
 */
function getScannableLocations() {
  return LOCATIONS.filter(loc => loc.scannable);
}

/**
 * Search locations by query (case-insensitive, matches id, name, aliases)
 */
function searchLocations(query) {
  const q = query.toLowerCase().trim();
  if (!q) return getSelectableLocations();

  return getSelectableLocations().filter(loc => {
    if (loc.id.toLowerCase().includes(q)) return true;
    if (loc.name.toLowerCase().includes(q)) return true;
    if (loc.aliases.some(a => a.includes(q))) return true;
    return false;
  });
}

/**
 * Parse QR code data and return location
 * Accepts plain text: location ID, name, or alias (case-insensitive)
 * Also supports legacy ADHINAV:<LOCATION_ID> format
 */
function parseQRCode(data) {
  let text = data.trim();

  // Strip ADHINAV: prefix if present (backwards compatibility)
  if (text.toUpperCase().startsWith('ADHINAV:')) {
    text = text.substring(8).trim();
  }

  const query = text.toLowerCase();

  // 1. Try exact ID match (case-insensitive)
  let match = LOCATIONS.find(loc => loc.id.toLowerCase() === query);
  if (match) return match;

  // 2. Try exact name match (case-insensitive)
  match = LOCATIONS.find(loc => loc.name.toLowerCase() === query);
  if (match) return match;

  // 3. Try alias match (case-insensitive)
  match = LOCATIONS.find(loc => loc.aliases.some(a => a.toLowerCase() === query));
  if (match) return match;

  // 4. Try partial ID match (e.g., "MB102" inside "MB102 — Seminar Hall")
  match = LOCATIONS.find(loc => loc.id.toLowerCase().includes(query) || query.includes(loc.id.toLowerCase()));
  if (match) return match;

  return null;
}

/**
 * Get locations grouped by block
 */
function getLocationsByBlock() {
  const groups = {};
  getSelectableLocations().forEach(loc => {
    const blockName = BLOCKS[loc.block] || loc.block;
    if (!groups[blockName]) groups[blockName] = [];
    groups[blockName].push(loc);
  });
  return groups;
}
