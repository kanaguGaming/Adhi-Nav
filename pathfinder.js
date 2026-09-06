// ============================================================
// AdhiNav — Pathfinder
// BFS shortest-path algorithm + step instruction generator
// ============================================================

/**
 * Find shortest path between two locations using BFS
 * @param {string} startId - Starting location ID
 * @param {string} endId - Destination location ID
 * @returns {Array|null} Array of { nodeId, instruction } or null if no path
 */
function findPath(startId, endId) {
  if (startId === endId) {
    return [{
      nodeId: startId,
      instruction: `You are already at ${getLocationById(startId)?.name || startId}! 🎉`
    }];
  }

  const visited = new Set();
  const queue = [[startId]];
  const parentMap = {};  // nodeId -> { parent, instruction }

  visited.add(startId);

  while (queue.length > 0) {
    const path = queue.shift();
    const current = path[path.length - 1];

    if (current === endId) {
      // Reconstruct path with instructions
      return reconstructPath(startId, endId, parentMap);
    }

    const neighbors = ADJACENCY[current] || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor.to)) {
        visited.add(neighbor.to);
        parentMap[neighbor.to] = {
          parent: current,
          instruction: neighbor.instruction
        };
        queue.push([...path, neighbor.to]);
      }
    }
  }

  return null; // No path found
}

/**
 * Reconstruct path from BFS parent map into step-by-step instructions
 */
function reconstructPath(startId, endId, parentMap) {
  const steps = [];
  let current = endId;

  // Build path from end to start
  while (current !== startId) {
    const { parent, instruction } = parentMap[current];
    steps.unshift({
      nodeId: current,
      instruction: instruction,
      location: getLocationById(current)
    });
    current = parent;
  }

  // Add starting location
  const startLoc = getLocationById(startId);
  steps.unshift({
    nodeId: startId,
    instruction: `You are at ${startLoc?.name || startId}. Let's navigate to your destination!`,
    location: startLoc
  });

  // Filter out intermediate corridor/waypoint nodes for cleaner UX,
  // but keep their instructions merged into adjacent steps
  return optimizeSteps(steps);
}

/**
 * Optimize steps by merging short intermediate waypoints
 * Keeps instructions natural and avoids "you are in a corridor" type noise
 */
function optimizeSteps(steps) {
  if (steps.length <= 2) return steps;

  const optimized = [steps[0]]; // Always keep the start

  for (let i = 1; i < steps.length; i++) {
    const step = steps[i];
    const loc = step.location;

    // Keep the step if it's a meaningful location (room, entrance, stairs, portico, landmark)
    // Or if it's the last step
    const isMeaningful = loc && (
      loc.type === LOCATION_TYPES.ROOM ||
      loc.type === LOCATION_TYPES.ENTRANCE ||
      loc.type === LOCATION_TYPES.STAIRS ||
      loc.type === LOCATION_TYPES.PORTICO ||
      loc.type === LOCATION_TYPES.LANDMARK
    );

    if (isMeaningful || i === steps.length - 1) {
      optimized.push(step);
    } else {
      // Merge this waypoint's instruction with the next step
      if (i + 1 < steps.length) {
        steps[i + 1].instruction = step.instruction + ' ' + steps[i + 1].instruction;
      }
    }
  }

  // Number the steps
  return optimized.map((step, index) => ({
    ...step,
    stepNumber: index + 1,
    totalSteps: optimized.length
  }));
}


/**
 * Get nearby scannable locations (for "I'm lost" feature)
 * Returns locations that have QR codes
 */
function getNearbyScanPoints(currentNodeId) {
  const scannable = getScannableLocations();
  const currentLoc = getLocationById(currentNodeId);

  if (!currentLoc) return scannable.slice(0, 5);

  // Sort by same block first, then by floor proximity
  return scannable
    .map(loc => ({
      ...loc,
      score: (loc.block === currentLoc.block ? 0 : 10) + Math.abs((loc.floor || 0) - (currentLoc.floor || 0))
    }))
    .sort((a, b) => a.score - b.score)
    .slice(0, 5);
}


/**
 * NavigationSession — manages step-by-step navigation state
 */
class NavigationSession {
  constructor(startId, endId) {
    this.startId = startId;
    this.endId = endId;
    this.steps = findPath(startId, endId);
    this.currentStepIndex = 0;
    this.isComplete = false;
    this.startLocation = getLocationById(startId);
    this.endLocation = getLocationById(endId);
  }

  hasPath() {
    return this.steps !== null && this.steps.length > 0;
  }

  getCurrentStep() {
    if (!this.steps) return null;
    return this.steps[this.currentStepIndex] || null;
  }

  getTotalSteps() {
    return this.steps ? this.steps.length : 0;
  }

  getProgress() {
    if (!this.steps || this.steps.length === 0) return 0;
    return ((this.currentStepIndex + 1) / this.steps.length) * 100;
  }

  canGoNext() {
    return this.steps && this.currentStepIndex < this.steps.length - 1;
  }

  canGoPrevious() {
    return this.currentStepIndex > 0;
  }

  next() {
    if (this.canGoNext()) {
      this.currentStepIndex++;
      return this.getCurrentStep();
    }
    return null;
  }

  previous() {
    if (this.canGoPrevious()) {
      this.currentStepIndex--;
      return this.getCurrentStep();
    }
    return null;
  }

  markReached() {
    this.isComplete = true;
    return {
      nodeId: this.endId,
      instruction: `🎉 You've arrived at ${this.endLocation?.name || this.endId}! Navigation complete.`,
      stepNumber: this.steps.length,
      totalSteps: this.steps.length
    };
  }

  getAllSteps() {
    return this.steps || [];
  }

  /**
   * Get context summary for AI assistant
   */
  getContextForAI() {
    const step = this.getCurrentStep();
    return {
      from: this.startLocation?.name || this.startId,
      to: this.endLocation?.name || this.endId,
      currentStep: this.currentStepIndex + 1,
      totalSteps: this.getTotalSteps(),
      currentInstruction: step?.instruction || '',
      currentLocation: step?.location?.name || step?.nodeId || '',
      progress: Math.round(this.getProgress()),
      isComplete: this.isComplete,
      allSteps: (this.steps || []).map(s => s.instruction)
    };
  }
}
