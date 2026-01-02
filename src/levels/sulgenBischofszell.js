export default {
  id: 'sulgen-bischofszell',
  map: 'thurgau',
  dependsOn: null,
  name: {
    de: 'Eisenbahn nach Bischofszell',
    en: 'Train to Bischofszell',
  },
  description: {
    de: 'Als Teil einer Eisenbahnverbindung zwischen Konstanz und St. Gallen wird eine Planung für den Streckenabschnitt von Sulgen nach Bischofszell erforderlich. Da Sulgen im Tal gelegen ist und Bischofszell sich auf einer Anhöhe befindet, dürfte die Trassierung nicht ohne Herausforderungen sein – zumal es unerlässlich ist, scharfe Kurven zu vermeiden.',
    en: 'As part of a railway connection between Constance and St. Gallen, a plan is required for the section from Sulgen to Bischofszell. Since Sulgen lies in the valley and Bischofszell is situated on an elevation, the routing is likely to present certain challenges—especially as sharp curves must be avoided.',
  },
  type: 'narrowGaugeRailway',
  difficulty: 'easy',
  start: {
    x: 498,
    y: 679,
  },
  end: {
    x: 4925,
    y: 5427,
  },
  budget: 650000,
  costs: {
    tunnelMeter: 7,
    tunnelDepthFactor: 0.75,
    bridgeMeter: 5,
    bridgeHeightFactor: 5,
    groundMeter: 2,
    groundSlopeFactor: 20,
  },
  limits: {
    minRadius: 300,
    maxGradient: 1.7,
    maxVariance: null,
    minGap: 10,
  },
};
