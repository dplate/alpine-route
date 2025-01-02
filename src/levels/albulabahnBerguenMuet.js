export default {
  id: 'albulabahn-berguen-muet',
  map: 'albula',
  name: {
    de: 'Albulabahn I: Bergün - Muet',
    en: 'Albulabahn I: Bergün - Muet',
  },
  description: {
    de: 'Über den Albula soll der Kurort St. Moritz von Norden her mit einer Bahn erschlossen werden. Da auch schwere Güterzüge zum Einsatz kommen sollen, darf die Schmalspurstrecke nur eine geringe Steigung von 35 Promille aufweisen. Um dieses schwierige Unterfangen zu vollbringen, haben wir das Vorhaben in drei Bauvorhaben gegliedert. Zuerst stehen die etwa 200 Höhenmeter vom Orte Bergün nach Muet an. Aufgrund der kurzen Entfernung werden wohl aufwändige Serpentinen erforderlich sein, welche auch einiges an Kosten verursachen dürften.',
    en: 'It is intended to establish a railway connection over the Albula to reach the spa town of St. Moritz from the north. As heavy freight trains are also to be employed, the narrow-gauge track must have a gradient of no more than 35 per mille. To accomplish this arduous endeavor, we have divided the project into three construction phases. The first phase involves overcoming the approximately 200 meters of elevation from the village of Bergün to Muet. Due to the short distance, elaborate switchbacks will likely be necessary, which are expected to incur considerable costs.',
  },
  type: 'narrowGaugeRailway',
  start: {
    x: 850,
    y: 231,
  },
  end: {
    x: 1656,
    y: 2833,
  },
  budget: 1500000,
  costs: {
    tunnelMeter: 7,
    tunnelDepthFactor: 0.75,
    bridgeMeter: 5,
    bridgeHeightFactor: 5,
    groundMeter: 2,
    groundSlopeFactor: 20,
  },
  limits: {
    minRadius: 100,
    maxGradient: 3.5,
    maxVariance: null,
    minGap: 10,
  },
};
