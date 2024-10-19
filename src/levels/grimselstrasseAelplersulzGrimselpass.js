export default {
  id: 'grimselstrasse-aelplersulz-grimselpass',
  map: 'furka',
  name: {
    'de': 'Grimselstraße: Nordaufstieg',
    'en': 'Grimsel road: North ascent'
  },
  description: {
    'de': 'Es wurde bereits eine Zufahrt von Meiringen nach Älpersulz auf 1700 Meter Höhe angelegt, um den Bau einer befahrbaren Straße über den Grimselpass voranzubringen. Nun fehlen jedoch noch die letzten 450 Höhenmeter bis zur Passhöhe, und um diese Strecke zu bewältigen, müssen drei Steilstufen überwunden werden, wofür wahrscheinlich Serpentinen angelegt werden müssen. Zu diesem Zweck bitten wir Euch nun um Eure Unterstützung, damit dieses wichtige Vorhaben erfolgreich abgeschlossen werden kann.',
    'en': 'A route from Meiringen to Älpersulz, reaching an altitude of 1700 meters, has already been established in the effort to construct a passable road over the Grimsel Pass. However, the final 450 meters to the summit remain, and in order to overcome this section, three steep gradients must be surmounted, likely requiring the construction of switchbacks. For this reason, we now humbly ask for your assistance, so that this important undertaking may be successfully brought to completion.'
  },
  type: 'road',
  start: {
    x: 900, 
    y: 168
  },
  end: {
    x: 1965, 
    y: 4045
  },
  budget: 700000,
  costs: {
    tunnelMeter: 10,
    tunnelDepthFactor: 1,
    bridgeMeter: 7,
    bridgeHeightFactor: 5,
    groundMeter: 2,
    groundSlopeFactor: 20
  },
  limits: {
    minRadius: 8,
    maxGradient: 12,
    maxVariance: null,
    minGap: 5
  }
};