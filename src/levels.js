export default [
  {
    id: 'saentisbahn-seealp-meglisalp',
    map: 'saentis',
    name: {
      'de': 'Säntisbahn: Standseilbahn zur Meglisalp',
      'en': 'Säntisbahn: Funicular to Meglisalp'
    },
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
      'de': 'Säntisbahn: Zahnradbahn auf den Gipfel',
      'en': 'Säntisbahn: Cog railroad to the peak'
    },
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