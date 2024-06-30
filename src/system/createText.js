const texts = {
  de: {
    BUDGET_LABEL: 'Budget',
    TUNNEL_COSTS_LABEL: 'Tunnel',
    BRIDGE_COSTS_LABEL: 'Brücken',
    GROUND_COSTS_LABEL: 'Strecke',
    BALANCE_LABEL: 'Saldo',
    MIN_RADIUS_LIMIT_LABEL: 'Radius',
    MIN_RADIUS_LIMIT_LONG_LABEL: 'Min. Kurvenradius',
    MAX_GRADIENT_LIMIT_LABEL: 'Steigung',
    MAX_GRADIENT_LIMIT_LONG_LABEL: 'Max. Steigung',
    MAX_VARIANCE_LIMIT_LABEL: 'Varianz',
    MAX_VARIANCE_LIMIT_LONG_LABEL: 'Max. Varianz der Steigung',
    MIN_GAP_LIMIT_LABEL: 'Abstand',
    MIN_GAP_LIMIT_LONG_LABEL: 'Min. Höhenabstand',
    END_BUTTON_FINISH: 'Planung beenden',
    END_BUTTON_SUSPEND: 'Planung unterbrechen',
    STATUS_INVALID: 'unfertig',
    START_BUTTON_INITIAL: 'Strecke planen',
    START_BUTTON_IMPROVE: 'Strecke verbessern',
    TYPE: 'Art',
    TYPES: {
      funicular: 'Standseilbahn',
      cogRailroad: 'Zahnradbahn'
    },
    METERS: 'Meter',
    PERCENT: 'Prozent'
  },
  en: {
    BUDGET_LABEL: 'Budget',
    TUNNEL_COSTS_LABEL: 'Tunnels',
    BRIDGE_COSTS_LABEL: 'Bridges',
    GROUND_COSTS_LABEL: 'Track',
    BALANCE_LABEL: 'Balance',
    MIN_RADIUS_LIMIT_LABEL: 'Radius',
    MIN_RADIUS_LIMIT_LONG_LABEL: 'Minimum curve radius',
    MAX_GRADIENT_LIMIT_LABEL: 'Gradient',
    MAX_GRADIENT_LIMIT_LONG_LABEL: 'Maximum gradient',
    MAX_VARIANCE_LIMIT_LABEL: 'Variance',
    MAX_VARIANCE_LIMIT_LONG_LABEL: 'Maximum variance of gradient',
    MIN_GAP_LIMIT_LABEL: 'Gap',
    MIN_GAP_LIMIT_LONG_LABEL: 'Minimum height gap',
    END_BUTTON_FINISH: 'Finish planning',
    END_BUTTON_SUSPEND: 'Suspend planning',
    STATUS_INVALID: 'invalid',
    START_BUTTON_INITIAL: 'Plan route',
    START_BUTTON_IMPROVE: 'Improve route',
    TYPE: 'Type',
    TYPES: {
      funicular: 'Funicular',
      cogRailroad: 'Cog railroad'
    },
    METERS: 'meters',
    PERCENT: 'percent'
  }
};

export default (language) => {
  const currencyFormatter = new Intl.NumberFormat(language, { maximumFractionDigits: 0 });
  return {
    get: (textId) => texts[language][textId] || texts['en'][textId],
    translate: (translations) =>  translations[language] || translations['en'],
    formatCurrency: (amount) => `${currencyFormatter.format(amount)} ₣`,
  };
};