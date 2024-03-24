export default [
  {
    id: 'saentisbahn-meglisalp-saentis',
    map: 'saentis',
    start: {
      x: 4522,
      y: 5237
    },
    end: {
      x: 1097,
      y: 6289
    },
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
      maxVariance: 20,
      minGap: 10
    }
  }
];