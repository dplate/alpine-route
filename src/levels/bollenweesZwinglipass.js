export default {
  id: 'bollenwees-zwinglipass',
  map: 'saentis',
  name: {
    'de': 'Pfad zum Zwinglipass',
    'en': 'Mule track to Zwinglipass'
  },
  description: {
    'de': 'Der Wirt der kleinen Zwinglipass Hütte wünscht sich einen Zugang, der auch für Maultiere begehbar ist. Dieser soll beim gut erschlossenen Gasthaus Bollenwees beginnen und etwa 550 Höhenmeter durch den Alpstein hinaufführen. Erfreulicherweise müssen keine Schluchten überwunden oder Tunnel gebaut werden, wodurch das Projekt kostengünstig bleibt. Eine sparsame Umsetzung ist jedoch von großer Bedeutung.',
    'en': 'The hutkeeper of the small Zwinglipass Hut desires an accessible path for mules. This path should start at the well-established Bollenwees Inn and ascend approximately 550 meters through the Alpstein. Fortunately, there are no gorges to cross or tunnels to build, making the project cost-effective. However, careful and economical execution is essential.'
  },
  type: 'muleTrack',
  start: {
    x: 7317, 
    y: 5733
  },
  end: {
    x: 3783, 
    y: 7933
  },
  budget: 25000,
  costs: {
    tunnelMeter: 7,
    tunnelDepthFactor: 1,
    bridgeMeter: 5,
    bridgeHeightFactor: 5,
    groundMeter: 0.1,
    groundSlopeFactor: 20
  },
  limits: {
    minRadius: null,
    maxGradient: 25,
    maxVariance: null,
    minGap: 2
  }
};