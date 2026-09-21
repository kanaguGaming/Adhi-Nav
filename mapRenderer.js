// ============================================================
// AdhiNav — Interactive SVG Floor Map Renderer (v2.0)
// Draws floor layouts, highlights rooms, and animates paths
// ============================================================

// ── Floor Layout Data ──────────────────────────────────────
// Each room is defined by: { id, x, y, w, h, label }
// Coordinates are in a virtual grid (0-1000 range)
// Corridors and stairs are drawn as special elements

const FLOOR_LAYOUTS = {

  // ═══════════════════════════════════════════════════════════
  //  MAIN BLOCK LAYOUTS
  // ═══════════════════════════════════════════════════════════

  MB_0: {
    name: 'Main Block — Ground Floor',
    width: 1000, height: 520,
    corridors: [
      // Main horizontal corridor (hallway)
      { x: 100, y: 220, w: 800, h: 40, label: 'Corridor' },
      // Perpendicular hallway (west to east)
      { x: 470, y: 60, w: 40, h: 400, label: 'Perp. Hallway' }
    ],
    stairs: [
      { x: 455, y: 180, w: 70, h: 80, id: 'MB_GF_STAIRS', label: '🪜 Stairs' }
    ],
    entrances: [
      { x: 460, y: 40, w: 60, h: 30, id: 'MB_ENTRANCE', label: 'West Portico' },
      { x: 460, y: 440, w: 60, h: 30, id: 'MB_EAST_PORTICO', label: 'East Portico' }
    ],
    rooms: [
      // Left wing (from stairs, going left) — rooms are on the left side
      { id: 'MB_GF_GIRLS_RESTROOM', x: 60, y: 130, w: 130, h: 80, label: '🚻 Girls' },
      { id: 'MB001', x: 200, y: 130, w: 110, h: 80, label: 'MB001\nEEE Staff' },
      { id: 'MB002', x: 200, y: 270, w: 110, h: 80, label: 'MB002' },
      { id: 'MB003', x: 60, y: 270, w: 130, h: 80, label: 'MB003' },
      // Opposite stairs & next to stairs
      { id: 'MB_GF_ADMIN_CELL', x: 380, y: 280, w: 100, h: 70, label: 'Admin\nCell' },
      { id: 'MB_GF_SH_STAFFROOM', x: 380, y: 130, w: 100, h: 70, label: 'S&H\nStaff' },
      // Right wing
      { id: 'MB004', x: 540, y: 130, w: 110, h: 80, label: 'MB004' },
      { id: 'MB005', x: 660, y: 130, w: 130, h: 80, label: 'MB005\nChem Lab' },
      { id: 'MB_GF_BOYS_RESTROOM', x: 810, y: 130, w: 130, h: 80, label: '🚻 Boys' }
    ]
  },

  MB_1: {
    name: 'Main Block — First Floor',
    width: 1000, height: 460,
    corridors: [
      { x: 100, y: 200, w: 800, h: 40, label: 'Corridor' }
    ],
    stairs: [
      { x: 455, y: 160, w: 70, h: 80, id: 'MB_F1_STAIRS', label: '🪜 Stairs' }
    ],
    entrances: [],
    rooms: [
      // Left wing
      { id: 'MB_F1_GIRLS_RESTROOM', x: 60, y: 110, w: 130, h: 80, label: '🚻 Girls' },
      { id: 'MB102', x: 200, y: 110, w: 130, h: 80, label: 'Seminar\nHall' },
      { id: 'MB103A', x: 200, y: 250, w: 110, h: 70, label: 'MB103A' },
      // Opposite & near stairs
      { id: 'MB103B', x: 390, y: 250, w: 100, h: 70, label: 'MB103B' },
      { id: 'MB_F1_CSE_STAFFROOM', x: 350, y: 110, w: 100, h: 70, label: 'CSE\nStaff' },
      { id: 'MB107', x: 530, y: 250, w: 100, h: 70, label: 'MB107' },
      // Right wing
      { id: 'MB104', x: 540, y: 110, w: 100, h: 80, label: 'MB104' },
      { id: 'MB105', x: 650, y: 110, w: 100, h: 80, label: 'MB105' },
      { id: 'MB106', x: 760, y: 110, w: 100, h: 80, label: 'MB106' },
      { id: 'MB_F1_BOYS_RESTROOM', x: 870, y: 110, w: 100, h: 80, label: '🚻 Boys' },
      // East portico room
      { id: 'MB103C', x: 870, y: 250, w: 100, h: 70, label: 'MB103C\n(East)' }
    ]
  },

  MB_2: {
    name: 'Main Block — Second Floor',
    width: 1000, height: 460,
    corridors: [
      { x: 100, y: 200, w: 800, h: 40, label: 'Corridor' }
    ],
    stairs: [
      { x: 455, y: 160, w: 70, h: 80, id: 'MB_F2_STAIRS', label: '🪜 Stairs' }
    ],
    entrances: [],
    rooms: [
      // Left wing
      { id: 'MB_F2_GIRLS_RESTROOM', x: 60, y: 110, w: 130, h: 80, label: '🚻 Girls' },
      { id: 'MB_F2_IT_STAFFROOM', x: 200, y: 110, w: 110, h: 80, label: 'IT\nStaff' },
      { id: 'MB202', x: 200, y: 250, w: 110, h: 70, label: 'MB202' },
      { id: 'MB203', x: 60, y: 250, w: 130, h: 70, label: 'MB203' },
      // Near stairs
      { id: 'MB_F2_MECH_STAFFROOM', x: 350, y: 110, w: 100, h: 70, label: 'Mech\nStaff' },
      // Opposite stairs
      { id: 'MB203A', x: 370, y: 260, w: 80, h: 60, label: '203A' },
      { id: 'MB203B', x: 455, y: 260, w: 80, h: 60, label: '203B' },
      { id: 'MB203C', x: 540, y: 260, w: 80, h: 60, label: '203C' },
      // Right wing
      { id: 'MB204', x: 540, y: 110, w: 100, h: 80, label: 'MB204' },
      { id: 'MB205', x: 650, y: 110, w: 100, h: 80, label: 'MB205' },
      { id: 'MB206', x: 760, y: 110, w: 100, h: 80, label: 'MB206' },
      { id: 'MB_F2_BOYS_RESTROOM', x: 870, y: 110, w: 100, h: 80, label: '🚻 Boys' }
    ]
  },

  MB_3: {
    name: 'Main Block — Third Floor',
    width: 1000, height: 460,
    corridors: [
      { x: 100, y: 200, w: 800, h: 40, label: 'Corridor' }
    ],
    stairs: [
      { x: 455, y: 160, w: 70, h: 80, id: 'MB_F3_STAIRS', label: '🪜 Stairs' }
    ],
    entrances: [],
    rooms: [
      // Left wing
      { id: 'MB_F3_GIRLS_RESTROOM', x: 60, y: 110, w: 130, h: 80, label: '🚻 Girls' },
      { id: 'MB301A', x: 200, y: 110, w: 100, h: 80, label: 'MB301A' },
      { id: 'MB301B', x: 310, y: 110, w: 100, h: 80, label: 'MB301B' },
      { id: 'MB302', x: 200, y: 250, w: 110, h: 70, label: 'MB302' },
      // Near/opposite stairs
      { id: 'MB303', x: 350, y: 250, w: 100, h: 70, label: 'MB303\nStaff' },
      { id: 'MB304', x: 460, y: 260, w: 110, h: 60, label: 'MB304\nPhysics Lab' },
      // Right wing
      { id: 'MB305', x: 590, y: 110, w: 100, h: 80, label: 'MB305' },
      { id: 'MB306', x: 700, y: 110, w: 100, h: 80, label: 'MB306' },
      { id: 'MB307', x: 810, y: 110, w: 100, h: 80, label: 'MB307' },
      { id: 'MB_F3_BOYS_RESTROOM', x: 810, y: 250, w: 100, h: 70, label: '🚻 Boys' }
    ]
  },


  // ═══════════════════════════════════════════════════════════
  //  ECE BLOCK LAYOUTS
  // ═══════════════════════════════════════════════════════════

  EC_0: {
    name: 'ECE Block — Ground Floor',
    width: 800, height: 400,
    corridors: [
      { x: 100, y: 170, w: 600, h: 40, label: 'Corridor' }
    ],
    stairs: [
      { x: 60, y: 140, w: 70, h: 80, id: 'EC_GF_STAIRS', label: '🪜 Stairs' }
    ],
    entrances: [
      { x: 350, y: 310, w: 100, h: 40, id: 'EC_ENTRANCE', label: '🏛️ Entrance\n(Circle Steps)' }
    ],
    rooms: [
      { id: 'EC002', x: 200, y: 230, w: 130, h: 70, label: 'EC002\nLab' },
      { id: 'EC003', x: 370, y: 230, w: 130, h: 70, label: 'EC003\nLab' },
      { id: 'EC004', x: 540, y: 230, w: 150, h: 70, label: 'EC004\nAIDS Staff' }
    ]
  },

  EC_1: {
    name: 'ECE Block — First Floor',
    width: 800, height: 350,
    corridors: [
      { x: 100, y: 150, w: 600, h: 40, label: 'Corridor' }
    ],
    stairs: [
      { x: 60, y: 120, w: 70, h: 80, id: 'EC_F1_STAIRS', label: '🪜 Stairs' }
    ],
    entrances: [],
    rooms: [
      // Left of stairs (classrooms)
      { id: 'EC101', x: 170, y: 60, w: 140, h: 80, label: 'EC101' },
      { id: 'EC102', x: 330, y: 60, w: 140, h: 80, label: 'EC102' },
      { id: 'EC103', x: 490, y: 60, w: 140, h: 80, label: 'EC103' },
      // Right of stairs
      { id: 'EC_F1_GIRLS_RESTROOM', x: 60, y: 220, w: 130, h: 70, label: '🚻 Girls' }
    ]
  },

  EC_2: {
    name: 'ECE Block — Second Floor',
    width: 800, height: 350,
    corridors: [
      { x: 100, y: 150, w: 600, h: 40, label: 'Corridor' }
    ],
    stairs: [
      { x: 60, y: 120, w: 70, h: 80, id: 'EC_F2_STAIRS', label: '🪜 Stairs' }
    ],
    entrances: [],
    rooms: [
      { id: 'EC201', x: 170, y: 60, w: 140, h: 80, label: 'EC201' },
      { id: 'EC202', x: 330, y: 60, w: 140, h: 80, label: 'EC202' },
      { id: 'EC203', x: 490, y: 60, w: 165, h: 80, label: 'EC203\nHOD Cabin' },
      { id: 'EC_F2_ECE_STAFFROOM', x: 60, y: 220, w: 160, h: 70, label: '👨‍🏫 ECE Staff' }
    ]
  },

  EC_3: {
    name: 'ECE Block — Third Floor',
    width: 800, height: 350,
    corridors: [
      { x: 100, y: 150, w: 600, h: 40, label: 'Corridor' }
    ],
    stairs: [
      { x: 60, y: 120, w: 70, h: 80, id: 'EC_F3_STAIRS', label: '🪜 Stairs' }
    ],
    entrances: [],
    rooms: [
      { id: 'EC301', x: 170, y: 60, w: 140, h: 80, label: 'EC301' },
      { id: 'EC302', x: 330, y: 60, w: 140, h: 80, label: 'EC302' },
      { id: 'EC303', x: 490, y: 60, w: 140, h: 80, label: 'EC303' },
      { id: 'EC_F3_BOYS_RESTROOM', x: 60, y: 220, w: 130, h: 70, label: '🚻 Boys' }
    ]
  },


  // ═══════════════════════════════════════════════════════════
  //  ADMIN BLOCK LAYOUTS
  // ═══════════════════════════════════════════════════════════

  AB_0: {
    name: 'Admin Block — Ground Floor',
    width: 700, height: 550,
    corridors: [
      // Box-shaped paths
      { x: 130, y: 130, w: 440, h: 25, label: '' }, // top
      { x: 130, y: 380, w: 440, h: 25, label: '' }, // bottom
      { x: 130, y: 130, w: 25, h: 275, label: '' }, // left
      { x: 545, y: 130, w: 25, h: 275, label: '' }  // right
    ],
    stairs: [
      { x: 580, y: 200, w: 65, h: 70, id: 'AB_GF_STAIRS', label: '🪜' }
    ],
    entrances: [
      { x: 300, y: 60, w: 100, h: 40, id: 'AB_ENTRANCE', label: '🏛️ Entrance' }
    ],
    rooms: [
      // Left path from entrance
      { id: 'AB002', x: 40, y: 80, w: 110, h: 70, label: 'AB002' },
      { id: 'AB003', x: 40, y: 165, w: 110, h: 65, label: 'AB003' },
      { id: 'AB004', x: 40, y: 245, w: 110, h: 65, label: 'AB004' },
      // Opposite side
      { id: 'AB005', x: 250, y: 420, w: 110, h: 65, label: 'AB005' },
      { id: 'AB_EXAM_CELL', x: 400, y: 420, w: 130, h: 65, label: 'Exam\nCell' },
      // Right path from entrance
      { id: 'AB007', x: 500, y: 80, w: 110, h: 70, label: 'AB007' },
      { id: 'AB_MINI_CANTEEN', x: 580, y: 290, w: 90, h: 70, label: '🛒 Mini\nCanteen' },
      // Central courtyard
      { id: 'COURTYARD', x: 200, y: 190, w: 300, h: 160, label: '🌿 Money Plant\nCourtyard', isDecor: true }
    ]
  },

  AB_1: {
    name: 'Admin Block — First Floor',
    width: 700, height: 450,
    corridors: [
      { x: 130, y: 200, w: 440, h: 25, label: 'Corridor' }
    ],
    stairs: [
      { x: 300, y: 170, w: 65, h: 70, id: 'AB_F1_STAIRS', label: '🪜' }
    ],
    entrances: [],
    rooms: [
      // Right side (glass door)
      { id: 'AB_PLACEMENT_CELL', x: 400, y: 70, w: 130, h: 65, label: 'Placement\nCell' },
      { id: 'AB_DIRECTOR_ROOM', x: 400, y: 145, w: 130, h: 50, label: 'Director\nRoom' },
      { id: 'AB_IT_WORKSPACE', x: 545, y: 70, w: 120, h: 80, label: 'IT Team\nWorkspace' },
      { id: 'AB_CHAIRMAN_WAITING', x: 545, y: 160, w: 120, h: 50, label: 'Chairman\nWaiting' },
      { id: 'AB_CHAIRMAN_CHAMBER', x: 545, y: 240, w: 120, h: 70, label: 'Chairman\nChamber' },
      // Left side
      { id: 'AB_CEO_ROOM', x: 40, y: 100, w: 130, h: 65, label: 'CEO\nRoom' },
      { id: 'AB_AYAAN_FOUNDATION', x: 40, y: 180, w: 130, h: 55, label: 'Ayaan\nFoundation' },
      { id: 'AB_PRINCIPAL_WAITING', x: 185, y: 100, w: 110, h: 65, label: 'Principal\nWaiting' },
      { id: 'AB_PRINCIPAL_ROOM', x: 185, y: 180, w: 110, h: 55, label: 'Principal\nRoom' }
    ]
  },

  AB_2: {
    name: 'Admin Block — Second Floor',
    width: 700, height: 400,
    corridors: [
      { x: 130, y: 180, w: 440, h: 25, label: 'Corridor' }
    ],
    stairs: [
      { x: 300, y: 150, w: 65, h: 70, id: 'AB_F2_STAIRS', label: '🪜' }
    ],
    entrances: [],
    rooms: [
      // Right side
      { id: 'AB_F2_LABS', x: 400, y: 70, w: 140, h: 80, label: '🔬 Labs' },
      { id: 'AB_F2_BOYS_RESTROOM', x: 560, y: 70, w: 100, h: 70, label: '🚻 Boys' },
      { id: 'AB_F2_GIRLS_RESTROOM', x: 560, y: 155, w: 100, h: 70, label: '🚻 Girls' },
      // Left side
      { id: 'AB_DIGITAL_LIBRARY', x: 40, y: 70, w: 160, h: 80, label: '💻 Digital\nLibrary' },
      { id: 'AB_BALCONY', x: 40, y: 230, w: 110, h: 60, label: '🌅 Balcony' },
      { id: 'AB_LIBRARY', x: 200, y: 230, w: 150, h: 70, label: '📚 Library' }
    ]
  }
};


