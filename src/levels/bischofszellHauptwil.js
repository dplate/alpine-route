export default {
  id: 'bischofszell-hauptwil',
  map: 'thurgau',
  name: {
    de: 'Straße nach Hauptwil',
    en: 'Road to Hauptwil',
  },
  description: {
    de: 'In Hauptwil ist der Plan gefasst, eine Textilfärberei zu errichten. Zu diesem Zwecke bedarf es einer Straße, welche es gestattet, das notwendige Baumaterial aus Bischofszell heranzuschaffen. Es wird hervorgehoben, dass die Steigung der Straße nicht zu groß sein dürfe, damit das schwere Baumaterial mit Pferdekarren sicher und ohne übermäßige Mühsal transportiert werden kann.',
    en: 'In Hauptwil, plans have been made to establish a textile dyeing facility. For this purpose, a road is required to bring the necessary building materials from Bischofszell. It is emphasized that the gradient of the road must not be too steep, so that the heavy materials can be transported safely and without undue hardship by horse-drawn carts.',
  },
  type: 'road',
  start: {
    x: 4684,
    y: 5271,
  },
  end: {
    x: 5615,
    y: 6971,
  },
  budget: 100000,
  costs: {
    tunnelMeter: 10,
    tunnelDepthFactor: 1,
    bridgeMeter: 7,
    bridgeHeightFactor: 5,
    groundMeter: 2,
    groundSlopeFactor: 20,
  },
  limits: {
    minRadius: 8,
    maxGradient: 12,
    maxVariance: null,
    minGap: 5,
  },
};
