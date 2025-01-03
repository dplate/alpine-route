const stateId = 'stateV1';

const loadState = (window) => {
  try {
    return JSON.parse(window.localStorage.getItem(stateId) || null) || {};
  } catch (error) {
    return {};
  }
};

const createState = () => ({
  levels: {},
  helps: {},
  finished: false,
});

const saveState = (window, state) => {
  window.localStorage.setItem(stateId, JSON.stringify(state));
};

const getLevelState = (state, level) => {
  if (!state.levels[level.id]) {
    state.levels[level.id] = {
      available: false,
      route: null,
      costs: null,
    };
  }
  return state.levels[level.id];
};

export default (window) => {
  const state = {
    ...createState(),
    ...loadState(window),
  };

  return {
    markAsAvailable: (level) => {
      const levelState = getLevelState(state, level);
      levelState.available = true;
      saveState(window, state);
    },
    isAvailable: (level) => {
      const levelState = getLevelState(state, level);
      return levelState.available;
    },
    saveRoute: (level, data) => {
      const levelState = getLevelState(state, level);
      levelState.route = data;
      saveState(window, state);
    },
    loadRoute: (level) => {
      const levelState = getLevelState(state, level);
      return levelState.route;
    },
    saveCosts: (level, costs) => {
      const levelState = getLevelState(state, level);
      levelState.costs = costs;
      saveState(window, state);
    },
    loadCosts: (level) => {
      const levelState = getLevelState(state, level);
      return levelState.costs;
    },
    markAsFinished: () => {
      state.finished = true;
      saveState(window, state);
    },
    hasFinished: () => {
      return state.finished;
    },
    markHelpAsSeen: (help) => {
      state.helps[help.id] = {
        seen: true,
      };
      saveState(window, state);
    },
    hasHelpSeen: (help) => {
      return state.helps[help.id]?.seen;
    },
  };
};
