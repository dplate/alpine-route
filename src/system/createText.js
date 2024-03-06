const texts = {
  de: {
    TUNNEL_COSTS_LABEL: 'Tunnel',
    BRIDGE_COSTS_LABEL: 'Brücken',
    GROUND_COSTS_LABEL: 'Strecke',
    COSTS_LABEL: 'Kosten',
  },
  en: {
    TUNNEL_COSTS_LABEL: 'Tunnels',
    BRIDGE_COSTS_LABEL: 'Bridges',
    GROUND_COSTS_LABEL: 'Track',
    COSTS_LABEL: 'Costs',
  }
};

export default (language) => {
  return {
    get: (textId) => texts[language][textId] || texts['en'][textId]
  };
};