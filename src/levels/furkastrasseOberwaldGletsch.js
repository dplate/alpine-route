export default {
  id: 'furkastrasse-oberwald-gletsch',
  map: 'furka',
  name: {
    'de': 'Furkastraße I: Oberwald - Gletsch',
    'en': 'Furka road I: Oberwald - Gletsch'
  },
  description: {
    'de': 'Es soll endlich gelingen, den Furkapass von Westen her durch eine Straße zu erschließen. Der erste zu planende Abschnitt wird von Oberwald aus 400 Meter hinauf zur Zunge des Rhonegletschers führen. Da für die schweren Postkutschen ein Anstieg von maximal 12 Prozent möglich ist, werden Serpentinen unvermeidlich sein. So soll die Trasse geschickt durch das steile Gelände geleitet werden, um den Aufstieg zu erleichtern und dieses ehrgeizige Vorhaben zu verwirklichen.',
    'en': 'The long-awaited plan to finally connect the Furka Pass from the west with a road is now set in motion. The first section to be designed will extend 400 meters from the village of Oberwald up to the tongue of the Rhone Glacier. Given that the heavy stagecoaches can handle a maximum incline of 12 percent, the use of switchbacks will be unavoidable. Thus, the route must be skillfully laid out through the steep terrain to ease the ascent and bring this ambitious endeavor to fruition.'
  },
  type: 'road',
  start: {
    x: 2949, 
    y: 7031
  },
  end: {
    x: 3694, 
    y: 4058
  },
  budget: 500000,
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