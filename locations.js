// ============================================================
// AdhiNav — Location Master Data (v2.0 — Complete Campus)
// All rooms, waypoints, landmarks, and scannable locations
// ============================================================

const LOCATION_TYPES = {
  ROOM: 'room',
  STAFFROOM: 'staffroom',
  LAB: 'lab',
  RESTROOM: 'restroom',
  SEMINAR_HALL: 'seminar_hall',
  LIBRARY: 'library',
  OFFICE: 'office',
  STAIRS: 'stairs',
  ENTRANCE: 'entrance',
  PORTICO: 'portico',
  CORRIDOR: 'corridor',
  LANDMARK: 'landmark',
  WAYPOINT: 'waypoint',
  SHOP: 'shop'
};

const BLOCKS = {
  MB: 'Main Block',
  AB: 'Admin Block',
  EC: 'ECE Block',
  CN: 'Canteen',
  CAMPUS: 'Campus'
};

// ── All locations ──────────────────────────────────────────
// id:          Unique identifier (used in QR codes as ADHINAV:<id>)
// name:        Human-readable display name
// aliases:     Alternative names for search
// block:       Which block this belongs to
// floor:       Floor number (0 = ground)
// type:        LOCATION_TYPES value
// side:        'left' | 'right' | 'center' | 'opposite' | 'straight' (from stairs)
// description: Contextual info about the location
// scannable:   true if a QR code is placed here
// selectable:  true if user can pick this as a destination

