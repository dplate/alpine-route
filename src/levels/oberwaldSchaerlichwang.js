export default {
  id: 'oberwald-schaerlichwang',
  map: 'furka',
  name: {
    'de': 'Zugang zur Alp Schärlichwang',
    'en': 'Access to Alp Schärlichwang'
  },
  description: {
    'de': 'Bei Schärlichwang, einem abgelegenen Seitental unweit Oberwalds, hat man den Plan gefasst, eine Alp zu errichten. Es ist der Wunsch, dass die Kühe dort geweidet werden mögen und der anfallende Käse auf geeignete Weise ins Tal gelangt. Doch um dies zu ermöglichen, bedarf es eines begehbaren Pfades, auf welchem der Transport der Tiere und des Erzeugnisses vonstattengehen kann. Es gilt zu beachten, dass für aufwendige Bauarbeiten im Fels weder Mittel noch Möglichkeiten bereitstehen, weshalb der Weg, wo möglich, auf einfachstem Gelände zu verlaufen habe.',
    'en': 'In the secluded valley of Schärlichwang, near Oberwald, plans have been made to establish an alp. It is desired that cows may graze there, and that the cheese produced be transported down to the valley. However, to facilitate this, a walkable path is required, suitable for the movement of both cattle and goods. It must be noted that no funds are available for demanding construction works through rock, and thus, the path should, wherever possible, follow simpler terrain.'
  },
  type: 'muleTrack',
  start: {
    x: 3027, 
    y: 7130
  },
  end: {
    x: 5682, 
    y: 7631
  },
  budget: 20000,
  costs: {
    tunnelMeter: 7,
    tunnelDepthFactor: 1,
    bridgeMeter: 5,
    bridgeHeightFactor: 5,
    groundMeter: 0.1,
    groundSlopeFactor: 20
  },
  limits: {
    minRadius: null,
    maxGradient: 25,
    maxVariance: null,
    minGap: 2
  }
};