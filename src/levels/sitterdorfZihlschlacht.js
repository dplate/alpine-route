export default {
  id: 'sitterdorf-zihlschlacht',
  map: 'thurgau',
  dependsOn: null,
  name: {
    de: 'Saumpfad nach Sitterdorf',
    en: 'Path to Sitterdorf',
  },
  description: {
    de: 'Ein Obstbauer zu Zihlschlacht, gelegen im Thurgau, trägt das Anliegen vor, einen gangbaren und wohlgeebneten Weg zur Erleichterung des Abtransports seiner Äpfel mit Maultieren herzustellen. Dieser solle hinab ins Tal führen, zum besser erschlossenen Sitterdorf, welches in der Tiefe liegt. Doch er beklagt, dass für den Bau von Tunneln und hohen Brücken die nötigen finanziellen Mittel nicht gegeben seien. Es erscheine daher ratsam, eine möglichst gleichmäßige Steigung des Weges anzustreben, um den Anforderungen der Lasttiere gerecht zu werden und die Arbeit zu erleichtern.',
    en: 'An orchardist in Zihlschlacht, situated in the canton of Thurgau, expresses his desire for the construction of a passable and well-leveled path to facilitate the transport of his apples with mules. This path should descend into the valley, leading to the more accessible village of Sitterdorf below. However, he laments that the necessary funds for the construction of tunnels and lofty bridges are not available. Thus, it seems advisable to strive for a path with the most even gradient possible, so as to meet the demands of the pack animals and ease the labor involved.',
  },
  type: 'muleTrack',
  difficulty: 'easy',
  start: {
    x: 5971,
    y: 2037,
  },
  end: {
    x: 5159,
    y: 4284,
  },
  budget: 20000,
  costs: {
    tunnelMeter: 7,
    tunnelDepthFactor: 1,
    bridgeMeter: 4,
    bridgeHeightFactor: 5,
    groundMeter: 0.1,
    groundSlopeFactor: 20,
  },
  limits: {
    minRadius: null,
    maxGradient: 20,
    maxVariance: null,
    minGap: 2,
  },
};
