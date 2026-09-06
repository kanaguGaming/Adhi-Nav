// ============================================================
// AdhiNav — Navigation Graph
// Bidirectional adjacency list with human-readable instructions
// ============================================================

// Each edge: { to: locationId, forward: "instruction going to", reverse: "instruction coming back" }
// forward = instruction when traversing FROM this node TO the 'to' node
// reverse = instruction when traversing FROM 'to' node TO this node (auto-generated in adjacency)

const NAV_GRAPH = {

  // ═══════════════════════════════════════════════════════════
  // MAIN BLOCK — GROUND FLOOR
  // ═══════════════════════════════════════════════════════════

  'MB_ENTRANCE': [
    {
      to: 'MB_GF_CORRIDOR',
      forward: 'Enter the Main Block from the West Entrance. You are now in the ground floor corridor, facing east. The main staircase is immediately here.',
      reverse: 'Walk towards the West Entrance of the Main Block and exit.'
    },
    {
      to: 'MB_WEST_PORTICO',
      forward: 'You are already at the West Portico (the Main Entrance).',
      reverse: 'You are already at the Main Entrance.'
    },
    {
      to: 'CAMPUS_WEST_PATH',
      forward: 'From the West Entrance, head south along the campus path on the west side of the building.',
      reverse: 'Walk north along the west path until you reach the Main Block entrance.'
    }
  ],

  'MB_GF_CORRIDOR': [
    {
      to: 'MB_GF_LEFT_WING',
      forward: 'While facing east, turn LEFT into the left wing corridor.',
      reverse: 'Walk back to the main ground floor corridor.'
    },
    {
      to: 'MB_GF_RIGHT_WING',
      forward: 'While facing east, turn RIGHT into the right wing corridor.',
      reverse: 'Walk back to the main ground floor corridor.'
    },
    {
      to: 'MB_GF_STAIRS',
      forward: 'Walk straight ahead towards the staircase at the end of the ground floor corridor.',
      reverse: 'Walk down from the staircase into the ground floor corridor.'
    },
    {
      to: 'MB_EAST_PORTICO',
      forward: 'Walk straight through the corridor and continue to the East Portico.',
      reverse: 'Enter the Main Block from the East Portico into the ground floor corridor.'
    }
  ],

  // Ground floor left wing rooms (MB001-MB003)
  'MB_GF_LEFT_WING': [
    {
      to: 'MB_GF_GIRLS_RESTROOM',
      forward: 'The Girls Restroom is the very first (left-most) room in this wing.',
      reverse: 'Exit the Girls Restroom and step into the left wing corridor.'
    },
    {
      to: 'MB001',
      forward: 'MB001 is the first room on the left side of this wing.',
      reverse: 'Exit MB001 and step into the left wing corridor.'
    },
    {
      to: 'MB002',
      forward: 'MB002 is the second room on the left side, next to MB001.',
      reverse: 'Exit MB002 and step into the left wing corridor.'
    },
    {
      to: 'MB003',
      forward: 'MB003 is the third room on the left side, at the end of this wing.',
      reverse: 'Exit MB003 and step into the left wing corridor.'
    }
  ],

  // Ground floor right wing rooms (MB004)
  'MB_GF_RIGHT_WING': [
    {
      to: 'MB004',
      forward: 'MB004 is on the right side of the ground floor.',
      reverse: 'Exit MB004 and step into the right wing corridor.'
    },
    {
      to: 'MB_GF_BOYS_RESTROOM',
      forward: 'The Boys Restroom is the last (right-most) room in this wing.',
      reverse: 'Exit the Boys Restroom and step into the right wing corridor.'
    }
  ],

  // ═══════════════════════════════════════════════════════════
  // MAIN BLOCK — STAIRS CONNECTIONS
  // ═══════════════════════════════════════════════════════════

  'MB_GF_STAIRS': [
    {
      to: 'MB_F1_STAIRS',
      forward: 'Climb up one flight of stairs to reach the First Floor.',
      reverse: 'Walk down one flight of stairs to reach the Ground Floor.'
    }
  ],

  'MB_F1_STAIRS': [
    {
      to: 'MB_F2_STAIRS',
      forward: 'Climb up one more flight of stairs to reach the Second Floor.',
      reverse: 'Walk down one flight of stairs to reach the First Floor.'
    },
    {
      to: 'MB_F1_LEFT_WING',
      forward: 'At the first floor landing, while facing east, turn LEFT.',
      reverse: 'Walk back to the first floor stairs landing.'
    },
    {
      to: 'MB_F1_STRAIGHT',
      forward: 'At the first floor landing, look STRAIGHT ahead while facing east.',
      reverse: 'Walk back to the first floor stairs landing.'
    },
    {
      to: 'MB_F1_RIGHT_WING',
      forward: 'At the first floor landing, while facing east, turn RIGHT.',
      reverse: 'Walk back to the first floor stairs landing.'
    },
    {
      to: 'MB_F1_EAST_PORTICO_STAIRS',
      forward: 'Head straight through the corridor towards the east portico, then find the stairs on the north side.',
      reverse: 'Walk back from the east portico stairs to the first floor main staircase.'
    }
  ],

  // First floor rooms
  'MB_F1_LEFT_WING': [
    {
      to: 'MB_F1_GIRLS_RESTROOM',
      forward: 'The Girls Restroom is the very first (left-most) room in this wing.',
      reverse: 'Exit the Girls Restroom and step into the left wing corridor.'
    },
    {
      to: 'MB102',
      forward: 'MB102 (Radhakrishnan Seminar Hall) is on the left side. You\'ll see the large seminar hall entrance.',
      reverse: 'Exit the Seminar Hall and turn to face the stairs.'
    }
  ],

  'MB_F1_STRAIGHT': [
    {
      to: 'MB103AB',
      forward: 'MB103 A/B is straight ahead when you face east from the first floor stairs.',
      reverse: 'Walk back towards the staircase from MB103 A/B.'
    }
  ],

  'MB_F1_EAST_PORTICO_STAIRS': [
    {
      to: 'MB103C',
      forward: 'MB103C is at the top of the stairs on the north side of the east portico.',
      reverse: 'Exit MB103C and head back down the east portico stairs.'
    }
  ],

  'MB_F1_RIGHT_WING': [
    {
      to: 'MB104',
      forward: 'MB104 is the first room on the right side of the first floor.',
      reverse: 'Exit MB104 and step into the right wing corridor.'
    },
    {
      to: 'MB105',
      forward: 'MB105 is the second room on the right side, next to MB104.',
      reverse: 'Exit MB105 and step into the right wing corridor.'
    },
    {
      to: 'MB106',
      forward: 'MB106 is the third room on the right side, at the end of this wing.',
      reverse: 'Exit MB106 and step into the right wing corridor.'
    },
    {
      to: 'MB_F1_BOYS_RESTROOM',
      forward: 'The Boys Restroom is the last (right-most) room in this wing.',
      reverse: 'Exit the Boys Restroom and step into the right wing corridor.'
    }
  ],

  // ═══════════════════════════════════════════════════════════
  // MAIN BLOCK — SECOND FLOOR
  // ═══════════════════════════════════════════════════════════

  'MB_F2_STAIRS': [
    {
      to: 'MB_F3_STAIRS',
      forward: 'Climb up one more flight of stairs to reach the Third Floor.',
      reverse: 'Walk down one flight of stairs to reach the Second Floor.'
    },
    {
      to: 'MB_F2_LEFT_WING',
      forward: 'At the second floor landing, while facing east, turn LEFT.',
      reverse: 'Walk back to the second floor stairs landing.'
    },
    {
      to: 'MB_F2_STRAIGHT',
      forward: 'At the second floor landing, look STRAIGHT ahead while facing east.',
      reverse: 'Walk back to the second floor stairs landing.'
    },
    {
      to: 'MB_F2_RIGHT_WING',
      forward: 'At the second floor landing, while facing east, turn RIGHT.',
      reverse: 'Walk back to the second floor stairs landing.'
    }
  ],

  'MB_F2_LEFT_WING': [
    {
      to: 'MB_F2_GIRLS_RESTROOM',
      forward: 'The Girls Restroom is the very first (left-most) room in this wing.',
      reverse: 'Exit the Girls Restroom and step into the left wing corridor.'
    },
    {
      to: 'MB202',
      forward: 'MB202 is the first room on the left side of the second floor.',
      reverse: 'Exit MB202 and step into the left wing corridor.'
    },
    {
      to: 'MB203',
      forward: 'MB203 is the second room on the left side, next to MB202.',
      reverse: 'Exit MB203 and step into the left wing corridor.'
    }
  ],

  'MB_F2_STRAIGHT': [
    {
      to: 'MB203X',
      forward: 'MB203x is straight ahead when you face east from the second floor stairs.',
      reverse: 'Walk back towards the staircase from MB203x.'
    }
  ],

  'MB_F2_RIGHT_WING': [
    {
      to: 'MB_F2_BOYS_RESTROOM',
      forward: 'The Boys Restroom is the last (right-most) room in this wing.',
      reverse: 'Exit the Boys Restroom and step into the right wing corridor.'
    }
  ],

  // ═══════════════════════════════════════════════════════════
  // MAIN BLOCK — THIRD FLOOR
  // ═══════════════════════════════════════════════════════════

  'MB_F3_STAIRS': [
    {
      to: 'MB_F3_LEFT_WING',
      forward: 'At the third floor landing, while facing east, turn LEFT.',
      reverse: 'Walk back to the third floor stairs landing.'
    },
    {
      to: 'MB_F3_RIGHT_WING',
      forward: 'At the third floor landing, while facing east, turn RIGHT.',
      reverse: 'Walk back to the third floor stairs landing.'
    }
  ],

  'MB_F3_LEFT_WING': [
    {
      to: 'MB_F3_GIRLS_RESTROOM',
      forward: 'The Girls Restroom is the very first (left-most) room in this wing.',
      reverse: 'Exit the Girls Restroom and step into the left wing corridor.'
    },
    {
      to: 'MB301A',
      forward: 'MB301A is the first room on the left side of the third floor.',
      reverse: 'Exit MB301A and step into the left wing corridor.'
    },
    {
      to: 'MB301B',
      forward: 'MB301B is the second room on the left side, next to MB301A.',
      reverse: 'Exit MB301B and step into the left wing corridor.'
    },
    {
      to: 'MB302',
      forward: 'MB302 is further along the left wing of the third floor.',
      reverse: 'Exit MB302 and step into the left wing corridor.'
    }
  ],

  'MB_F3_RIGHT_WING': [
    {
      to: 'MB304',
      forward: 'MB304 is the first room on the right side of the third floor.',
      reverse: 'Exit MB304 and step into the right wing corridor.'
    },
    {
      to: 'MB305',
      forward: 'MB305 is the second room on the right side, next to MB304.',
      reverse: 'Exit MB305 and step into the right wing corridor.'
    },
    {
      to: 'MB306',
      forward: 'MB306 is the third room on the right side.',
      reverse: 'Exit MB306 and step into the right wing corridor.'
    },
    {
      to: 'MB307',
      forward: 'MB307 is the last room on the right side of the third floor.',
      reverse: 'Exit MB307 and step into the right wing corridor.'
    },
    {
      to: 'MB_F3_BOYS_RESTROOM',
      forward: 'The Boys Restroom is the last (right-most) room in this wing.',
      reverse: 'Exit the Boys Restroom and step into the right wing corridor.'
    }
  ],


  // ═══════════════════════════════════════════════════════════
  // EAST PORTICO (connects corridor to outdoor)
  // ═══════════════════════════════════════════════════════════

  'MB_EAST_PORTICO': [
    {
      to: 'CAMPUS_SOUTH_PATH',
      forward: 'Exit the East Portico and head south to join the main east-west campus path.',
      reverse: 'Walk north from the campus path to enter the East Portico.'
    }
  ],


  // ═══════════════════════════════════════════════════════════
  // WEST PORTICO
  // ═══════════════════════════════════════════════════════════

  'MB_WEST_PORTICO': [
    {
      to: 'CAMPUS_WEST_PATH',
      forward: 'Head south along the campus path on the west side of the building.',
      reverse: 'Walk north along the west path to reach the West Portico.'
    }
  ],


  // ═══════════════════════════════════════════════════════════
  // CAMPUS PATHS
  // ═══════════════════════════════════════════════════════════

  'CAMPUS_WEST_PATH': [
    {
      to: 'ECE_BLOCK',
      forward: 'Continue walking south along the west path. The ECE Block is ahead.',
      reverse: 'Walk north from the ECE Block towards the Main Block.'
    },
    {
      to: 'CAMPUS_SOUTH_PATH',
      forward: 'Turn left to head east along the path running south of the Main Block.',
      reverse: 'Turn right to head north along the west path.'
    }
  ],

  'ECE_BLOCK': [
    {
      to: 'AB_ENTRANCE',
      forward: 'Continue walking south past the ECE Block. The Admin Block is further south.',
      reverse: 'Walk north from the Admin Block, passing the ECE Block.'
    }
  ],

  'CAMPUS_SOUTH_PATH': [
    {
      to: 'CANTEEN',
      forward: 'Follow this path east. The Canteen is on the far east side of the campus.',
      reverse: 'From the Canteen, follow the path west.'
    }
  ],


  // ═══════════════════════════════════════════════════════════
  // ADMIN BLOCK
  // ═══════════════════════════════════════════════════════════

  'AB_ENTRANCE': [
    {
      to: 'AB_GF_IMMEDIATE_LEFT',
      forward: 'Enter the Admin Block (facing west). Immediately turn LEFT.',
      reverse: 'Turn right and walk back to the Admin Block entrance.'
    },
    {
      to: 'AB_GF_LEFT_LANE',
      forward: 'Enter the Admin Block (facing west). Take the left path (to the left of the elevator).',
      reverse: 'Walk back along the left lane to the Admin Block entrance.'
    }
  ],

  'AB_GF_IMMEDIATE_LEFT': [
    {
      to: 'AB002',
      forward: 'AB002 is immediately on your left as you enter — the first door.',
      reverse: 'Exit AB002 and you\'re right at the entrance area.'
    }
  ],

  'AB_GF_LEFT_LANE': [
    {
      to: 'AB003',
      forward: 'AB003 is the first room along the left lane (left of elevator), facing west.',
      reverse: 'Exit AB003 and step into the left lane corridor.'
    },
    {
      to: 'AB004',
      forward: 'Continue along the left lane past AB003. AB004 is the last room in this lane.',
      reverse: 'Exit AB004 and step into the left lane corridor.'
    }
  ],

  'AB004': [
    {
      to: 'AB_GF_TURN_RIGHT',
      forward: 'At the end of the lane near AB004, turn RIGHT.',
      reverse: 'Turn left and walk back to AB004.'
    }
  ],

  'AB_GF_TURN_RIGHT': [
    {
      to: 'AB005',
      forward: 'AB005 is the first room after turning right from AB004.',
      reverse: 'Exit AB005 and turn left to head back towards AB004.'
    }
  ],

  // Terminal nodes (rooms with no outgoing edges except back)
  'MB001': [], 'MB002': [], 'MB003': [], 'MB004': [],
  'MB102': [], 'MB103AB': [], 'MB103C': [],
  'MB104': [], 'MB105': [], 'MB106': [],
  'MB202': [], 'MB203': [], 'MB203X': [],
  'MB301A': [], 'MB301B': [], 'MB302': [],
  'MB304': [], 'MB305': [], 'MB306': [], 'MB307': [],
  'AB002': [], 'AB003': [],
  'AB005': [],
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
