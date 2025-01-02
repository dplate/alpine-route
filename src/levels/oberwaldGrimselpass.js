export default {
  id: 'oberwald-grimselpass',
  map: 'furka',
  name: {
    de: 'Saumpfad Grimselpass',
    en: 'Grimsel Pass mule track',
  },
  description: {
    de: 'Es wäre von großem Nutzen, einen Warentransport über den Grimselpass zu ermöglichen, da dieser reichlichen Gewinn verspricht. Wir ersuchen Euch daher, die Planung eines Saumpfades von Oberwald zum Grimselpass zu übernehmen. Der Weg soll so beschaffen sein, dass er für Maultiere leicht begehbar ist und nicht allzu steil verläuft.',
    en: 'The transport of goods over the Grimsel Pass offers a promising opportunity for considerable profit. Therefore, we request that you undertake the planning of a mule path from Oberwald to the Grimsel Pass. The path must be designed to ensure easy passage for mules and should not be overly steep.',
  },
  type: 'muleTrack',
  start: {
    x: 2814,
    y: 7095,
  },
  end: {
    x: 1850,
    y: 4112,
  },
  budget: 35000,
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