// ═══════════════════════════════════════════════════════════
//  MAP RENDERER CLASS
// ═══════════════════════════════════════════════════════════

class MapRenderer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.currentBlock = 'MB';
    this.currentFloor = 0;
    this.highlightedRooms = {};  // { roomId: 'current' | 'destination' | 'path' }
    this.pathRooms = [];
    this.svg = null;
    this.scale = 1;
    this.panX = 0;
    this.panY = 0;
  }

  /**
   * Get the layout key for a block and floor
   */
  getLayoutKey(block, floor) {
    return `${block}_${floor}`;
  }

  /**
   * Get layout data for given block and floor
   */
  getLayout(block, floor) {
    const key = this.getLayoutKey(block, floor);
    return FLOOR_LAYOUTS[key] || null;
  }

  /**
   * Get all available blocks
   */
  getAvailableBlocks() {
    const blocks = new Set();
    Object.keys(FLOOR_LAYOUTS).forEach(key => {
      blocks.add(key.split('_')[0]);
    });
    return Array.from(blocks);
  }

  /**
   * Get available floors for a block
   */
  getAvailableFloors(block) {
    const floors = [];
    Object.keys(FLOOR_LAYOUTS).forEach(key => {
      const parts = key.split('_');
      if (parts[0] === block) {
        floors.push(parseInt(parts[1]));
      }
    });
    return floors.sort((a, b) => a - b);
  }

  /**
   * Find which block/floor contains a given room ID
   */
  findRoomLocation(roomId) {
    for (const [key, layout] of Object.entries(FLOOR_LAYOUTS)) {
      const found = layout.rooms.find(r => r.id === roomId);
      if (found) {
        const [block, floor] = key.split('_');
        return { block, floor: parseInt(floor), room: found };
      }
      // Check stairs
      const stair = layout.stairs.find(s => s.id === roomId);
      if (stair) {
        const [block, floor] = key.split('_');
        return { block, floor: parseInt(floor), room: stair };
      }
      // Check entrances
      const ent = layout.entrances.find(e => e.id === roomId);
      if (ent) {
        const [block, floor] = key.split('_');
        return { block, floor: parseInt(floor), room: ent };
      }
    }
    return null;
  }

  /**
   * Set highlighted rooms (for navigation)
   */
  setHighlights(currentId, destinationId, pathNodeIds) {
    this.highlightedRooms = {};
    if (currentId) this.highlightedRooms[currentId] = 'current';
    if (destinationId) this.highlightedRooms[destinationId] = 'destination';
    if (pathNodeIds) {
      pathNodeIds.forEach(id => {
        if (id !== currentId && id !== destinationId) {
          this.highlightedRooms[id] = 'path';
        }
      });
    }
    this.pathRooms = pathNodeIds || [];
  }

  /**
   * Render the map for the current block and floor
   */
  render(block, floor) {
    if (block !== undefined) this.currentBlock = block;
    if (floor !== undefined) this.currentFloor = floor;

    const layout = this.getLayout(this.currentBlock, this.currentFloor);
    if (!layout || !this.container) return;

    const { width, height } = layout;

    // Create SVG
    let svg = `<svg viewBox="0 0 ${width} ${height}" class="floor-map-svg" xmlns="http://www.w3.org/2000/svg">`;

    // Background
    svg += `<rect x="0" y="0" width="${width}" height="${height}" fill="transparent" rx="12"/>`;

    // Draw corridors
    layout.corridors.forEach(c => {
      svg += `<rect x="${c.x}" y="${c.y}" width="${c.w}" height="${c.h}" 
                class="map-corridor" rx="4"/>`;
      if (c.label) {
        svg += `<text x="${c.x + c.w / 2}" y="${c.y + c.h / 2 + 4}" 
                  class="map-corridor-label">${c.label}</text>`;
      }
    });

    // Draw rooms
    layout.rooms.forEach(room => {
      if (room.isDecor) {
        // Decorative element (courtyard, etc.)
        svg += `<rect x="${room.x}" y="${room.y}" width="${room.w}" height="${room.h}" 
                  class="map-decor" rx="8"/>`;
        svg += this._renderMultilineText(room.label, room.x + room.w / 2, room.y + room.h / 2, 'map-decor-label');
      } else {
        const highlightClass = this.highlightedRooms[room.id] || '';
        const isOnPath = this.pathRooms.includes(room.id);
        const classes = ['map-room'];
        if (highlightClass) classes.push(`map-room-${highlightClass}`);
        if (isOnPath && !highlightClass) classes.push('map-room-path');

        svg += `<rect x="${room.x}" y="${room.y}" width="${room.w}" height="${room.h}" 
                  class="${classes.join(' ')}" rx="6" data-room-id="${room.id}"/>`;
        svg += this._renderMultilineText(room.label, room.x + room.w / 2, room.y + room.h / 2,
          `map-room-label${highlightClass ? ` map-label-${highlightClass}` : ''}`);
      }
    });

    // Draw stairs
    layout.stairs.forEach(stair => {
      const highlightClass = this.highlightedRooms[stair.id] || '';
      const classes = ['map-stairs'];
      if (highlightClass) classes.push(`map-room-${highlightClass}`);

      svg += `<rect x="${stair.x}" y="${stair.y}" width="${stair.w}" height="${stair.h}" 
                class="${classes.join(' ')}" rx="6" data-room-id="${stair.id}"/>`;
      svg += this._renderMultilineText(stair.label, stair.x + stair.w / 2, stair.y + stair.h / 2, 'map-stairs-label');
    });

    // Draw entrances
    layout.entrances.forEach(ent => {
      const highlightClass = this.highlightedRooms[ent.id] || '';
      const classes = ['map-entrance'];
      if (highlightClass) classes.push(`map-room-${highlightClass}`);

      svg += `<rect x="${ent.x}" y="${ent.y}" width="${ent.w}" height="${ent.h}" 
                class="${classes.join(' ')}" rx="6" data-room-id="${ent.id}"/>`;
      svg += this._renderMultilineText(ent.label, ent.x + ent.w / 2, ent.y + ent.h / 2, 'map-entrance-label');
    });

    svg += '</svg>';

    // Build tabs HTML
    const tabsHtml = this._buildTabs();

    this.container.innerHTML = tabsHtml + `<div class="floor-map-wrapper">${svg}</div>`;

    // Attach tab event listeners
    this._attachTabListeners();
  }

  /**
   * Build block and floor tab selectors
   */
  _buildTabs() {
    const blocks = this.getAvailableBlocks();
    const floors = this.getAvailableFloors(this.currentBlock);

    let html = '<div class="map-tabs-container">';

    // Block tabs
    html += '<div class="map-block-tabs">';
    blocks.forEach(b => {
      const blockName = BLOCKS[b] || b;
      const isActive = b === this.currentBlock;
      html += `<button class="map-tab map-block-tab ${isActive ? 'active' : ''}" data-block="${b}">${blockName}</button>`;
    });
    html += '</div>';

    // Floor tabs
    html += '<div class="map-floor-tabs">';
    floors.forEach(f => {
      const isActive = f === this.currentFloor;
      const floorLabel = f === 0 ? 'GF' : `F${f}`;
      html += `<button class="map-tab map-floor-tab ${isActive ? 'active' : ''}" data-floor="${f}">${floorLabel}</button>`;
    });
    html += '</div>';

    html += '</div>';
    return html;
  }

  /**
   * Attach click listeners to tabs
   */
  _attachTabListeners() {
    if (!this.container) return;

    this.container.querySelectorAll('.map-block-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const block = tab.dataset.block;
        const floors = this.getAvailableFloors(block);
        this.render(block, floors[0] || 0);
      });
    });

    this.container.querySelectorAll('.map-floor-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const floor = parseInt(tab.dataset.floor);
        this.render(this.currentBlock, floor);
      });
    });
  }

  /**
   * Render multiline text in SVG
   */
  _renderMultilineText(text, cx, cy, className) {
    const lines = text.split('\n');
    const lineHeight = 13;
    const startY = cy - ((lines.length - 1) * lineHeight) / 2;

    return lines.map((line, i) =>
      `<text x="${cx}" y="${startY + i * lineHeight}" class="${className}">${this._escSvg(line)}</text>`
    ).join('');
  }

  /**
   * Escape SVG text
   */
  _escSvg(text) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /**
   * Navigate the map to show a specific room
   */
  navigateToRoom(roomId) {
    const loc = this.findRoomLocation(roomId);
    if (loc) {
      this.render(loc.block, loc.floor);
    }
  }

  /**
   * Update map for a navigation step
   */
  updateForNavStep(stepNodeId, startId, endId, allStepNodeIds) {
    this.setHighlights(stepNodeId, endId, allStepNodeIds);

    // Find which floor the current step is on
    const loc = this.findRoomLocation(stepNodeId);
    if (loc) {
      this.render(loc.block, loc.floor);
    } else {
      // Fallback: show destination floor
      const destLoc = this.findRoomLocation(endId);
      if (destLoc) {
        this.render(destLoc.block, destLoc.floor);
      } else {
        this.render();
      }
    }
  }
}
