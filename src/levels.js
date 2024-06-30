export default [
  {
    id: 'saentisbahn-seealp-meglisalp',
    map: 'saentis',
    name: {
      'de': 'Säntisbahn 2: Meglisalp',
      'en': 'Säntisbahn 2: Meglisalp'
    },
    description: {
      'de': '',
      'en': ''
    },
    type: 'funicular',
    start: {
      x: 4860,
      y: 4597
    },
    end: {
      x: 4537,
      y: 5307
    },
    budget: 700000,
    costs: {
      tunnelMeter: 7,
      tunnelDepthFactor: 1,
      bridgeMeter: 5,
      bridgeHeightFactor: 5,
      groundMeter: 2,
      groundSlopeFactor: 20
    },
    limits: {
      minRadius: 50,
      maxGradient: 40,
      maxVariance: 15,
      minGap: 10
    }
  },
  {
    id: 'saentisbahn-meglisalp-saentis',
    map: 'saentis',
    name: {
      'de': 'Säntisbahn 3: Gipfel',
      'en': 'Säntisbahn 3: Peak'
    },
    description: {
      'de': 'Nach dem erfolgreichen Betrieb der Säntisbahn von Wasserauen bis zur Meglisalp, haben die Investoren nun genügend Geld zur Verfügung gestellt, um die letzte Etappe auf den Gipfel des Säntis anzugehen. Aufgrund der Länge und der Steigung (insbesondere vor dem Gipfel) kommt hier nur eine Zahnradbahn in Frage. Ebenso werden beim Gipfel wohl längere Tunnelbauten notwendig sein, um das felsige Gelände zur überwinden.',
      'en': 'Following the successful operation of the Säntisbahn from Wasserauen to Meglisalp, the investors have now made enough money available to tackle the final stage to the summit of the Säntis. Due to the length and the gradient (especially before the summit), only a cog railroad is an option here. Longer tunnels will probably also be necessary at the summit to overcome the rocky terrain.'
    },
    type: 'cogRailroad',
    start: {
      x: 4423,
      y: 5385
    },
    end: {
      x: 1097,
      y: 6289
    },
    budget: 700000,
    costs: {
      tunnelMeter: 7,
      tunnelDepthFactor: 1,
      bridgeMeter: 5,
      bridgeHeightFactor: 5,
      groundMeter: 2,
      groundSlopeFactor: 20
    },
    limits: {
      minRadius: 50,
      maxGradient: 40,
      maxVariance: 15,
      minGap: 10
    }
  }
];