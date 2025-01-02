export default {
  id: 'saentisbahn-wasserauen-seealp',
  map: 'saentis',
  name: {
    de: 'Säntisbahn I: Seealp',
    en: 'Säntisbahn I: Seealp',
  },
  description: {
    de: 'Um den Tourismus im Alpstein zu beleben, ist der Bau einer Eisenbahn von dem auf 870 Metern gelegenen Wasserauen hinauf zum 2500 Meter hohen Säntis vorgesehen. Es wäre bereits eine bedeutende Leistung, wenn diese erste Etappe bis zum Seealpsee mit den begrenzten Mitteln verwirklicht werden könnte. Auf dieser Strecke soll eine Schmalspurbahn eingesetzt werden, die teilweise durch Zahnradunterstützung ergänzt wird.',
    en: 'To invigorate tourism in the Alpstein region, the construction of a railway from the 870-meter-high Wasserauen to the 2500-meter-high Säntis is proposed. It would already be a significant achievement if this first stage to the Seealpsee could be realized within the limited budget. A narrow-gauge railway is to be employed along this route, supplemented in part by cogwheel support.',
  },
  type: 'cogRailway',
  start: {
    x: 7442,
    y: 2226,
  },
  end: {
    x: 4855,
    y: 4577,
  },
  budget: 450000,
  costs: {
    tunnelMeter: 7,
    tunnelDepthFactor: 1,
    bridgeMeter: 5,
    bridgeHeightFactor: 5,
    groundMeter: 2,
    groundSlopeFactor: 20,
  },
  limits: {
    minRadius: 50,
    maxGradient: 15,
    maxVariance: null,
    minGap: 10,
  },
};
