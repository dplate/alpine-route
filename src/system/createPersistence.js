const stateId = 'stateV1';

const loadState = (window) => {
  try {
    return JSON.parse(window.localStorage.getItem(stateId) || null) || {};
  } catch (error) {
    return {};
  }
};

const createState = () => ({ levels: {} });

const saveState = (window, state) => {
  window.localStorage.setItem(stateId, JSON.stringify(state));
};

const getLevelState = (state, level) => {
  if (!state.levels[level.id]) {
    state.levels[level.id] = {
      route: null
    };
  }
  return state.levels[level.id];
};

export default (window) => {
  const state = {
    ...createState(),
    ...loadState(window)
  };

  return {
    saveRoute: (level, data) => {
      const levelState = getLevelState(state, level);
      levelState.route = data;
      saveState(window, state);
    },
    loadRoute: (level) => {
      const levelState = getLevelState(state, level);
      return levelState.route;
    }
  };
};