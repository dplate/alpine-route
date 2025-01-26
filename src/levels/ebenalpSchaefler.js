export default {
  id: 'ebenalp-schaefler',
  map: 'saentis',
  name: {
    de: 'Pfad auf den Schäfler',
    en: 'Mule track onto Schäfler',
  },
  description: {
    de: 'Um ein Gasthaus auf dem Gipfel des Schäflers zu errichten, ist es unumgänglich, einen ausgebauten Weg von der Ebenalp hinauf zu schaffen. Dieser Weg darf nicht zu steil sein, damit auch Lasttiere mit schweren Beladungen ihn mühelos bewältigen können. Es ist außerdem von größter Wichtigkeit, dass die Kosten für die Anlage dieses Weges möglichst gering gehalten werden, da der Großteil der Mittel für den eigentlichen Bau des Gasthauses benötigt wird.',
    en: 'To construct an inn on the summit of Schäfler, it is essential to build an improved path leading up from Ebenalp. This path must not be too steep, so that pack animals bearing heavy loads can traverse it with ease. Additionally, it is of utmost importance that the costs for the construction of this path be kept as low as possible, as the majority of funds will be required for the actual building of the inn.',
  },
  type: 'muleTrack',
  start: {
    x: 6198,
    y: 2327,
  },
  end: {
    x: 4711,
    y: 3216,
  },
  budget: 25000,
  costs: {
    tunnelMeter: 7,
    tunnelDepthFactor: 1,
    bridgeMeter: 5,
    bridgeHeightFactor: 5,
    groundMeter: 0.1,
    groundSlopeFactor: 20,
  },
  limits: {
    minRadius: null,
    maxGradient: 25,
    maxVariance: null,
    minGap: 2,
  },
};