const LOCATIONS = [

  // ═══════════════════════════════════════════════════════════
  //  MAIN BLOCK — STRUCTURAL / WAYPOINTS
  // ═══════════════════════════════════════════════════════════

  // ── Ground Floor Structure ──
  {
    id: 'MB_ENTRANCE',
    name: 'Main Block Entrance (West Portico)',
    aliases: ['mb entrance', 'main entrance', 'main block', 'main gate', 'west portico', 'mb ground floor entrance', 'main block entrance'],
    block: 'MB', floor: 0, type: LOCATION_TYPES.ENTRANCE,
    side: 'center',
    description: 'The main entrance of the Main Block on the west side.',
    scannable: true, selectable: true
  },
  {
    id: 'MB_WEST_PORTICO',
    name: 'MB West Portico',
    aliases: ['west portico', 'mb west', 'west side portico', 'main block entrance portico'],
    block: 'MB', floor: 0, type: LOCATION_TYPES.PORTICO,
    side: 'center',
    description: 'The west-side portico — main entrance to the Main Block.',
    scannable: true, selectable: true
  },
  {
    id: 'MB_EAST_PORTICO',
    name: 'MB East Portico',
    aliases: ['east portico', 'mb east', 'east side portico', 'rear entrance', 'back entrance'],
    block: 'MB', floor: 0, type: LOCATION_TYPES.PORTICO,
    side: 'center',
    description: 'The east-side portico — rear entrance of the Main Block.',
    scannable: true, selectable: true
  },
  {
    id: 'MB_GF_PERP_HALLWAY',
    name: 'MB Ground Floor Perpendicular Hallway',
    aliases: ['perpendicular hallway', 'cross hallway', 'connecting hallway'],
    block: 'MB', floor: 0, type: LOCATION_TYPES.CORRIDOR,
    side: 'center',
    description: 'The perpendicular hallway linking West and East porticos, crossing the staircase area.',
    scannable: false, selectable: false
  },
  {
    id: 'MB_GF_CORRIDOR',
    name: 'MB Ground Floor Main Corridor',
    aliases: ['mb ground corridor', 'ground floor hallway'],
    block: 'MB', floor: 0, type: LOCATION_TYPES.CORRIDOR,
    side: 'center',
    description: 'The main straight corridor (hallway) on the ground floor.',
    scannable: false, selectable: false
  },
  {
    id: 'MB_GF_LEFT_WING',
    name: 'MB Ground Floor Left Wing',
    aliases: ['mb ground left', 'left wing ground'],
    block: 'MB', floor: 0, type: LOCATION_TYPES.CORRIDOR,
    side: 'left',
    description: 'Left wing corridor from the stairs on the ground floor.',
    scannable: false, selectable: false
  },
  {
    id: 'MB_GF_RIGHT_WING',
    name: 'MB Ground Floor Right Wing',
    aliases: ['mb ground right', 'right wing ground'],
    block: 'MB', floor: 0, type: LOCATION_TYPES.CORRIDOR,
    side: 'right',
    description: 'Right wing corridor from the stairs on the ground floor.',
    scannable: false, selectable: false
  },

  // ── Stairs (one per floor) ──
  {
    id: 'MB_GF_STAIRS',
    name: 'MB Ground Floor Stairs',
    aliases: ['mb ground stairs', 'mb stairs ground', 'main block stairs ground floor'],
    block: 'MB', floor: 0, type: LOCATION_TYPES.STAIRS,
    side: 'center',
    description: 'The central staircase at the midpoint of the ground floor hallway.',
    scannable: true, selectable: true
  },
  {
    id: 'MB_F1_STAIRS',
    name: 'MB First Floor Stairs',
    aliases: ['mb first floor stairs', 'mb 1st floor stairs', 'mb stairs first', 'main block stairs first floor'],
    block: 'MB', floor: 1, type: LOCATION_TYPES.STAIRS,
    side: 'center',
    description: 'The central staircase landing on the first floor.',
    scannable: true, selectable: true
  },
  {
    id: 'MB_F2_STAIRS',
    name: 'MB Second Floor Stairs',
    aliases: ['mb second floor stairs', 'mb 2nd floor stairs', 'mb stairs second', 'main block stairs second floor'],
    block: 'MB', floor: 2, type: LOCATION_TYPES.STAIRS,
    side: 'center',
    description: 'The central staircase landing on the second floor.',
    scannable: true, selectable: true
  },
  {
    id: 'MB_F3_STAIRS',
    name: 'MB Third Floor Stairs',
    aliases: ['mb third floor stairs', 'mb 3rd floor stairs', 'mb stairs third', 'main block stairs third floor'],
    block: 'MB', floor: 3, type: LOCATION_TYPES.STAIRS,
    side: 'center',
    description: 'The central staircase landing on the third floor.',
    scannable: true, selectable: true
  },

  // ── Floor Corridors ──
  {
    id: 'MB_F1_LEFT_WING',
    name: 'MB First Floor Left Wing',
    aliases: ['first floor left wing'],
    block: 'MB', floor: 1, type: LOCATION_TYPES.CORRIDOR,
    side: 'left', description: 'Left wing corridor on the first floor.',
    scannable: false, selectable: false
  },
  {
    id: 'MB_F1_RIGHT_WING',
    name: 'MB First Floor Right Wing',
    aliases: ['first floor right wing'],
    block: 'MB', floor: 1, type: LOCATION_TYPES.CORRIDOR,
    side: 'right', description: 'Right wing corridor on the first floor.',
    scannable: false, selectable: false
  },
  {
    id: 'MB_F1_STRAIGHT',
    name: 'MB First Floor Straight Ahead',
    aliases: [],
    block: 'MB', floor: 1, type: LOCATION_TYPES.CORRIDOR,
    side: 'straight', description: 'The corridor straight ahead from the first floor stairs.',
    scannable: false, selectable: false
  },
  {
    id: 'MB_F1_EAST_PORTICO_STAIRS',
    name: 'MB First Floor East Portico Stairs',
    aliases: ['east portico stairs first floor', 'east side stairs'],
    block: 'MB', floor: 1, type: LOCATION_TYPES.STAIRS,
    side: 'right', description: 'Separate stairs on the east portico side, accessible from outside.',
    scannable: false, selectable: false
  },
  {
    id: 'MB_F2_LEFT_WING',
    name: 'MB Second Floor Left Wing',
    aliases: ['second floor left wing'],
    block: 'MB', floor: 2, type: LOCATION_TYPES.CORRIDOR,
    side: 'left', description: 'Left wing corridor on the second floor.',
    scannable: false, selectable: false
  },
  {
    id: 'MB_F2_RIGHT_WING',
    name: 'MB Second Floor Right Wing',
    aliases: ['second floor right wing'],
    block: 'MB', floor: 2, type: LOCATION_TYPES.CORRIDOR,
    side: 'right', description: 'Right wing corridor on the second floor.',
    scannable: false, selectable: false
  },
  {
    id: 'MB_F2_STRAIGHT',
    name: 'MB Second Floor Straight Ahead',
    aliases: [],
    block: 'MB', floor: 2, type: LOCATION_TYPES.CORRIDOR,
    side: 'straight', description: 'The corridor straight ahead from the second floor stairs.',
    scannable: false, selectable: false
  },
  {
    id: 'MB_F3_LEFT_WING',
    name: 'MB Third Floor Left Wing',
    aliases: ['third floor left wing'],
    block: 'MB', floor: 3, type: LOCATION_TYPES.CORRIDOR,
    side: 'left', description: 'Left wing corridor on the third floor.',
    scannable: false, selectable: false
  },
  {
    id: 'MB_F3_RIGHT_WING',
    name: 'MB Third Floor Right Wing',
    aliases: ['third floor right wing'],
    block: 'MB', floor: 3, type: LOCATION_TYPES.CORRIDOR,
    side: 'right', description: 'Right wing corridor on the third floor.',
    scannable: false, selectable: false
  },
  {
    id: 'MB_F3_STRAIGHT',
    name: 'MB Third Floor Straight Ahead',
    aliases: [],
    block: 'MB', floor: 3, type: LOCATION_TYPES.CORRIDOR,
    side: 'straight', description: 'The corridor straight ahead from the third floor stairs.',
    scannable: false, selectable: false
  },


  // ═══════════════════════════════════════════════════════════
  //  MAIN BLOCK — GROUND FLOOR ROOMS
  // ═══════════════════════════════════════════════════════════

  // Left side of stairs (walking left from staircase)
  {
    id: 'MB_GF_GIRLS_RESTROOM',
    name: 'Girls Restroom (MB Ground Floor)',
    aliases: ['mb ground girls restroom', 'girls toilet ground', 'ladies washroom ground', 'girls restroom ground floor', 'girls bathroom ground'],
    block: 'MB', floor: 0, type: LOCATION_TYPES.RESTROOM,
    side: 'left',
    description: 'Left-most room on the ground floor — last room when you turn left from stairs.',
    scannable: false, selectable: true
  },
  {
    id: 'MB001',
    name: 'MB001 — EEE Staffroom',
    aliases: ['mb 001', 'mb001', 'eee staffroom', 'eee staff room', 'eee staff', 'electrical staffroom', 'electrical staff', 'eee office', 'electrical engineering staffroom', 'main block 001'],
    block: 'MB', floor: 0, type: LOCATION_TYPES.STAFFROOM,
    side: 'left',
    description: 'EEE Department staffroom — the room before the Girls Restroom on the left from stairs.',
    scannable: false, selectable: true
  },
  {
    id: 'MB002',
    name: 'MB002',
    aliases: ['mb 002', 'mb002', 'mb ground 2', 'main block 002'],
    block: 'MB', floor: 0, type: LOCATION_TYPES.ROOM,
    side: 'left',
    description: 'Second room on the left wing of the ground floor.',
    scannable: false, selectable: true
  },
  {
    id: 'MB003',
    name: 'MB003',
    aliases: ['mb 003', 'mb003', 'mb ground 3', 'main block 003'],
    block: 'MB', floor: 0, type: LOCATION_TYPES.ROOM,
    side: 'left',
    description: 'Third room on the left wing of the ground floor.',
    scannable: false, selectable: true
  },

  // Opposite of stairs (ground floor)
  {
    id: 'MB_GF_ADMIN_CELL',
    name: 'Administrative Cell',
    aliases: ['admin cell', 'administrative cell', 'admin office ground floor', 'administration cell', 'administrative office'],
    block: 'MB', floor: 0, type: LOCATION_TYPES.OFFICE,
    side: 'opposite',
    description: 'Located directly opposite the staircase on the ground floor.',
    scannable: false, selectable: true
  },

  // Next to stairs on same side
  {
    id: 'MB_GF_SH_STAFFROOM',
    name: 'S&H Staffroom',
    aliases: ['s&h staffroom', 'sh staffroom', 'science and humanities staffroom', 'science humanities staff', 'sh staff', 's and h staff', 'science staffroom'],
    block: 'MB', floor: 0, type: LOCATION_TYPES.STAFFROOM,
    side: 'center',
    description: 'Science & Humanities staffroom — opposite the Administrative Cell, next to the stairs.',
    scannable: false, selectable: true
  },

  // Right side of stairs & perpendicular hallway
  {
    id: 'MB004',
    name: 'MB004',
    aliases: ['mb 004', 'mb004', 'mb ground 4', 'main block 004'],
    block: 'MB', floor: 0, type: LOCATION_TYPES.ROOM,
    side: 'right',
    description: 'First room on the right side of stairs on the ground floor.',
    scannable: false, selectable: true
  },
  {
    id: 'MB005',
    name: 'MB005 — Chemistry Lab',
    aliases: ['mb 005', 'mb005', 'chemistry lab', 'chem lab', 'chemistry laboratory', 'main block 005', 'mb ground 5'],
    block: 'MB', floor: 0, type: LOCATION_TYPES.LAB,
    side: 'right',
    description: 'Chemistry Laboratory — second room on the right side of the ground floor.',
    scannable: false, selectable: true
  },
  {
    id: 'MB_GF_BOYS_RESTROOM',
    name: 'Boys Restroom (MB Ground Floor)',
    aliases: ['mb ground boys restroom', 'boys toilet ground', 'gents washroom ground', 'boys restroom ground floor', 'boys bathroom ground'],
    block: 'MB', floor: 0, type: LOCATION_TYPES.RESTROOM,
    side: 'right',
    description: 'Right-most room on the ground floor — last room on the right from stairs.',
    scannable: false, selectable: true
  },


  // ═══════════════════════════════════════════════════════════
  //  MAIN BLOCK — FIRST FLOOR ROOMS
  // ═══════════════════════════════════════════════════════════

  // Left side of stairs
  {
    id: 'MB_F1_GIRLS_RESTROOM',
    name: 'Girls Restroom (MB First Floor)',
    aliases: ['mb first floor girls restroom', 'girls toilet first floor', 'ladies washroom first floor', 'girls restroom 1st floor'],
    block: 'MB', floor: 1, type: LOCATION_TYPES.RESTROOM,
    side: 'left',
    description: 'Left-most room on the first floor — last room when you turn left from stairs.',
    scannable: false, selectable: true
  },
  {
    id: 'MB102',
    name: 'Dr Radhakrishnan Seminar Hall',
    aliases: ['mb 102', 'mb102', 'seminar hall', 'radhakrishnan hall', 'dr radhakrishnan seminar hall', 'radhakrishnan seminar', 'main block 102', 'seminar hall first floor'],
    block: 'MB', floor: 1, type: LOCATION_TYPES.SEMINAR_HALL,
    side: 'left',
    description: 'Dr Radhakrishnan Seminar Hall — large hall on the left wing, first floor.',
    scannable: true, selectable: true
  },
  {
    id: 'MB103A',
    name: 'MB103A',
    aliases: ['mb 103a', 'mb103a', 'mb103 a', 'mb 103 a', 'main block 103a'],
    block: 'MB', floor: 1, type: LOCATION_TYPES.ROOM,
    side: 'left',
    description: 'Opposite the CSE Staffroom on the first floor left wing.',
    scannable: false, selectable: true
  },
  {
    id: 'MB103B',
    name: 'MB103B',
    aliases: ['mb 103b', 'mb103b', 'mb103 b', 'mb 103 b', 'main block 103b'],
    block: 'MB', floor: 1, type: LOCATION_TYPES.ROOM,
    side: 'opposite',
    description: 'Directly opposite the stairs on the first floor.',
    scannable: false, selectable: true
  },

  // Next to stairs (first floor)
  {
    id: 'MB_F1_CSE_STAFFROOM',
    name: 'CSE Department Staffroom',
    aliases: ['cse staffroom', 'cse staff room', 'cse staff', 'computer science staffroom', 'cse office', 'cse department staff', 'computer staff', 'cs staffroom'],
    block: 'MB', floor: 1, type: LOCATION_TYPES.STAFFROOM,
    side: 'center',
    description: 'CSE Department staffroom — next to the stairs on the same side, first floor.',
    scannable: false, selectable: true
  },

  // MB103C — accessed via separate east portico stairs
  {
    id: 'MB103C',
    name: 'MB103C',
    aliases: ['mb 103c', 'mb103c', 'mb103 c', 'main block 103c'],
    block: 'MB', floor: 1, type: LOCATION_TYPES.ROOM,
    side: 'right',
    description: 'Outside room accessible only via separate stairs on the east portico.',
    scannable: false, selectable: true
  },

  // MB107 — opposite MB104, immediate right next to stairs
  {
    id: 'MB107',
    name: 'MB107',
    aliases: ['mb 107', 'mb107', 'main block 107'],
    block: 'MB', floor: 1, type: LOCATION_TYPES.ROOM,
    side: 'right',
    description: 'Opposite MB104 and MB103B — immediate right next to the stairs on the same side.',
    scannable: false, selectable: true
  },

  // Right side of stairs
  {
    id: 'MB104',
    name: 'MB104',
    aliases: ['mb 104', 'mb104', 'main block 104'],
    block: 'MB', floor: 1, type: LOCATION_TYPES.ROOM,
    side: 'right',
    description: 'First room on the right wing of the first floor.',
    scannable: false, selectable: true
  },
  {
    id: 'MB105',
    name: 'MB105',
    aliases: ['mb 105', 'mb105', 'main block 105'],
    block: 'MB', floor: 1, type: LOCATION_TYPES.ROOM,
    side: 'right',
    description: 'Second room on the right wing of the first floor.',
    scannable: false, selectable: true
  },
  {
    id: 'MB106',
    name: 'MB106',
    aliases: ['mb 106', 'mb106', 'main block 106'],
    block: 'MB', floor: 1, type: LOCATION_TYPES.ROOM,
    side: 'right',
    description: 'Third room on the right wing of the first floor.',
    scannable: false, selectable: true
  },
  {
    id: 'MB_F1_BOYS_RESTROOM',
    name: 'Boys Restroom (MB First Floor)',
    aliases: ['mb first floor boys restroom', 'boys toilet first floor', 'gents washroom first floor', 'boys restroom 1st floor'],
    block: 'MB', floor: 1, type: LOCATION_TYPES.RESTROOM,
    side: 'right',
    description: 'Right-most room on the first floor — last room on the right from stairs.',
    scannable: false, selectable: true
  },


  // ═══════════════════════════════════════════════════════════
  //  MAIN BLOCK — SECOND FLOOR ROOMS
  // ═══════════════════════════════════════════════════════════

  // Left side of stairs
  {
    id: 'MB_F2_GIRLS_RESTROOM',
    name: 'Girls Restroom (MB Second Floor)',
    aliases: ['mb second floor girls restroom', 'girls toilet second floor', 'ladies washroom second floor', 'girls restroom 2nd floor'],
    block: 'MB', floor: 2, type: LOCATION_TYPES.RESTROOM,
    side: 'left',
    description: 'Left-most room on the second floor.',
    scannable: false, selectable: true
  },
  {
    id: 'MB_F2_IT_STAFFROOM',
    name: 'IT Department Staffroom',
    aliases: ['it staffroom', 'it staff room', 'it staff', 'information technology staffroom', 'it office', 'it department staff'],
    block: 'MB', floor: 2, type: LOCATION_TYPES.STAFFROOM,
    side: 'left',
    description: 'IT Department staffroom — on the left wing of the second floor.',
    scannable: false, selectable: true
  },
  {
    id: 'MB202',
    name: 'MB202',
    aliases: ['mb 202', 'mb202', 'main block 202'],
    block: 'MB', floor: 2, type: LOCATION_TYPES.ROOM,
    side: 'left',
    description: 'Second room on the left wing of the second floor.',
    scannable: false, selectable: true
  },
  {
    id: 'MB203',
    name: 'MB203',
    aliases: ['mb 203', 'mb203', 'main block 203'],
    block: 'MB', floor: 2, type: LOCATION_TYPES.ROOM,
    side: 'left',
    description: 'Opposite the Mechanical Staffroom on the second floor left wing.',
    scannable: false, selectable: true
  },

  // Next to stairs (second floor)
  {
    id: 'MB_F2_MECH_STAFFROOM',
    name: 'Mechanical Staffroom',
    aliases: ['mechanical staffroom', 'mech staffroom', 'mech staff room', 'mech staff', 'mechanical staff', 'mechanical engineering staffroom', 'mechanical department staff', 'mech department'],
    block: 'MB', floor: 2, type: LOCATION_TYPES.STAFFROOM,
    side: 'center',
    description: 'Mechanical Department staffroom — next to the stairs on the same side, second floor.',
    scannable: false, selectable: true
  },

  // Straight opposite of stairs (second floor)
  {
    id: 'MB203A',
    name: 'MB203A',
    aliases: ['mb 203a', 'mb203a', 'mb203 a', 'main block 203a'],
    block: 'MB', floor: 2, type: LOCATION_TYPES.ROOM,
    side: 'opposite',
    description: 'Directly opposite the stairs on the second floor (one of three rooms).',
    scannable: false, selectable: true
  },
  {
    id: 'MB203B',
    name: 'MB203B',
    aliases: ['mb 203b', 'mb203b', 'mb203 b', 'main block 203b'],
    block: 'MB', floor: 2, type: LOCATION_TYPES.ROOM,
    side: 'opposite',
    description: 'Directly opposite the stairs on the second floor (middle room).',
    scannable: false, selectable: true
  },
  {
    id: 'MB203C',
    name: 'MB203C',
    aliases: ['mb 203c', 'mb203c', 'mb203 c', 'main block 203c'],
    block: 'MB', floor: 2, type: LOCATION_TYPES.ROOM,
    side: 'opposite',
    description: 'Directly opposite the stairs on the second floor (third room).',
    scannable: false, selectable: true
  },

  // Right side of stairs
  {
    id: 'MB204',
    name: 'MB204',
    aliases: ['mb 204', 'mb204', 'main block 204'],
    block: 'MB', floor: 2, type: LOCATION_TYPES.ROOM,
    side: 'right',
    description: 'First room on the right wing of the second floor.',
    scannable: false, selectable: true
  },
  {
    id: 'MB205',
    name: 'MB205',
    aliases: ['mb 205', 'mb205', 'main block 205'],
    block: 'MB', floor: 2, type: LOCATION_TYPES.ROOM,
    side: 'right',
    description: 'Second room on the right wing of the second floor.',
    scannable: false, selectable: true
  },
  {
    id: 'MB206',
    name: 'MB206',
    aliases: ['mb 206', 'mb206', 'main block 206'],
    block: 'MB', floor: 2, type: LOCATION_TYPES.ROOM,
    side: 'right',
    description: 'Third room on the right wing of the second floor.',
    scannable: false, selectable: true
  },
  {
    id: 'MB_F2_BOYS_RESTROOM',
    name: 'Boys Restroom (MB Second Floor)',
    aliases: ['mb second floor boys restroom', 'boys toilet second floor', 'gents washroom second floor', 'boys restroom 2nd floor'],
    block: 'MB', floor: 2, type: LOCATION_TYPES.RESTROOM,
    side: 'right',
    description: 'Right-most room on the second floor.',
    scannable: false, selectable: true
  },


  // ═══════════════════════════════════════════════════════════
  //  MAIN BLOCK — THIRD FLOOR ROOMS
  // ═══════════════════════════════════════════════════════════

  // Left side of stairs
  {
    id: 'MB_F3_GIRLS_RESTROOM',
    name: 'Girls Restroom (MB Third Floor)',
    aliases: ['mb third floor girls restroom', 'girls toilet third floor', 'ladies washroom third floor', 'girls restroom 3rd floor'],
    block: 'MB', floor: 3, type: LOCATION_TYPES.RESTROOM,
    side: 'left',
    description: 'Left-most room on the third floor.',
    scannable: false, selectable: true
  },
  {
    id: 'MB301A',
    name: 'MB301A',
    aliases: ['mb 301a', 'mb301a', 'mb301 a', 'main block 301a'],
    block: 'MB', floor: 3, type: LOCATION_TYPES.ROOM,
    side: 'left',
    description: 'First room on the left wing of the third floor.',
    scannable: false, selectable: true
  },
  {
    id: 'MB301B',
    name: 'MB301B',
    aliases: ['mb 301b', 'mb301b', 'mb301 b', 'main block 301b'],
    block: 'MB', floor: 3, type: LOCATION_TYPES.ROOM,
    side: 'left',
    description: 'Second room on the left wing of the third floor.',
    scannable: false, selectable: true
  },
  {
    id: 'MB302',
    name: 'MB302',
    aliases: ['mb 302', 'mb302', 'main block 302'],
    block: 'MB', floor: 3, type: LOCATION_TYPES.ROOM,
    side: 'left',
    description: 'Third room on the left wing of the third floor.',
    scannable: false, selectable: true
  },

  // Next to stairs / opposite stairs (third floor)
  {
    id: 'MB303',
    name: 'MB303 — Staffroom',
    aliases: ['mb 303', 'mb303', 'mb303 staffroom', 'third floor staffroom', 'main block 303', 'mb303 staff room', '3rd floor staff'],
    block: 'MB', floor: 3, type: LOCATION_TYPES.STAFFROOM,
    side: 'center',
    description: 'Staffroom on the third floor near the stairs.',
    scannable: false, selectable: true
  },
  {
    id: 'MB304',
    name: 'MB304 — Physics Lab',
    aliases: ['mb 304', 'mb304', 'physics lab', 'physics laboratory', 'main block 304', 'phy lab'],
    block: 'MB', floor: 3, type: LOCATION_TYPES.LAB,
    side: 'opposite',
    description: 'Physics Laboratory — straight opposite the stairs on the third floor.',
    scannable: false, selectable: true
  },

  // Right side of stairs
  {
    id: 'MB305',
    name: 'MB305',
    aliases: ['mb 305', 'mb305', 'main block 305'],
    block: 'MB', floor: 3, type: LOCATION_TYPES.ROOM,
    side: 'right',
    description: 'First room on the right wing of the third floor.',
    scannable: false, selectable: true
  },
  {
    id: 'MB306',
    name: 'MB306',
    aliases: ['mb 306', 'mb306', 'main block 306'],
    block: 'MB', floor: 3, type: LOCATION_TYPES.ROOM,
    side: 'right',
    description: 'Second room on the right wing of the third floor.',
    scannable: false, selectable: true
  },
  {
    id: 'MB307',
    name: 'MB307',
    aliases: ['mb 307', 'mb307', 'main block 307'],
    block: 'MB', floor: 3, type: LOCATION_TYPES.ROOM,
    side: 'right',
    description: 'Third (last) room on the right wing of the third floor.',
    scannable: false, selectable: true
  },
  {
    id: 'MB_F3_BOYS_RESTROOM',
    name: 'Boys Restroom (MB Third Floor)',
    aliases: ['mb third floor boys restroom', 'boys toilet third floor', 'gents washroom third floor', 'boys restroom 3rd floor'],
    block: 'MB', floor: 3, type: LOCATION_TYPES.RESTROOM,
    side: 'right',
    description: 'Right-most room on the third floor.',
    scannable: false, selectable: true
  },


  // ═══════════════════════════════════════════════════════════
  //  ECE BLOCK — STRUCTURAL / WAYPOINTS
  // ═══════════════════════════════════════════════════════════

  {
    id: 'EC_ENTRANCE',
    name: 'ECE Block Entrance',
    aliases: ['ece entrance', 'ec entrance', 'ece block entrance', 'ece department entrance', 'ece block', 'ece building entrance'],
    block: 'EC', floor: 0, type: LOCATION_TYPES.ENTRANCE,
    side: 'center',
    description: 'ECE Block department entrance with circle steps in the middle of the block.',
    scannable: true, selectable: true
  },
  {
    id: 'EC_GF_CORRIDOR',
    name: 'ECE Ground Floor Corridor',
    aliases: ['ece ground corridor'],
    block: 'EC', floor: 0, type: LOCATION_TYPES.CORRIDOR,
    side: 'center', description: 'Ground floor corridor of ECE Block.',
    scannable: false, selectable: false
  },
  {
    id: 'EC_GF_STAIRS',
    name: 'ECE Block Staircase (Ground Floor)',
    aliases: ['ece stairs ground', 'ec stairs ground', 'ece ground floor stairs', 'ece staircase'],
    block: 'EC', floor: 0, type: LOCATION_TYPES.STAIRS,
    side: 'left',
    description: 'Staircase at one end (left side) of the ECE Block hallway.',
    scannable: true, selectable: true
  },
  {
    id: 'EC_F1_STAIRS',
    name: 'ECE Block Staircase (First Floor)',
    aliases: ['ece stairs first', 'ec stairs 1st floor', 'ece first floor stairs'],
    block: 'EC', floor: 1, type: LOCATION_TYPES.STAIRS,
    side: 'left', description: 'ECE Block staircase landing on the first floor.',
    scannable: true, selectable: true
  },
  {
    id: 'EC_F1_LEFT',
    name: 'ECE First Floor Left Corridor',
    aliases: [],
    block: 'EC', floor: 1, type: LOCATION_TYPES.CORRIDOR,
    side: 'left', description: 'Left corridor from stairs on ECE first floor.',
    scannable: false, selectable: false
  },
  {
    id: 'EC_F1_RIGHT',
    name: 'ECE First Floor Right Corridor',
    aliases: [],
    block: 'EC', floor: 1, type: LOCATION_TYPES.CORRIDOR,
    side: 'right', description: 'Right corridor from stairs on ECE first floor.',
    scannable: false, selectable: false
  },
  {
    id: 'EC_F2_STAIRS',
    name: 'ECE Block Staircase (Second Floor)',
    aliases: ['ece stairs second', 'ec stairs 2nd floor', 'ece second floor stairs'],
    block: 'EC', floor: 2, type: LOCATION_TYPES.STAIRS,
    side: 'left', description: 'ECE Block staircase landing on the second floor.',
    scannable: true, selectable: true
  },
  {
    id: 'EC_F2_LEFT',
    name: 'ECE Second Floor Left Corridor',
    aliases: [],
    block: 'EC', floor: 2, type: LOCATION_TYPES.CORRIDOR,
    side: 'left', description: 'Left corridor from stairs on ECE second floor.',
    scannable: false, selectable: false
  },
  {
    id: 'EC_F2_RIGHT',
    name: 'ECE Second Floor Right Corridor',
    aliases: [],
    block: 'EC', floor: 2, type: LOCATION_TYPES.CORRIDOR,
    side: 'right', description: 'Right corridor from stairs on ECE second floor.',
    scannable: false, selectable: false
  },
  {
    id: 'EC_F3_STAIRS',
    name: 'ECE Block Staircase (Third Floor)',
    aliases: ['ece stairs third', 'ec stairs 3rd floor', 'ece third floor stairs'],
    block: 'EC', floor: 3, type: LOCATION_TYPES.STAIRS,
    side: 'left', description: 'ECE Block staircase landing on the third floor.',
    scannable: true, selectable: true
  },
  {
    id: 'EC_F3_LEFT',
    name: 'ECE Third Floor Left Corridor',
    aliases: [],
    block: 'EC', floor: 3, type: LOCATION_TYPES.CORRIDOR,
    side: 'left', description: 'Left corridor from stairs on ECE third floor.',
    scannable: false, selectable: false
  },
  {
    id: 'EC_F3_RIGHT',
    name: 'ECE Third Floor Right Corridor',
    aliases: [],
    block: 'EC', floor: 3, type: LOCATION_TYPES.CORRIDOR,
    side: 'right', description: 'Right corridor from stairs on ECE third floor.',
    scannable: false, selectable: false
  },


  // ═══════════════════════════════════════════════════════════
  //  ECE BLOCK — ROOMS
  // ═══════════════════════════════════════════════════════════

  // Ground Floor
  {
    id: 'EC002',
    name: 'EC002 — Lab',
    aliases: ['ec 002', 'ec002', 'ece lab 002', 'ec ground lab', 'ece ground floor lab 1'],
    block: 'EC', floor: 0, type: LOCATION_TYPES.LAB,
    side: 'center',
    description: 'Lab on ECE Block ground floor, near the department entrance.',
    scannable: false, selectable: true
  },
  {
    id: 'EC003',
    name: 'EC003 — Lab',
    aliases: ['ec 003', 'ec003', 'ece lab 003', 'ece ground floor lab 2'],
    block: 'EC', floor: 0, type: LOCATION_TYPES.LAB,
    side: 'center',
    description: 'Lab on ECE Block ground floor, near the department entrance.',
    scannable: false, selectable: true
  },
  {
    id: 'EC004',
    name: 'EC004 — AIDS Staffroom',
    aliases: ['ec 004', 'ec004', 'aids staffroom', 'aids staff room', 'aids staff', 'aids department', 'ai ds staffroom', 'artificial intelligence staffroom'],
    block: 'EC', floor: 0, type: LOCATION_TYPES.STAFFROOM,
    side: 'center',
    description: 'AIDS Department staffroom on ECE Block ground floor.',
    scannable: false, selectable: true
  },

  // First Floor
  {
    id: 'EC101',
    name: 'EC101',
    aliases: ['ec 101', 'ec101', 'ece 101', 'ece first floor room 1'],
    block: 'EC', floor: 1, type: LOCATION_TYPES.ROOM,
    side: 'left',
    description: 'First classroom — turn left from ECE stairs on the first floor.',
    scannable: false, selectable: true
  },
  {
    id: 'EC102',
    name: 'EC102',
    aliases: ['ec 102', 'ec102', 'ece 102', 'ece first floor room 2'],
    block: 'EC', floor: 1, type: LOCATION_TYPES.ROOM,
    side: 'left',
    description: 'Second classroom on the left from ECE stairs, first floor.',
    scannable: false, selectable: true
  },
  {
    id: 'EC103',
    name: 'EC103',
    aliases: ['ec 103', 'ec103', 'ece 103', 'ece first floor room 3'],
    block: 'EC', floor: 1, type: LOCATION_TYPES.ROOM,
    side: 'left',
    description: 'Third classroom on the left from ECE stairs, first floor.',
    scannable: false, selectable: true
  },
  {
    id: 'EC_F1_GIRLS_RESTROOM',
    name: 'Girls Restroom (ECE First Floor)',
    aliases: ['ece girls restroom', 'ec girls toilet', 'ece girls washroom', 'ece first floor girls restroom'],
    block: 'EC', floor: 1, type: LOCATION_TYPES.RESTROOM,
    side: 'right',
    description: 'Turn right from ECE stairs on the first floor.',
    scannable: false, selectable: true
  },

  // Second Floor
  {
    id: 'EC201',
    name: 'EC201',
    aliases: ['ec 201', 'ec201', 'ece 201', 'ece second floor room 1'],
    block: 'EC', floor: 2, type: LOCATION_TYPES.ROOM,
    side: 'left',
    description: 'First classroom — turn left from ECE stairs on the second floor.',
    scannable: false, selectable: true
  },
  {
    id: 'EC202',
    name: 'EC202',
    aliases: ['ec 202', 'ec202', 'ece 202', 'ece second floor room 2'],
    block: 'EC', floor: 2, type: LOCATION_TYPES.ROOM,
    side: 'left',
    description: 'Second classroom on the left from ECE stairs, second floor.',
    scannable: false, selectable: true
  },
  {
    id: 'EC203',
    name: 'EC203 — ECE HOD Cabin',
    aliases: ['ec 203', 'ec203', 'ece 203', 'ece hod cabin', 'ece hod', 'ece head cabin', 'ece department head', 'hod ece', 'ece head of department', 'ece hod room'],
    block: 'EC', floor: 2, type: LOCATION_TYPES.OFFICE,
    side: 'left',
    description: 'ECE Department Head cabin — third room on the left, ECE second floor.',
    scannable: false, selectable: true
  },
  {
    id: 'EC_F2_ECE_STAFFROOM',
    name: 'ECE Department Staffroom',
    aliases: ['ece staffroom', 'ece staff room', 'ece staff', 'ece department staff', 'electronics staffroom', 'ece office'],
    block: 'EC', floor: 2, type: LOCATION_TYPES.STAFFROOM,
    side: 'right',
    description: 'ECE Department staffroom — turn right from ECE stairs on the second floor.',
    scannable: false, selectable: true
  },

  // Third Floor
  {
    id: 'EC301',
    name: 'EC301',
    aliases: ['ec 301', 'ec301', 'ece 301', 'ece third floor room 1'],
    block: 'EC', floor: 3, type: LOCATION_TYPES.ROOM,
    side: 'left',
    description: 'First classroom — turn left from ECE stairs on the third floor.',
    scannable: false, selectable: true
  },
  {
    id: 'EC302',
    name: 'EC302',
    aliases: ['ec 302', 'ec302', 'ece 302', 'ece third floor room 2'],
    block: 'EC', floor: 3, type: LOCATION_TYPES.ROOM,
    side: 'left',
    description: 'Second classroom on the left from ECE stairs, third floor.',
    scannable: false, selectable: true
  },
  {
    id: 'EC303',
    name: 'EC303',
    aliases: ['ec 303', 'ec303', 'ece 303', 'ece third floor room 3'],
    block: 'EC', floor: 3, type: LOCATION_TYPES.ROOM,
    side: 'left',
    description: 'Third classroom on the left from ECE stairs, third floor.',
    scannable: false, selectable: true
  },
  {
    id: 'EC_F3_BOYS_RESTROOM',
    name: 'Boys Restroom (ECE Third Floor)',
    aliases: ['ece boys restroom', 'ec boys toilet', 'ece boys washroom', 'ece third floor boys restroom'],
    block: 'EC', floor: 3, type: LOCATION_TYPES.RESTROOM,
    side: 'right',
    description: 'Turn right from ECE stairs on the third floor.',
    scannable: false, selectable: true
  },


  // ═══════════════════════════════════════════════════════════
  //  ADMIN BLOCK — STRUCTURAL / WAYPOINTS
  // ═══════════════════════════════════════════════════════════

  {
    id: 'AB_ENTRANCE',
    name: 'Admin Block Entrance',
    aliases: ['admin entrance', 'ab entrance', 'admin block', 'ab ground floor', 'admin block entrance', 'administration building'],
    block: 'AB', floor: 0, type: LOCATION_TYPES.ENTRANCE,
    side: 'center',
    description: 'Main entrance of the Admin Block. Box-shaped building with rooms on all sides and a central money plant courtyard.',
    scannable: true, selectable: true
  },
  {
    id: 'AB_GF_LEFT_PATH',
    name: 'AB Ground Floor Left Path',
    aliases: ['admin left path'],
    block: 'AB', floor: 0, type: LOCATION_TYPES.CORRIDOR,
    side: 'left', description: 'Left path from Admin Block entrance.',
    scannable: false, selectable: false
  },
  {
    id: 'AB_GF_RIGHT_PATH',
    name: 'AB Ground Floor Right Path',
    aliases: ['admin right path'],
    block: 'AB', floor: 0, type: LOCATION_TYPES.CORRIDOR,
    side: 'right', description: 'Right path from Admin Block entrance.',
    scannable: false, selectable: false
  },
  {
    id: 'AB_GF_OPPOSITE',
    name: 'AB Ground Floor Opposite Side',
    aliases: [],
    block: 'AB', floor: 0, type: LOCATION_TYPES.CORRIDOR,
    side: 'opposite', description: 'Opposite side from Admin Block entrance.',
    scannable: false, selectable: false
  },
  {
    id: 'AB_GF_STAIRS',
    name: 'Admin Block Staircase (Ground Floor)',
    aliases: ['admin stairs', 'ab stairs', 'admin block stairs', 'admin staircase'],
    block: 'AB', floor: 0, type: LOCATION_TYPES.STAIRS,
    side: 'right',
    description: 'Take right from the entrance, cross AB007, stairs are on the right side.',
    scannable: true, selectable: true
  },
  {
    id: 'AB_F1_STAIRS',
    name: 'Admin Block Staircase (First Floor)',
    aliases: ['admin stairs first floor', 'ab stairs first'],
    block: 'AB', floor: 1, type: LOCATION_TYPES.STAIRS,
    side: 'center', description: 'Admin Block staircase landing on the first floor.',
    scannable: true, selectable: true
  },
  {
    id: 'AB_F1_LEFT',
    name: 'AB First Floor Left Corridor',
    aliases: [],
    block: 'AB', floor: 1, type: LOCATION_TYPES.CORRIDOR,
    side: 'left', description: 'Left side from stairs on Admin Block first floor.',
    scannable: false, selectable: false
  },
  {
    id: 'AB_F1_RIGHT',
    name: 'AB First Floor Right Corridor',
    aliases: [],
    block: 'AB', floor: 1, type: LOCATION_TYPES.CORRIDOR,
    side: 'right', description: 'Right side from stairs on Admin Block first floor.',
    scannable: false, selectable: false
  },
  {
    id: 'AB_F2_STAIRS',
    name: 'Admin Block Staircase (Second Floor)',
    aliases: ['admin stairs second floor', 'ab stairs second'],
    block: 'AB', floor: 2, type: LOCATION_TYPES.STAIRS,
    side: 'center', description: 'Admin Block staircase landing on the second floor.',
    scannable: true, selectable: true
  },
  {
    id: 'AB_F2_LEFT',
    name: 'AB Second Floor Left Corridor',
    aliases: [],
    block: 'AB', floor: 2, type: LOCATION_TYPES.CORRIDOR,
    side: 'left', description: 'Left side from stairs on Admin Block second floor.',
    scannable: false, selectable: false
  },
  {
    id: 'AB_F2_RIGHT',
    name: 'AB Second Floor Right Corridor',
    aliases: [],
    block: 'AB', floor: 2, type: LOCATION_TYPES.CORRIDOR,
    side: 'right', description: 'Right side from stairs on Admin Block second floor.',
    scannable: false, selectable: false
  },


  // ═══════════════════════════════════════════════════════════
  //  ADMIN BLOCK — GROUND FLOOR ROOMS
  // ═══════════════════════════════════════════════════════════

  {
    id: 'AB002',
    name: 'AB002',
    aliases: ['ab 002', 'ab002', 'admin block 002', 'admin 002'],
    block: 'AB', floor: 0, type: LOCATION_TYPES.ROOM,
    side: 'left',
    description: 'Immediate left after entering the Admin Block entrance.',
    scannable: false, selectable: true
  },
  {
    id: 'AB003',
    name: 'AB003',
    aliases: ['ab 003', 'ab003', 'admin block 003', 'admin 003'],
    block: 'AB', floor: 0, type: LOCATION_TYPES.ROOM,
    side: 'left',
    description: 'Take left path from entrance — next room after AB002.',
    scannable: false, selectable: true
  },
  {
    id: 'AB004',
    name: 'AB004',
    aliases: ['ab 004', 'ab004', 'admin block 004', 'admin 004'],
    block: 'AB', floor: 0, type: LOCATION_TYPES.ROOM,
    side: 'left',
    description: 'Take left path from entrance — next room after AB003.',
    scannable: false, selectable: true
  },
  {
    id: 'AB005',
    name: 'AB005',
    aliases: ['ab 005', 'ab005', 'admin block 005', 'admin 005'],
    block: 'AB', floor: 0, type: LOCATION_TYPES.ROOM,
    side: 'opposite',
    description: 'Straight opposite of the entrance — can be reached from either left or right path.',
    scannable: false, selectable: true
  },
  {
    id: 'AB007',
    name: 'AB007',
    aliases: ['ab 007', 'ab007', 'admin block 007', 'admin 007'],
    block: 'AB', floor: 0, type: LOCATION_TYPES.ROOM,
    side: 'right',
    description: 'First room on the right side from the Admin Block entrance.',
    scannable: false, selectable: true
  },
  {
    id: 'AB_MINI_CANTEEN',
    name: 'Mini Canteen / Stationary Shop',
    aliases: ['mini canteen', 'stationary shop', 'stationary', 'snacks shop', 'admin canteen', 'ab canteen', 'mini canteen admin', 'stationery shop', 'stationery'],
    block: 'AB', floor: 0, type: LOCATION_TYPES.SHOP,
    side: 'right',
    description: 'Mini canteen / snacks / stationary shop — immediately next to the staircase in the Admin Block.',
    scannable: false, selectable: true
  },
  {
    id: 'AB_EXAM_CELL',
    name: 'Exam Cell',
    aliases: ['exam cell', 'examination cell', 'exam office', 'examination office', 'exam department'],
    block: 'AB', floor: 0, type: LOCATION_TYPES.OFFICE,
    side: 'right',
    description: 'Last room on the right side from the entrance — right side of AB005.',
    scannable: false, selectable: true
  },


  // ═══════════════════════════════════════════════════════════
  //  ADMIN BLOCK — FIRST FLOOR ROOMS
  // ═══════════════════════════════════════════════════════════

  // Take right from stairs, open glass door
  {
    id: 'AB_PLACEMENT_CELL',
    name: 'Placement Cell',
    aliases: ['placement cell', 'placement office', 'placements', 'placement department', 'training and placement'],
    block: 'AB', floor: 1, type: LOCATION_TYPES.OFFICE,
    side: 'right',
    description: 'Take right from stairs, open glass door — immediate right is the Placement Cell.',
    scannable: false, selectable: true
  },
  {
    id: 'AB_DIRECTOR_ROOM',
    name: 'Director Room',
    aliases: ['director room', 'director office', 'director cabin', 'director sir room', 'director chamber'],
    block: 'AB', floor: 1, type: LOCATION_TYPES.OFFICE,
    side: 'right',
    description: 'Second room on the right after entering the glass door on the first floor.',
    scannable: false, selectable: true
  },
  {
    id: 'AB_IT_WORKSPACE',
    name: 'IT Team Workspace',
    aliases: ['it workspace', 'it team', 'it team workspace', 'it office admin', 'it glass room', 'it team room'],
    block: 'AB', floor: 1, type: LOCATION_TYPES.OFFICE,
    side: 'right',
    description: 'Straight glass rooms — IT team workspace area on the first floor.',
    scannable: false, selectable: true
  },
  {
    id: 'AB_CHAIRMAN_WAITING',
    name: 'Chairman Waiting Room',
    aliases: ['chairman waiting room', 'chairman waiting', 'chairman sir waiting room', 'chairman waiters room'],
    block: 'AB', floor: 1, type: LOCATION_TYPES.OFFICE,
    side: 'right',
    description: 'Take left after a few steps, immediately left — Chairman waiting room.',
    scannable: false, selectable: true
  },
  {
    id: 'AB_CHAIRMAN_CHAMBER',
    name: 'Chairman Chamber',
    aliases: ['chairman chamber', 'chairman room', 'chairman office', 'chairman sir room', 'chairman cabin', 'chairman sir chamber'],
    block: 'AB', floor: 1, type: LOCATION_TYPES.OFFICE,
    side: 'right',
    description: 'Last room on the right side — Chairman\'s personal chamber.',
    scannable: false, selectable: true
  },

  // Take left from stairs (first floor)
  {
    id: 'AB_CEO_ROOM',
    name: 'CEO Room',
    aliases: ['ceo room', 'ceo office', 'ceo cabin', 'ceo sir room', 'ceo chamber'],
    block: 'AB', floor: 1, type: LOCATION_TYPES.OFFICE,
    side: 'left',
    description: 'First room on the left from stairs on the Admin Block first floor.',
    scannable: false, selectable: true
  },
  {
    id: 'AB_AYAAN_FOUNDATION',
    name: 'Ayaan Foundation Room',
    aliases: ['ayaan foundation', 'ayaan foundation room', 'ayaan room', 'ayaan office'],
    block: 'AB', floor: 1, type: LOCATION_TYPES.OFFICE,
    side: 'left',
    description: 'Next room following the CEO Room on the left.',
    scannable: false, selectable: true
  },
  {
    id: 'AB_PRINCIPAL_WAITING',
    name: 'Principal Waiting Hall',
    aliases: ['principal waiting hall', 'principal waiting', 'principal waiting room'],
    block: 'AB', floor: 1, type: LOCATION_TYPES.OFFICE,
    side: 'left',
    description: 'Opposite the CEO Room — principal\'s waiting hall.',
    scannable: false, selectable: true
  },
  {
    id: 'AB_PRINCIPAL_ROOM',
    name: 'Principal Room',
    aliases: ['principal room', 'principal office', 'principal sir room', 'principal cabin', 'principal chamber', 'principal sir office'],
    block: 'AB', floor: 1, type: LOCATION_TYPES.OFFICE,
    side: 'left',
    description: 'Next to the Principal Waiting Hall — the Principal\'s office.',
    scannable: false, selectable: true
  },


  // ═══════════════════════════════════════════════════════════
  //  ADMIN BLOCK — SECOND FLOOR ROOMS
  // ═══════════════════════════════════════════════════════════

  // Take right from stairs
  {
    id: 'AB_F2_LABS',
    name: 'Admin Block Labs (Second Floor)',
    aliases: ['admin labs', 'ab labs', 'admin block labs', 'second floor labs admin', 'ab second floor labs'],
    block: 'AB', floor: 2, type: LOCATION_TYPES.LAB,
    side: 'right',
    description: 'Labs on the right side of Admin Block second floor.',
    scannable: false, selectable: true
  },
  {
    id: 'AB_F2_BOYS_RESTROOM',
    name: 'Boys Restroom (AB Second Floor)',
    aliases: ['admin boys restroom', 'ab boys toilet', 'admin boys washroom', 'admin block boys restroom'],
    block: 'AB', floor: 2, type: LOCATION_TYPES.RESTROOM,
    side: 'right',
    description: 'Right U-turn from the stairs — boys restroom on Admin Block second floor.',
    scannable: false, selectable: true
  },
  {
    id: 'AB_F2_GIRLS_RESTROOM',
    name: 'Girls Restroom (AB Second Floor)',
    aliases: ['admin girls restroom', 'ab girls toilet', 'admin girls washroom', 'admin block girls restroom'],
    block: 'AB', floor: 2, type: LOCATION_TYPES.RESTROOM,
    side: 'right',
    description: 'Right side of the boys restroom on Admin Block second floor.',
    scannable: false, selectable: true
  },

  // Take left from stairs
  {
    id: 'AB_DIGITAL_LIBRARY',
    name: 'Digital Library / Computer Labs',
    aliases: ['digital library', 'computer lab admin', 'computer labs', 'digital library admin', 'ab computer lab', 'admin digital library'],
    block: 'AB', floor: 2, type: LOCATION_TYPES.LIBRARY,
    side: 'left',
    description: 'Digital library / computer labs — left side from stairs on the second floor.',
    scannable: false, selectable: true
  },
  {
    id: 'AB_BALCONY',
    name: 'Admin Block Balcony',
    aliases: ['admin balcony', 'ab balcony', 'admin block balcony'],
    block: 'AB', floor: 2, type: LOCATION_TYPES.LANDMARK,
    side: 'left',
    description: 'Balcony — last left on the straight from stairs, Admin Block second floor.',
    scannable: false, selectable: true
  },
  {
    id: 'AB_LIBRARY',
    name: 'Library',
    aliases: ['library', 'main library', 'admin library', 'ab library', 'college library', 'campus library'],
    block: 'AB', floor: 2, type: LOCATION_TYPES.LIBRARY,
    side: 'left',
    description: 'Main Library — opposite the balcony on Admin Block second floor.',
    scannable: false, selectable: true
  },


  // ═══════════════════════════════════════════════════════════
  //  CAMPUS LANDMARKS & PATHS
  // ═══════════════════════════════════════════════════════════

  {
    id: 'CANTEEN',
    name: 'Canteen',
    aliases: ['canteen', 'mess', 'food court', 'cafeteria', 'campus canteen', 'college canteen'],
    block: 'CN', floor: 0, type: LOCATION_TYPES.LANDMARK,
    side: 'center',
    description: 'Campus canteen / food court.',
    scannable: true, selectable: true
  },

  // Campus waypoints (non-selectable)
  {
    id: 'CAMPUS_WEST_PATH',
    name: 'Campus West Path',
    aliases: [],
    block: 'CAMPUS', floor: 0, type: LOCATION_TYPES.WAYPOINT,
    side: 'center', description: 'Walking path on the west side of campus.',
    scannable: false, selectable: false
  },
  {
    id: 'CAMPUS_SOUTH_PATH',
    name: 'Campus South Path',
    aliases: [],
    block: 'CAMPUS', floor: 0, type: LOCATION_TYPES.WAYPOINT,
    side: 'center', description: 'Walking path on the south side of campus.',
    scannable: false, selectable: false
  },
  {
    id: 'CAMPUS_EC_TO_AB_PATH',
    name: 'Campus ECE to Admin Path',
    aliases: [],
    block: 'CAMPUS', floor: 0, type: LOCATION_TYPES.WAYPOINT,
    side: 'center', description: 'Walking path between ECE Block and Admin Block.',
    scannable: false, selectable: false
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
 * Search locations by query (case-insensitive, matches id, name, aliases, description)
 * Supports fuzzy matching and department-based search
 */
function searchLocations(query) {
  const q = query.toLowerCase().trim();
  if (!q) return getSelectableLocations();

  // Exact and partial matching with scoring
  const results = getSelectableLocations().map(loc => {
    let score = 0;

    // Exact ID match (highest priority)
    if (loc.id.toLowerCase() === q) score += 100;
    // ID contains query
    else if (loc.id.toLowerCase().includes(q)) score += 50;

    // Exact name match
    if (loc.name.toLowerCase() === q) score += 90;
    // Name contains query
    else if (loc.name.toLowerCase().includes(q)) score += 40;

    // Alias exact match
    if (loc.aliases.some(a => a === q)) score += 80;
    // Alias contains query
    else if (loc.aliases.some(a => a.includes(q))) score += 30;

    // Description contains query
    if (loc.description && loc.description.toLowerCase().includes(q)) score += 15;

    // Type match
    if (loc.type.toLowerCase().includes(q)) score += 10;

    return { ...loc, score };
  }).filter(loc => loc.score > 0);

  // Sort by score descending
  results.sort((a, b) => b.score - a.score);

  return results;
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

  // 4. Try partial ID match
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

/**
 * Get locations filtered by block and/or floor
 */
function getFilteredLocations(blockFilter, floorFilter) {
  return getSelectableLocations().filter(loc => {
    if (blockFilter && blockFilter !== 'ALL' && loc.block !== blockFilter) return false;
    if (floorFilter !== undefined && floorFilter !== null && floorFilter !== 'ALL' && loc.floor !== floorFilter) return false;
    return true;
  });
}

/**
 * Get all unique floors for a given block
 */
function getFloorsForBlock(block) {
  const floors = new Set();
  LOCATIONS.filter(loc => loc.block === block && loc.selectable).forEach(loc => floors.add(loc.floor));
  return Array.from(floors).sort((a, b) => a - b);
}

/**
 * Get a human-readable floor name
 */
function getFloorName(floor) {
  switch (floor) {
    case 0: return 'Ground Floor';
    case 1: return '1st Floor';
    case 2: return '2nd Floor';
    case 3: return '3rd Floor';
    default: return `Floor ${floor}`;
  }
}

/**
 * Get icon for location type
 */
function getLocationTypeIcon(type) {
  switch (type) {
    case LOCATION_TYPES.ROOM: return '🚪';
    case LOCATION_TYPES.STAFFROOM: return '👨‍🏫';
    case LOCATION_TYPES.LAB: return '🔬';
    case LOCATION_TYPES.RESTROOM: return '🚻';
    case LOCATION_TYPES.SEMINAR_HALL: return '🎤';
    case LOCATION_TYPES.LIBRARY: return '📚';
    case LOCATION_TYPES.OFFICE: return '🏢';
    case LOCATION_TYPES.SHOP: return '🛒';
    case LOCATION_TYPES.STAIRS: return '🪜';
    case LOCATION_TYPES.ENTRANCE: return '🏛️';
    case LOCATION_TYPES.PORTICO: return '🏗️';
    case LOCATION_TYPES.LANDMARK: return '📍';
    case LOCATION_TYPES.CORRIDOR: return '🚶';
    default: return '📌';
  }
}
