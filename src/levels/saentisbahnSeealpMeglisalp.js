export default {
  id: 'saentisbahn-seealp-meglisalp',
  map: 'saentis',
  dependsOn: 'saentisbahn-wasserauen-seealp',
  name: {
    de: 'Säntisbahn II: Meglisalp',
    en: 'Säntisbahn II: Meglisalp',
  },
  description: {
    de: 'Nachdem wir endlich die Hochebene des malerischen Seealpsees erreicht haben, steht nun die Umsetzung des steilsten Abschnitts der Säntisbahn bevor: von der Seealp durch die Felswände hindurch bis zur Siedlung Meglisalp. Dies bedeutet eine Überwindung von 400 Höhenmetern auf kurzer Strecke, wofür wir den Bau einer Standseilbahn in Erwägung ziehen.',
    en: 'Having at last reached the plateau of the picturesque Seealpsee, we now face the implementation of the steepest section of the Säntis Railway: from Seealp through the rock walls to the settlement of Meglisalp. This entails an ascent of 400 meters over a short distance, for which we have considered the construction of a funicular railway.',
  },
  type: 'funicular',
  difficulty: 'medium',
  start: {
    x: 4860,
    y: 4597,
  },
  end: {
    x: 4537,
    y: 5307,
  },
  budget: 230000,
  costs: {
    tunnelMeter: 7,
    tunnelDepthFactor: 1,
    bridgeMeter: 5,
    bridgeHeightFactor: 5,
    groundMeter: 2,
    groundSlopeFactor: 20,
  },
  limits: {
    minRadius: 400,
    maxGradient: 60,
    maxVariance: 15,
    minGap: null,
  },
};
