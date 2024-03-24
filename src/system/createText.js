const texts = {
  de: {
    TUNNEL_COSTS_LABEL: 'Tunnel',
    BRIDGE_COSTS_LABEL: 'Brücken',
    GROUND_COSTS_LABEL: 'Strecke',
    COSTS_LABEL: 'Kosten',
    MIN_RADIUS_LIMIT_LABEL: 'Radius',
    MAX_GRADIENT_LIMIT_LABEL: 'Steigung',
    MAX_VARIANCE_LIMIT_LABEL: 'Varianz',
    MIN_GAP_LIMIT_LABEL: 'Abstand'
  },
  en: {
    TUNNEL_COSTS_LABEL: 'Tunnels',
    BRIDGE_COSTS_LABEL: 'Bridges',
    GROUND_COSTS_LABEL: 'Track',
    COSTS_LABEL: 'Costs',
    MIN_RADIUS_LIMIT_LABEL: 'Radius',
    MAX_GRADIENT_LIMIT_LABEL: 'Gradient',
    MAX_VARIANCE_LIMIT_LABEL: 'Variance',
    MIN_GAP_LIMIT_LABEL: 'Gap'
  }
};

export default (language) => {
  return {
    get: (textId) => texts[language][textId] || texts['en'][textId],
    formatCurrency: (new Intl.NumberFormat(language, { maximumFractionDigits: 0 })).format,
  };
};