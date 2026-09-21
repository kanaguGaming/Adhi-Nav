// ============================================================
// AdhiNav — Navigation Graph (v2.0 — Complete Campus)
// Bidirectional adjacency list with human-readable instructions
// ============================================================

// Each edge: { to: locationId, forward: "instruction going to", reverse: "instruction coming back" }
// forward = instruction when traversing FROM this node TO the 'to' node
// reverse = instruction when traversing FROM 'to' node TO this node (auto-generated in adjacency)

const NAV_GRAPH = {

  // ═══════════════════════════════════════════════════════════
  //  MAIN BLOCK — GROUND FLOOR
  // ═══════════════════════════════════════════════════════════

  'MB_ENTRANCE': [
    {
      to: 'MB_GF_PERP_HALLWAY',
      forward: 'Enter the Main Block through the West Portico main entrance. You are now in the perpendicular hallway that connects the west and east porticos.',
      reverse: 'Walk along the perpendicular hallway towards the West Portico and exit through the main entrance.'
    },
    {
      to: 'MB_WEST_PORTICO',
      forward: 'You are at the Main Block entrance — the West Portico.',
      reverse: 'You are at the Main Block entrance.'
    },
    {
      to: 'CAMPUS_WEST_PATH',
      forward: 'From the main entrance, turn right and walk along the campus path beside the building.',
      reverse: 'Walk straight along the path until you reach the Main Block entrance (West Portico).'
    }
  ],

  'MB_WEST_PORTICO': [
    {
      to: 'CAMPUS_WEST_PATH',
      forward: 'From the West Portico, turn right and walk along the path beside the building.',
      reverse: 'Walk straight along the path to reach the West Portico (Main Block entrance).'
    }
  ],

  'MB_GF_PERP_HALLWAY': [
    {
      to: 'MB_GF_STAIRS',
      forward: 'Walk through the perpendicular hallway. The main staircase is at the center where the hallway crosses the main corridor.',
      reverse: 'From the stairs, you are in the perpendicular hallway connecting the west and east porticos.'
    },
    {
      to: 'MB_GF_ADMIN_CELL',
      forward: 'Walk along the perpendicular hallway — the Administrative Cell is on the side, opposite the staircase.',
      reverse: 'Exit the Administrative Cell and step into the perpendicular hallway.'
    },
    {
      to: 'MB_EAST_PORTICO',
      forward: 'Walk straight through the perpendicular hallway all the way to the East Portico (rear entrance).',
      reverse: 'Enter through the East Portico and walk along the perpendicular hallway.'
    }
  ],

  'MB_GF_STAIRS': [
    {
      to: 'MB_GF_LEFT_WING',
      forward: 'From the staircase, turn left into the main corridor. This is the left wing of the ground floor hallway.',
      reverse: 'Walk back along the left wing corridor to the central staircase.'
    },
    {
      to: 'MB_GF_RIGHT_WING',
      forward: 'From the staircase, turn right into the main corridor. This is the right wing of the ground floor hallway.',
      reverse: 'Walk back along the right wing corridor to the central staircase.'
    },
    {
      to: 'MB_GF_SH_STAFFROOM',
      forward: 'The S&H Staffroom is immediately next to the stairs on the same side — opposite the Administrative Cell.',
      reverse: 'Exit the S&H Staffroom. The stairs are right next to you.'
    },
    {
      to: 'MB_F1_STAIRS',
      forward: 'Climb up one flight of stairs to reach the First Floor.',
      reverse: 'Walk down one flight of stairs to reach the Ground Floor.'
    }
  ],

  // Ground floor left wing (from stairs, walking left)
  'MB_GF_LEFT_WING': [
    {
      to: 'MB003',
      forward: 'MB003 is the first room you encounter on the left wing when walking away from the stairs.',
      reverse: 'Exit MB003 and walk towards the stairs along the left wing corridor.'
    },
    {
      to: 'MB002',
      forward: 'Walk further along the left wing. MB002 is the next room, past MB003.',
      reverse: 'Exit MB002 and walk towards the stairs along the left wing corridor.'
    },
    {
      to: 'MB001',
      forward: 'Continue along the left wing. MB001 (EEE Staffroom) is the next room, past MB002.',
      reverse: 'Exit MB001 (EEE Staffroom) and walk towards the stairs along the left wing corridor.'
    },
    {
      to: 'MB_GF_GIRLS_RESTROOM',
      forward: 'The Girls Restroom is at the very end of the left wing — the last room on the left.',
      reverse: 'Exit the Girls Restroom and walk back along the left wing corridor towards the stairs.'
    }
  ],

  // Ground floor right wing (from stairs, walking right)
  'MB_GF_RIGHT_WING': [
    {
      to: 'MB004',
      forward: 'MB004 is the first room on the right wing when walking from the stairs.',
      reverse: 'Exit MB004 and walk towards the stairs along the right wing corridor.'
    },
    {
      to: 'MB005',
      forward: 'Walk further along the right wing. MB005 (Chemistry Lab) is next, past MB004.',
      reverse: 'Exit MB005 (Chemistry Lab) and walk towards the stairs along the right wing corridor.'
    },
    {
      to: 'MB_GF_BOYS_RESTROOM',
      forward: 'The Boys Restroom is at the very end of the right wing — the last room on the right.',
      reverse: 'Exit the Boys Restroom and walk back along the right wing corridor towards the stairs.'
    }
  ],

  // East Portico
  'MB_EAST_PORTICO': [
    {
      to: 'CAMPUS_SOUTH_PATH',
      forward: 'Exit through the East Portico (rear entrance) and turn right to join the main campus path.',
      reverse: 'Follow the campus path and enter the Main Block through the East Portico (rear entrance).'
    }
  ],


  // ═══════════════════════════════════════════════════════════
  //  MAIN BLOCK — STAIRS CONNECTIONS
  // ═══════════════════════════════════════════════════════════

  'MB_F1_STAIRS': [
    {
      to: 'MB_F2_STAIRS',
      forward: 'Climb up one more flight of stairs to reach the Second Floor.',
      reverse: 'Walk down one flight of stairs to reach the First Floor.'
    },
    {
      to: 'MB_F1_LEFT_WING',
      forward: 'At the first floor landing, turn left into the corridor.',
      reverse: 'Walk back to the first floor stairs landing.'
    },
    {
      to: 'MB_F1_RIGHT_WING',
      forward: 'At the first floor landing, turn right into the corridor.',
      reverse: 'Walk back to the first floor stairs landing.'
    },
    {
      to: 'MB_F1_STRAIGHT',
      forward: 'At the first floor landing, go straight ahead.',
      reverse: 'Walk back to the first floor stairs landing.'
    },
    {
      to: 'MB_F1_CSE_STAFFROOM',
      forward: 'The CSE Department Staffroom is immediately next to the stairs on the same side, first floor.',
      reverse: 'Exit the CSE Staffroom. The stairs are right next to you.'
    },
    {
      to: 'MB107',
      forward: 'MB107 is immediately to the right, next to the stairs on the same side. It is opposite MB104 and MB103B.',
      reverse: 'Exit MB107. The stairs are right next to you.'
    }
  ],


  // ═══════════════════════════════════════════════════════════
  //  MAIN BLOCK — FIRST FLOOR ROOMS
  // ═══════════════════════════════════════════════════════════

  'MB_F1_LEFT_WING': [
    {
      to: 'MB_F1_GIRLS_RESTROOM',
      forward: 'The Girls Restroom is at the very end of the left wing — the last room when you turn left from the stairs.',
      reverse: 'Exit the Girls Restroom and walk back along the left wing corridor towards the stairs.'
    },
    {
      to: 'MB102',
      forward: 'Dr Radhakrishnan Seminar Hall is on the left wing. You\'ll see the large seminar hall entrance.',
      reverse: 'Exit the Seminar Hall and walk towards the stairs along the left wing.'
    },
    {
      to: 'MB103A',
      forward: 'MB103A is on the left wing, opposite the CSE Staffroom.',
      reverse: 'Exit MB103A and walk towards the stairs along the left wing.'
    }
  ],

  'MB_F1_STRAIGHT': [
    {
      to: 'MB103B',
      forward: 'MB103B is straight ahead from the first floor stairs — directly opposite the staircase.',
      reverse: 'Walk back towards the staircase from MB103B.'
    }
  ],

  'MB_F1_RIGHT_WING': [
    {
      to: 'MB104',
      forward: 'MB104 is the first room on the right wing of the first floor.',
      reverse: 'Exit MB104 and walk towards the stairs along the right wing.'
    },
    {
      to: 'MB105',
      forward: 'Walk further along the right wing. MB105 is the next room, past MB104.',
      reverse: 'Exit MB105 and walk towards the stairs along the right wing.'
    },
    {
      to: 'MB106',
      forward: 'Continue along the right wing. MB106 is the next room, past MB105.',
      reverse: 'Exit MB106 and walk towards the stairs along the right wing.'
    },
    {
      to: 'MB_F1_BOYS_RESTROOM',
      forward: 'The Boys Restroom is at the very end of the right wing — the last room on the right.',
      reverse: 'Exit the Boys Restroom and walk back along the right wing corridor towards the stairs.'
    },
    {
      to: 'MB_F1_EAST_PORTICO_STAIRS',
      forward: 'Walk all the way to the end of the right wing. The separate east portico stairs are accessible from the outside.',
      reverse: 'Walk back from the east portico stairs along the right wing corridor.'
    }
  ],

  'MB_F1_EAST_PORTICO_STAIRS': [
    {
      to: 'MB103C',
      forward: 'MB103C is at the top of the separate east portico stairs. This room can only be accessed from these outside stairs.',
      reverse: 'Exit MB103C and head down the east portico stairs.'
    }
  ],


  // ═══════════════════════════════════════════════════════════
  //  MAIN BLOCK — SECOND FLOOR
  // ═══════════════════════════════════════════════════════════

  'MB_F2_STAIRS': [
    {
      to: 'MB_F3_STAIRS',
      forward: 'Climb up one more flight of stairs to reach the Third Floor.',
      reverse: 'Walk down one flight of stairs to reach the Second Floor.'
    },
    {
      to: 'MB_F2_LEFT_WING',
      forward: 'At the second floor landing, turn left into the corridor.',
      reverse: 'Walk back to the second floor stairs landing.'
    },
    {
      to: 'MB_F2_RIGHT_WING',
      forward: 'At the second floor landing, turn right into the corridor.',
      reverse: 'Walk back to the second floor stairs landing.'
    },
    {
      to: 'MB_F2_STRAIGHT',
      forward: 'At the second floor landing, go straight ahead.',
      reverse: 'Walk back to the second floor stairs landing.'
    },
    {
      to: 'MB_F2_MECH_STAFFROOM',
      forward: 'The Mechanical Staffroom is immediately next to the stairs on the same side, second floor.',
      reverse: 'Exit the Mechanical Staffroom. The stairs are right next to you.'
    }
  ],

  'MB_F2_LEFT_WING': [
    {
      to: 'MB_F2_GIRLS_RESTROOM',
      forward: 'The Girls Restroom is at the very end of the left wing — the last room on the left.',
      reverse: 'Exit the Girls Restroom and walk back along the left wing corridor towards the stairs.'
    },
    {
      to: 'MB_F2_IT_STAFFROOM',
      forward: 'The IT Department Staffroom is on the left wing of the second floor.',
      reverse: 'Exit the IT Staffroom and walk towards the stairs along the left wing.'
    },
    {
      to: 'MB202',
      forward: 'MB202 is on the left wing, past the IT Staffroom.',
      reverse: 'Exit MB202 and walk towards the stairs along the left wing.'
    },
    {
      to: 'MB203',
      forward: 'MB203 is further along the left wing, opposite the Mechanical Staffroom.',
      reverse: 'Exit MB203 and walk towards the stairs along the left wing.'
    }
  ],

  'MB_F2_STRAIGHT': [
    {
      to: 'MB203A',
      forward: 'MB203A is straight ahead from the second floor stairs — one of three rooms directly opposite the staircase.',
      reverse: 'Walk back towards the staircase from MB203A.'
    },
    {
      to: 'MB203B',
      forward: 'MB203B is straight ahead from the stairs — the middle room of the three rooms opposite the staircase.',
      reverse: 'Walk back towards the staircase from MB203B.'
    },
    {
      to: 'MB203C',
      forward: 'MB203C is straight ahead from the stairs — the third room of the three rooms opposite the staircase.',
      reverse: 'Walk back towards the staircase from MB203C.'
    }
  ],

  'MB_F2_RIGHT_WING': [
    {
      to: 'MB204',
      forward: 'MB204 is the first room on the right wing of the second floor.',
      reverse: 'Exit MB204 and walk towards the stairs along the right wing.'
    },
    {
      to: 'MB205',
      forward: 'Walk further along the right wing. MB205 is the next room, past MB204.',
      reverse: 'Exit MB205 and walk towards the stairs along the right wing.'
    },
    {
      to: 'MB206',
      forward: 'Continue along the right wing. MB206 is the next room, past MB205.',
      reverse: 'Exit MB206 and walk towards the stairs along the right wing.'
    },
    {
      to: 'MB_F2_BOYS_RESTROOM',
      forward: 'The Boys Restroom is at the very end of the right wing — the last room on the right.',
      reverse: 'Exit the Boys Restroom and walk back along the right wing corridor towards the stairs.'
    }
  ],


  // ═══════════════════════════════════════════════════════════
  //  MAIN BLOCK — THIRD FLOOR
  // ═══════════════════════════════════════════════════════════

  'MB_F3_STAIRS': [
    {
      to: 'MB_F3_LEFT_WING',
      forward: 'At the third floor landing, turn left into the corridor.',
      reverse: 'Walk back to the third floor stairs landing.'
    },
    {
      to: 'MB_F3_RIGHT_WING',
      forward: 'At the third floor landing, turn right into the corridor.',
      reverse: 'Walk back to the third floor stairs landing.'
    },
    {
      to: 'MB_F3_STRAIGHT',
      forward: 'At the third floor landing, go straight ahead.',
      reverse: 'Walk back to the third floor stairs landing.'
    },
    {
      to: 'MB303',
      forward: 'MB303 Staffroom is near the stairs on the third floor.',
      reverse: 'Exit MB303 Staffroom. The stairs are nearby.'
    }
  ],

  'MB_F3_STRAIGHT': [
    {
      to: 'MB304',
      forward: 'MB304 (Physics Lab) is straight ahead — directly opposite the staircase on the third floor.',
      reverse: 'Walk back towards the staircase from the Physics Lab.'
    }
  ],

  'MB_F3_LEFT_WING': [
    {
      to: 'MB_F3_GIRLS_RESTROOM',
      forward: 'The Girls Restroom is at the very end of the left wing — the last room on the left.',
      reverse: 'Exit the Girls Restroom and walk back along the left wing corridor towards the stairs.'
    },
    {
      to: 'MB301A',
      forward: 'MB301A is the first room on the left wing of the third floor.',
      reverse: 'Exit MB301A and walk towards the stairs along the left wing.'
    },
    {
      to: 'MB301B',
      forward: 'MB301B is the next room on the left wing, past MB301A.',
      reverse: 'Exit MB301B and walk towards the stairs along the left wing.'
    },
    {
      to: 'MB302',
      forward: 'MB302 is further along the left wing of the third floor.',
      reverse: 'Exit MB302 and walk towards the stairs along the left wing.'
    }
  ],

  'MB_F3_RIGHT_WING': [
    {
      to: 'MB305',
      forward: 'MB305 is the first room on the right wing of the third floor.',
      reverse: 'Exit MB305 and walk towards the stairs along the right wing.'
    },
    {
      to: 'MB306',
      forward: 'MB306 is the next room on the right wing, past MB305.',
      reverse: 'Exit MB306 and walk towards the stairs along the right wing.'
    },
    {
      to: 'MB307',
      forward: 'MB307 is the last room on the right wing of the third floor.',
      reverse: 'Exit MB307 and walk towards the stairs along the right wing.'
    },
    {
      to: 'MB_F3_BOYS_RESTROOM',
      forward: 'The Boys Restroom is at the very end of the right wing — the last room on the right.',
      reverse: 'Exit the Boys Restroom and walk back along the right wing corridor towards the stairs.'
    }
  ],


  // ═══════════════════════════════════════════════════════════
  //  ECE BLOCK
  // ═══════════════════════════════════════════════════════════

  'EC_ENTRANCE': [
    {
      to: 'EC_GF_CORRIDOR',
      forward: 'Enter the ECE Block through the department entrance (circle steps in the middle of the block).',
      reverse: 'Walk back to the ECE Block department entrance (circle steps).'
    },
    {
      to: 'CAMPUS_EC_TO_AB_PATH',
      forward: 'From the ECE Block entrance, walk towards the Admin Block.',
      reverse: 'Walk from the Admin Block side to the ECE Block entrance.'
    }
  ],

  'EC_GF_CORRIDOR': [
    {
      to: 'EC002',
      forward: 'EC002 (Lab) is on the ground floor, near the department entrance.',
      reverse: 'Exit EC002 and walk along the ECE ground floor corridor.'
    },
    {
      to: 'EC003',
      forward: 'EC003 (Lab) is on the ground floor, near the department entrance.',
      reverse: 'Exit EC003 and walk along the ECE ground floor corridor.'
    },
    {
      to: 'EC004',
      forward: 'EC004 (AIDS Staffroom) is on the ground floor, near the department entrance.',
      reverse: 'Exit EC004 and walk along the ECE ground floor corridor.'
    },
    {
      to: 'EC_GF_STAIRS',
      forward: 'Walk to the left side of the ECE Block to find the staircase.',
      reverse: 'From the staircase, walk along the corridor towards the department entrance.'
    }
  ],

  // ECE Stairs connections
  'EC_GF_STAIRS': [
    {
      to: 'EC_F1_STAIRS',
      forward: 'Climb up one flight of stairs to reach the ECE Block First Floor.',
      reverse: 'Walk down one flight of stairs to reach the ECE Block Ground Floor.'
    }
  ],

  'EC_F1_STAIRS': [
    {
      to: 'EC_F2_STAIRS',
      forward: 'Climb up one more flight of stairs to reach the ECE Block Second Floor.',
      reverse: 'Walk down one flight of stairs to reach the ECE Block First Floor.'
    },
    {
      to: 'EC_F1_LEFT',
      forward: 'At the ECE first floor landing, turn left towards the classrooms.',
      reverse: 'Walk back to the ECE first floor stairs.'
    },
    {
      to: 'EC_F1_RIGHT',
      forward: 'At the ECE first floor landing, turn right.',
      reverse: 'Walk back to the ECE first floor stairs.'
    }
  ],

  'EC_F1_LEFT': [
    {
      to: 'EC101',
      forward: 'EC101 is the first classroom on your left after turning left from the ECE stairs.',
      reverse: 'Exit EC101 and walk back towards the ECE stairs.'
    },
    {
      to: 'EC102',
      forward: 'EC102 is the second classroom, past EC101.',
      reverse: 'Exit EC102 and walk back towards the ECE stairs.'
    },
    {
      to: 'EC103',
      forward: 'EC103 is the third classroom, past EC102.',
      reverse: 'Exit EC103 and walk back towards the ECE stairs.'
    }
  ],

  'EC_F1_RIGHT': [
    {
      to: 'EC_F1_GIRLS_RESTROOM',
      forward: 'The Girls Restroom is on the right side from the ECE stairs on the first floor.',
      reverse: 'Exit the Girls Restroom and walk back to the ECE stairs.'
    }
  ],

  'EC_F2_STAIRS': [
    {
      to: 'EC_F3_STAIRS',
      forward: 'Climb up one more flight of stairs to reach the ECE Block Third Floor.',
      reverse: 'Walk down one flight of stairs to reach the ECE Block Second Floor.'
    },
    {
      to: 'EC_F2_LEFT',
      forward: 'At the ECE second floor landing, turn left towards the classrooms.',
      reverse: 'Walk back to the ECE second floor stairs.'
    },
    {
      to: 'EC_F2_RIGHT',
      forward: 'At the ECE second floor landing, turn right.',
      reverse: 'Walk back to the ECE second floor stairs.'
    }
  ],

  'EC_F2_LEFT': [
    {
      to: 'EC201',
      forward: 'EC201 is the first classroom on your left after turning left from the ECE stairs.',
      reverse: 'Exit EC201 and walk back towards the ECE stairs.'
    },
    {
      to: 'EC202',
      forward: 'EC202 is the second classroom, past EC201.',
      reverse: 'Exit EC202 and walk back towards the ECE stairs.'
    },
    {
      to: 'EC203',
      forward: 'EC203 (ECE HOD Cabin) is the third room, past EC202. This is the ECE Department Head\'s cabin.',
      reverse: 'Exit the ECE HOD Cabin and walk back towards the ECE stairs.'
    }
  ],

  'EC_F2_RIGHT': [
    {
      to: 'EC_F2_ECE_STAFFROOM',
      forward: 'The ECE Department Staffroom is on the right side from the ECE stairs on the second floor.',
      reverse: 'Exit the ECE Staffroom and walk back to the ECE stairs.'
    }
  ],

  'EC_F3_STAIRS': [
    {
      to: 'EC_F3_LEFT',
      forward: 'At the ECE third floor landing, turn left towards the classrooms.',
      reverse: 'Walk back to the ECE third floor stairs.'
    },
    {
      to: 'EC_F3_RIGHT',
      forward: 'At the ECE third floor landing, turn right.',
      reverse: 'Walk back to the ECE third floor stairs.'
    }
  ],

  'EC_F3_LEFT': [
    {
      to: 'EC301',
      forward: 'EC301 is the first classroom on your left after turning left from the ECE stairs.',
      reverse: 'Exit EC301 and walk back towards the ECE stairs.'
    },
    {
      to: 'EC302',
      forward: 'EC302 is the second classroom, past EC301.',
      reverse: 'Exit EC302 and walk back towards the ECE stairs.'
    },
    {
      to: 'EC303',
      forward: 'EC303 is the third classroom, past EC302.',
      reverse: 'Exit EC303 and walk back towards the ECE stairs.'
    }
  ],

  'EC_F3_RIGHT': [
    {
      to: 'EC_F3_BOYS_RESTROOM',
      forward: 'The Boys Restroom is on the right side from the ECE stairs on the third floor.',
      reverse: 'Exit the Boys Restroom and walk back to the ECE stairs.'
    }
  ],


  // ═══════════════════════════════════════════════════════════
  //  ADMIN BLOCK
  // ═══════════════════════════════════════════════════════════

  'AB_ENTRANCE': [
    {
      to: 'AB_GF_LEFT_PATH',
      forward: 'Enter the Admin Block. Take the left path from the entrance.',
      reverse: 'Walk back along the left path to the Admin Block entrance.'
    },
    {
      to: 'AB_GF_RIGHT_PATH',
      forward: 'Enter the Admin Block. Take the right path from the entrance.',
      reverse: 'Walk back along the right path to the Admin Block entrance.'
    },
    {
      to: 'AB002',
      forward: 'AB002 is immediately on your left as you enter the Admin Block — the first door.',
      reverse: 'Exit AB002 and you\'re right at the Admin Block entrance.'
    }
  ],

  'AB_GF_LEFT_PATH': [
    {
      to: 'AB003',
      forward: 'AB003 is the first room along the left path, next to AB002.',
      reverse: 'Exit AB003 and step into the left corridor.'
    },
    {
      to: 'AB004',
      forward: 'Walk further along the left path. AB004 is the next room after AB003.',
      reverse: 'Exit AB004 and step back into the left corridor.'
    },
    {
      to: 'AB_GF_OPPOSITE',
      forward: 'Continue along the left path to reach the opposite side of the Admin Block.',
      reverse: 'Walk back along the left path from the opposite side.'
    }
  ],

  'AB_GF_RIGHT_PATH': [
    {
      to: 'AB007',
      forward: 'AB007 is the first room on the right side from the Admin Block entrance.',
      reverse: 'Exit AB007 and step into the right corridor.'
    },
    {
      to: 'AB_GF_STAIRS',
      forward: 'Walk past AB007 along the right path. The staircase is ahead on your right.',
      reverse: 'From the stairs, walk back along the right path towards the entrance.'
    },
    {
      to: 'AB_MINI_CANTEEN',
      forward: 'The Mini Canteen / Stationary Shop is immediately next to the staircase.',
      reverse: 'Exit the Mini Canteen — the stairs are right next to you.'
    },
    {
      to: 'AB_GF_OPPOSITE',
      forward: 'Continue along the right path to reach the opposite side of the Admin Block.',
      reverse: 'Walk back along the right path from the opposite side.'
    }
  ],

  'AB_GF_OPPOSITE': [
    {
      to: 'AB005',
      forward: 'AB005 is on the opposite side from the entrance — you can reach it from either the left or right path.',
      reverse: 'Exit AB005 — you are on the side opposite the entrance.'
    },
    {
      to: 'AB_EXAM_CELL',
      forward: 'The Exam Cell is the last room on the right side from the entrance — it\'s to the right of AB005.',
      reverse: 'Exit the Exam Cell and step into the opposite side corridor.'
    }
  ],

  // Admin Block Stairs
  'AB_GF_STAIRS': [
    {
      to: 'AB_F1_STAIRS',
      forward: 'Climb up one flight of stairs to reach the Admin Block First Floor.',
      reverse: 'Walk down one flight of stairs to reach the Admin Block Ground Floor.'
    }
  ],

  'AB_F1_STAIRS': [
    {
      to: 'AB_F2_STAIRS',
      forward: 'Climb up one more flight of stairs to reach the Admin Block Second Floor.',
      reverse: 'Walk down one flight of stairs to reach the Admin Block First Floor.'
    },
    {
      to: 'AB_F1_RIGHT',
      forward: 'At the first floor landing, turn right and open the glass door.',
      reverse: 'Walk back through the glass door to the first floor stairs.'
    },
    {
      to: 'AB_F1_LEFT',
      forward: 'At the first floor landing, turn left.',
      reverse: 'Walk back to the first floor stairs.'
    }
  ],

  'AB_F1_RIGHT': [
    {
      to: 'AB_PLACEMENT_CELL',
      forward: 'Through the glass door, the Placement Cell is immediately on your right.',
      reverse: 'Exit the Placement Cell — the glass door back to the stairs is behind you.'
    },
    {
      to: 'AB_DIRECTOR_ROOM',
      forward: 'Walk past the Placement Cell. The Director\'s Room is the second room on the right.',
      reverse: 'Exit the Director\'s Room and walk back towards the glass door.'
    },
    {
      to: 'AB_IT_WORKSPACE',
      forward: 'Walk straight — the IT Team Workspace is in the glass rooms ahead.',
      reverse: 'Exit the IT Workspace and walk back towards the glass door.'
    },
    {
      to: 'AB_CHAIRMAN_WAITING',
      forward: 'Take left after a few steps, then immediately left again — this is the Chairman\'s Waiting Room.',
      reverse: 'Exit the Chairman\'s Waiting Room and walk back towards the glass door.'
    },
    {
      to: 'AB_CHAIRMAN_CHAMBER',
      forward: 'Continue past the Chairman\'s Waiting Room. The Chairman\'s Chamber is the last room on this side.',
      reverse: 'Exit the Chairman\'s Chamber and walk back towards the glass door.'
    }
  ],

  'AB_F1_LEFT': [
    {
      to: 'AB_CEO_ROOM',
      forward: 'The CEO\'s Room is the first room on your left from the stairs.',
      reverse: 'Exit the CEO\'s Room and walk back to the stairs.'
    },
    {
      to: 'AB_AYAAN_FOUNDATION',
      forward: 'Walk past the CEO\'s Room. The Ayaan Foundation Room is the next room.',
      reverse: 'Exit the Ayaan Foundation Room and walk back towards the stairs.'
    },
    {
      to: 'AB_PRINCIPAL_WAITING',
      forward: 'The Principal\'s Waiting Hall is on the opposite side from the CEO\'s Room.',
      reverse: 'Exit the Principal\'s Waiting Hall and walk back towards the stairs.'
    },
    {
      to: 'AB_PRINCIPAL_ROOM',
      forward: 'The Principal\'s Room is next to the Principal\'s Waiting Hall.',
      reverse: 'Exit the Principal\'s Room and walk back towards the stairs.'
    }
  ],

  // Admin Block Second Floor
  'AB_F2_STAIRS': [
    {
      to: 'AB_F2_RIGHT',
      forward: 'At the second floor landing, turn right.',
      reverse: 'Walk back to the second floor stairs.'
    },
    {
      to: 'AB_F2_LEFT',
      forward: 'At the second floor landing, turn left.',
      reverse: 'Walk back to the second floor stairs.'
    }
  ],

  'AB_F2_RIGHT': [
    {
      to: 'AB_F2_LABS',
      forward: 'The labs are on the right side of the Admin Block second floor.',
      reverse: 'Exit the labs and walk back towards the stairs.'
    },
    {
      to: 'AB_F2_BOYS_RESTROOM',
      forward: 'Take a right U-turn from the stairs — the Boys Restroom is right there.',
      reverse: 'Exit the Boys Restroom and walk back to the stairs.'
    },
    {
      to: 'AB_F2_GIRLS_RESTROOM',
      forward: 'The Girls Restroom is right next to the Boys Restroom on the right side.',
      reverse: 'Exit the Girls Restroom and walk back to the stairs.'
    }
  ],

  'AB_F2_LEFT': [
    {
      to: 'AB_DIGITAL_LIBRARY',
      forward: 'The Digital Library / Computer Labs are on the left side from the stairs.',
      reverse: 'Exit the Digital Library and walk back towards the stairs.'
    },
    {
      to: 'AB_BALCONY',
      forward: 'Walk to the end of the left corridor — the Balcony is the last left turn straight ahead.',
      reverse: 'Walk back from the Balcony towards the stairs.'
    },
    {
      to: 'AB_LIBRARY',
      forward: 'The Library is on the opposite side from the Balcony.',
      reverse: 'Exit the Library and walk back towards the stairs.'
    }
  ],


  // ═══════════════════════════════════════════════════════════
  //  CAMPUS PATHS
  // ═══════════════════════════════════════════════════════════

  'CAMPUS_WEST_PATH': [
    {
      to: 'EC_ENTRANCE',
      forward: 'Walk along the west campus path. The ECE Block entrance is ahead on your right.',
      reverse: 'From the ECE Block entrance, walk along the path back towards the Main Block.'
    },
    {
      to: 'CAMPUS_SOUTH_PATH',
      forward: 'At the corner, turn left to follow the path along the back of the Main Block.',
      reverse: 'At the corner, turn right and continue along the west path.'
    }
  ],

  'CAMPUS_EC_TO_AB_PATH': [
    {
      to: 'AB_ENTRANCE',
      forward: 'Continue walking straight. The Admin Block entrance is ahead.',
      reverse: 'From the Admin Block entrance, walk back towards the ECE Block.'
    }
  ],

  'CAMPUS_SOUTH_PATH': [
    {
      to: 'CANTEEN',
      forward: 'Follow this path straight ahead. The Canteen is at the far end.',
      reverse: 'From the Canteen, walk straight back along this path.'
    }
  ],


  // ═══════════════════════════════════════════════════════════
  //  TERMINAL NODES
  // ═══════════════════════════════════════════════════════════

  // Main Block rooms
  'MB_GF_GIRLS_RESTROOM': [], 'MB001': [], 'MB002': [], 'MB003': [],
  'MB_GF_ADMIN_CELL': [], 'MB_GF_SH_STAFFROOM': [],
  'MB004': [], 'MB005': [], 'MB_GF_BOYS_RESTROOM': [],

  'MB_F1_GIRLS_RESTROOM': [], 'MB102': [], 'MB103A': [], 'MB103B': [], 'MB103C': [],
  'MB_F1_CSE_STAFFROOM': [], 'MB107': [],
  'MB104': [], 'MB105': [], 'MB106': [], 'MB_F1_BOYS_RESTROOM': [],

  'MB_F2_GIRLS_RESTROOM': [], 'MB_F2_IT_STAFFROOM': [], 'MB202': [], 'MB203': [],
  'MB_F2_MECH_STAFFROOM': [], 'MB203A': [], 'MB203B': [], 'MB203C': [],
  'MB204': [], 'MB205': [], 'MB206': [], 'MB_F2_BOYS_RESTROOM': [],

  'MB_F3_GIRLS_RESTROOM': [], 'MB301A': [], 'MB301B': [], 'MB302': [],
  'MB303': [], 'MB304': [],
  'MB305': [], 'MB306': [], 'MB307': [], 'MB_F3_BOYS_RESTROOM': [],

  // ECE Block rooms
  'EC002': [], 'EC003': [], 'EC004': [],
  'EC101': [], 'EC102': [], 'EC103': [], 'EC_F1_GIRLS_RESTROOM': [],
  'EC201': [], 'EC202': [], 'EC203': [], 'EC_F2_ECE_STAFFROOM': [],
  'EC301': [], 'EC302': [], 'EC303': [], 'EC_F3_BOYS_RESTROOM': [],

  // Admin Block rooms
  'AB002': [], 'AB003': [], 'AB004': [], 'AB005': [], 'AB007': [],
  'AB_MINI_CANTEEN': [], 'AB_EXAM_CELL': [],
  'AB_PLACEMENT_CELL': [], 'AB_DIRECTOR_ROOM': [], 'AB_IT_WORKSPACE': [],
  'AB_CHAIRMAN_WAITING': [], 'AB_CHAIRMAN_CHAMBER': [],
  'AB_CEO_ROOM': [], 'AB_AYAAN_FOUNDATION': [],
  'AB_PRINCIPAL_WAITING': [], 'AB_PRINCIPAL_ROOM': [],
  'AB_F2_LABS': [], 'AB_F2_BOYS_RESTROOM': [], 'AB_F2_GIRLS_RESTROOM': [],
  'AB_DIGITAL_LIBRARY': [], 'AB_BALCONY': [], 'AB_LIBRARY': [],

  // Campus
  'CANTEEN': []
};


// ── Build full bidirectional adjacency list ────────────────

/**
 * Build a complete bidirectional adjacency map from the graph definition.
 * Returns: { nodeId: [ { to, instruction } ] }
 */
function buildAdjacencyList() {
  const adj = {};

  // Initialize all nodes
  Object.keys(NAV_GRAPH).forEach(nodeId => {
    if (!adj[nodeId]) adj[nodeId] = [];
  });

  // Add forward and reverse edges
  Object.entries(NAV_GRAPH).forEach(([fromId, edges]) => {
    edges.forEach(edge => {
      // Forward edge
      adj[fromId].push({
        to: edge.to,
        instruction: edge.forward
      });

      // Reverse edge
      if (!adj[edge.to]) adj[edge.to] = [];
      adj[edge.to].push({
        to: fromId,
        instruction: edge.reverse
      });
    });
  });

  return adj;
}

// Pre-build the adjacency list
const ADJACENCY = buildAdjacencyList();
