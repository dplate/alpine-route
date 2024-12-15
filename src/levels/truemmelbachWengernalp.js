export default {
  id: 'truemmelbach-wengernalp',
  map: 'jungfrau',
  name: {
    'de': 'Weg zur Wengernalp',
    'en': 'Path to Wengernalp'
  },
  description: {
    'de': 'Die Wengernalp drängt auf die Schaffung eines direkten Zugangs aus dem Lauterbrunnental. Angesichts der Tatsache, dass das Tal von steilen und unwegsamen Felswänden umgeben ist, dürfte die Planung eines begehbaren Weges mit erheblichen Herausforderungen verbunden sein. Sollten Sie indes eine geeignete Route ausfindig machen, so böte sich diese auch als eine ansprechende Passage für wohlhabende Reisende an, welche mit Reittieren die eindrucksvollen Trümmelbachfälle aufsuchen könnten.',
    'en': 'The Wengernalp is desirous of establishing a direct access route from the Lauterbrunnen Valley. Given that the valley is flanked by precipitous and forbidding cliffs, the planning of a navigable path will undoubtedly prove a task of no small difficulty. Should you, however, succeed in identifying a suitable route, it may also serve as a charming passage for affluent travelers, who might, on horseback, seek to visit the magnificent Trümmelbach Falls.'
  },
  type: 'muleTrack',
  start: {
    x: 287, 
    y: 4453
  },
  end: {
    x: 2140, 
    y: 3782
  },
  budget: 50000,
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