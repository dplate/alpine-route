export default {
  id: 'furka-bergstrecke',
  map: 'furka',
  name: {
    de: 'Furka Bergstrecke',
    en: 'Furka Railway',
  },
  description: {
    de: 'Ich möchte Ihnen hiermit mitteilen, dass die Bergstrecke von Realp hinauf zum Scheiteltunnel unter dem Furkapass bereits fertiggestellt wurde. Auch der Bau des Scheiteltunnels ist schon in vollem Gange und kommt gut voran. Nun möchten wir Sie bitten, die Planung der Strecke von Oberwald hinauf zum Tunneleingang bei Muttbach-Belvédère zu übernehmen. Auf dieser Strecke sind 750 Höhenmeter zu überwinden, was mit einer Zahnradbahn bei maximal 11% Steigung erreicht werden soll.',
    en: 'I wish to inform you that the mountain section from Realp up to the summit tunnel beneath the Furka Pass has already been completed. The construction of the summit tunnel is also well underway and progressing smoothly. We would now kindly ask you to take on the planning of the section from Oberwald up to the tunnel entrance at Muttbach-Belvédère. This stretch will require the ascent of 750 meters in altitude, to be achieved with a cog railway with a maximum incline of 11%.',
  },
  type: 'cogRailway',
  start: {
    x: 2495,
    y: 7354,
  },
  end: {
    x: 7203,
    y: 3422,
  },
  budget: 1700000,
  costs: {
    tunnelMeter: 7,
    tunnelDepthFactor: 1,
    bridgeMeter: 5,
    bridgeHeightFactor: 5,
    groundMeter: 2,
    groundSlopeFactor: 20,
  },
  limits: {
    minRadius: 70,
    maxGradient: 11,
    maxVariance: null,
    minGap: 10,
  },
};
