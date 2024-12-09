export default {
  id: 'jungfraubahn-scheidegg-jungfraujoch',
  map: 'jungfrau',
  name: {
    'de': 'Jungfraubahn IV: Jungfraujoch',
    'en': 'Jungfraubahn IV: Jungfraujoch'
  },
  description: {
    'de': 'Von der kleinen Scheidegg auf 2000 Metern soll der anspruchsvollste Abschnitt beginnen: ein Weg durch die Eiger-Nordwand hinauf zum 3500 Meter hohen Jungfraujoch. Angesichts des extremen Geländes sind lange Tunnel unvermeidlich. Um das Budget zu wahren, sollen regelmäßige Tunnelöffnungen eingeplant werden, die der Materialentsorgung dienen.',
    'en': 'From the elevation of 2000 meters at the Kleine Scheidegg, the most arduous phase of construction is to commence: a passage through the formidable North Face of the Eiger, ascending to the Jungfraujoch at a towering height of 3500 meters. Given the extreme nature of the terrain, the endeavor necessitates the creation of extended tunnels. To preserve the allotted budget, it is deemed prudent to incorporate regular tunnel openings for the disposal of excavated material.'
  },
  type: 'cogRailroad',
  start: {
    x: 4113,
    y: 2792
  },
  end: {
    x: 5528,
    y: 6938
  },
  budget: 16000000,
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
    maxGradient: 25,
    maxVariance: null,
    minGap: 10
  }
};