export default {
  id: 'berguen-albula',
  map: 'albula',
  name: {
    de: 'Albula - Passstraße',
    en: 'Albula - pass road',
  },
  description: {
    de: 'Über den Albulapass soll eine Postkutschen-Linie von Davos nach St. Moritz eingerichtet werden, wofür ein für Gespanne befahrbarer Weg von Bergün auf den Pass vonnöten ist. Die geplante gepflasterte Straße darf dabei eine maximale Steigung von 12 Prozent nicht überschreiten. Es ist zu erwarten, dass durch eine wohlbedachte Streckenführung auf den Bau hoher Brücken und langer Tunnel verzichtet werden kann, wodurch die Kosten erheblich reduziert würden.',
    en: 'A stagecoach line is to be established over the Albula Pass, connecting Davos to St. Moritz, necessitating a road passable for teams of horses from Bergün to the pass. The planned paved road must not exceed a maximum gradient of 12 percent. It is anticipated that, through a well-considered route, the construction of high bridges and long tunnels can likely be avoided, thereby significantly reducing costs.',
  },
  type: 'road',
  start: {
    x: 711,
    y: 437,
  },
  end: {
    x: 7849,
    y: 5410,
  },
  budget: 1300000,
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
