export default {
  id: 'berguen-alp-da-tisch',
  map: 'albula',
  dependsOn: null,
  name: {
    de: 'Zugang zur Alp da Tisch',
    en: 'Access to Alp da Tisch',
  },
  description: {
    de: 'Um von Bergün aus die Alp im Val Tisch angemessen versorgen zu können, bedarf es eines Pfades, der sowohl für Kühe als auch für Lasttiere begehbar ist. Der Bau dieses Weges sollte jedoch nicht allzu kostspielig ausfallen, da lediglich bescheidene Mittel zur Verfügung stehen.',
    en: 'To adequately supply the Alp in Val Tisch from Bergün, a path that is passable for both cattle and pack animals is required. However, the construction of this path should not be overly expensive, as only modest funds are available.',
  },
  type: 'muleTrack',
  difficulty: 'medium',
  start: {
    x: 711,
    y: 437,
  },
  end: {
    x: 4328,
    y: 2213,
  },
  budget: 20000,
  costs: {
    tunnelMeter: 7,
    tunnelDepthFactor: 1,
    bridgeMeter: 5,
    bridgeHeightFactor: 5,
    groundMeter: 0.1,
    groundSlopeFactor: 20,
  },
  limits: {
    minRadius: null,
    maxGradient: 25,
    maxVariance: null,
    minGap: 2,
  },
};
