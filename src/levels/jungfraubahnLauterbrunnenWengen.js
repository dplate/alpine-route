export default {
  id: 'jungfraubahn-lauterbrunnen-wengen',
  map: 'jungfrau',
  name: {
    'de': 'Jungfraubahn I: Wengen',
    'en': 'Jungfraubahn I: Wengen'
  },
  description: {
    'de': 'Wir hegen einen kühnen Gedanken, welcher wohl an Wahnsinn grenzen mag: Eine Eisenbahn hinauf zur ehrfurchtgebietenden Höhe der Jungfrau von 4100 Metern! Als erste Etappe unseres gewagten Vorhabens bedürfen wir einer Zahnradstrecke, welche aus dem malerischen Lauterbrunnental 400 Meter hinauf zu dem beschaulichen Örtchen Wengen führen soll. Uns ist wohl bewusst, dass zur Überwindung der steil aufragenden Felswand einige Tunnel und Brücken vonnöten sein werden. Gleichwohl vertrauen wir darauf, dass die technische Meisterschaft unserer Zeit auch solche Herausforderungen mit Erfolg zu meistern vermag.',
    'en': 'We harbor a daring notion, one that might well border on madness: a railway ascending to the awe-inspiring height of the Jungfrau at 4100 meters! The first stage of this bold endeavor requires a cog railway to rise 400 meters from the picturesque Lauterbrunnen Valley to the quaint village of Wengen. We are fully aware that overcoming the steep rock face will necessitate the construction of several tunnels and bridges. Nevertheless, we place our trust in the technical ingenuity of our age to surmount even such formidable challenges with success.'
  },
  type: 'cogRailway',
  start: {
    x: 253, 
    y: 2322
  },
  end: {
    x: 953, 
    y: 558
  },
  budget: 650000,
  costs: {
    tunnelMeter: 7,
    tunnelDepthFactor: 1,
    bridgeMeter: 5,
    bridgeHeightFactor: 5,
    groundMeter: 2,
    groundSlopeFactor: 20
  },
  limits: {
    minRadius: 60,
    maxGradient: 20,
    maxVariance: null,
    minGap: 10
  }
};