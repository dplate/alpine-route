export default {
  id: 'jungfraujoch-moenchsjochhuette',
  map: 'jungfrau',
  name: {
    'de': 'Gletscherpfad zur Mönchsjochhütte',
    'en': 'Glacier trail to the Mönchsjoch Hut'
  },
  description: {
    'de': 'Es ist beabsichtigt, auf dem 3600 Meter hohen Mönchsjoch eine Hütte zu errichten. Der Weg dorthin soll vom Bahnhof Jungfraujoch über den Gletscher geführt werden, wodurch er künftig auch von Touristen ohne besondere Affinität zum Bergsteigen begangen werden kann. Bei der Planung des Wegverlaufs erwarten wir keine größeren Schwierigkeiten.',
    'en': 'It is proposed to construct a hut upon the Mönchsjoch, at an elevation of 3,600 meters. The path leading from the Jungfraujoch railway station to this location is intended to traverse the glacier, thereby rendering it accessible even to those tourists who possess but little inclination for mountaineering. We foresee no significant obstacles in the planning of the path\'s course.'
  },
  type: 'muleTrack',
  start: {
    x: 5484, 
    y: 6963
  },
  end: {
    x: 7538, 
    y: 6101
  },
  budget: 9000,
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