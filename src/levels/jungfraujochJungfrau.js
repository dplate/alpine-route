export default {
  id: 'jungfraujoch-jungfrau',
  map: 'jungfrau',
  name: {
    'de': 'Jungfraubahn IV: Jungfrau',
    'en': 'Jungfraubahn IV: Jungfrau'
  },
  description: {
    'de': 'Die Bahn hinauf zum Jungfraujoch erfreut sich bereits größter Anerkennung und Beliebtheit bei Besuchern aus aller Welt, ein wahrhaft bemerkenswerter Erfolg. Es wird Ihnen nunmehr anvertraut, die letzte Etappe zu konzipieren, welche die verbleibenden 600 Höhenmeter zum Gipfel der ehrwürdigen Jungfrau, die in stolzer Höhe von 4100 Metern thront, zu überwinden hat. Dank der jüngst verbesserten Zahnradtechnik, welche nun Steigungen von bis zu 30 Prozent ermöglicht, steht Ihnen ein bedeutendes Hilfsmittel zur Verfügung, um den Streckenverlauf zu gestalten.',
    'en': 'The railway to the Jungfraujoch has already garnered widespread acclaim and popularity among visitors from across the globe, a truly remarkable success. You are now entrusted with the task of designing the final stretch, ascending the remaining 600 meters to the summit of the venerable Jungfrau, towering at an impressive height of 4100 meters. With the recent advancements in rack-and-pinion technology, allowing for gradients of up to 30 percent, you are afforded a significant advantage in planning the course of this ambitious route with precision and ingenuity.'
  },
  type: 'cogRailroad',
  start: {
    x: 5444,
    y: 6944
  },
  end: {
    x: 4245,
    y: 8028
  },
  budget: 2500000,
  costs: {
    tunnelMeter: 7,
    tunnelDepthFactor: 1,
    bridgeMeter: 5,
    bridgeHeightFactor: 50,
    groundMeter: 2,
    groundSlopeFactor: 100
  },
  limits: {
    minRadius: 100,
    maxGradient: 30,
    maxVariance: null,
    minGap: 10
  }
};