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
    HELP_CLOSE_BUTTON: 'Verstanden',
    STATUS_INVALID: 'unfertig',
    START_BUTTON_INITIAL: 'Strecke planen',
    START_BUTTON_IMPROVE: 'Strecke verbessern',
    TYPE: 'Art',
    TYPES: {
      muleTrack: 'Saumpfad',
      funicular: 'Standseilbahn',
      cogRailway: 'Zahnradbahn',
      narrowGaugeRailway: 'Schmalspurbahn',
      road: 'Straße',
    },
    METERS: 'Meter',
    PERCENT: 'Prozent',
    SUCCESS: 'Es erfüllt mich mit größter Freude, Ihnen zu verkünden, dass sämtliche gestellten Aufgaben mit Sorgfalt gelöst und wohlüberlegte Strecken geplant wurden. Besonders hervorzuheben ist die kluge Berücksichtigung kostengünstiger Lösungen, wodurch ein Überschuss von {{MONEY}} erwirtschaftet werden konnte. Dieser Ertrag ermöglicht es nun, den wohlverdienten Ruhestand in vollen Zügen zu genießen. Alternativ besteht die Gelegenheit, die Strecken weiter zu optimieren und sich dadurch ein zusätzliches Einkommen zu sichern.'
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
    HELP_CLOSE_BUTTON: 'Got it',
    STATUS_INVALID: 'invalid',
    START_BUTTON_INITIAL: 'Plan route',
    START_BUTTON_IMPROVE: 'Improve route',
    TYPE: 'Type',
    TYPES: {
      funicular: 'Funicular',
      coRailway: 'Cog railway',
      narrowGaugeRailway: 'Narrow-gauge railway'
    },
    METERS: 'meters',
    PERCENT: 'percent',
    SUCCESS: 'It brings me the utmost joy to announce that all assigned tasks have been executed with care, and well-considered routes have been devised. Particularly commendable is the prudent attention to cost-effective solutions, resulting in a surplus of {{MONEY}}. This surplus now offers the opportunity to enjoy a well-deserved retirement to the fullest. Alternatively, there is the prospect of further refining the routes and thereby earning additional income.'
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