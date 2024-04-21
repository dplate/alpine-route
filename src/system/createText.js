const texts = {
  de: {
    BUDGET_LABEL: 'Budget',
    TUNNEL_COSTS_LABEL: 'Tunnel',
    BRIDGE_COSTS_LABEL: 'Brücken',
    GROUND_COSTS_LABEL: 'Strecke',
    BALANCE_LABEL: 'Saldo',
    MIN_RADIUS_LIMIT_LABEL: 'Radius',
    MAX_GRADIENT_LIMIT_LABEL: 'Steigung',
    MAX_VARIANCE_LIMIT_LABEL: 'Varianz',
    MIN_GAP_LIMIT_LABEL: 'Abstand'
  },
  en: {
    BUDGET_LABEL: 'Budget',
    TUNNEL_COSTS_LABEL: 'Tunnels',
    BRIDGE_COSTS_LABEL: 'Bridges',
    GROUND_COSTS_LABEL: 'Track',
    BALANCE_LABEL: 'Balance',
    MIN_RADIUS_LIMIT_LABEL: 'Radius',
    MAX_GRADIENT_LIMIT_LABEL: 'Gradient',
    MAX_VARIANCE_LIMIT_LABEL: 'Variance',
    MIN_GAP_LIMIT_LABEL: 'Gap'
  }
};

export default (language) => {
  const currencyFormatter = new Intl.NumberFormat(language, { maximumFractionDigits: 0 });
  return {
    get: (textId) => texts[language][textId] || texts['en'][textId],
    formatCurrency: (amount) => `${currencyFormatter.format(amount)} ₣`,
  };
};