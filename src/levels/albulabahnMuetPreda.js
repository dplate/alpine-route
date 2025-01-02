export default {
  id: 'albulabahn-muet-preda',
  map: 'albula',
  name: {
    de: 'Albulabahn II: Muet - Preda',
    en: 'Albulabahn II: Muet - Preda',
  },
  description: {
    de: 'Nachdem die ersten zweihundert Höhenmeter von Bergün nach Muet mit einer wahrhaft einfallsreichen Streckenführung überwunden worden sind, so erachten wir es als durchaus möglich, auch die nächsten zweihundert Höhenmeter nach Preda auf ähnliche Weise zu bewältigen. Da die Distanz, die hierbei zurückzulegen ist, wiederum als äußerst gering erscheint und ebenfalls nur eine Steigung von fünfunddreißig Promille gestattet ist, wird es notwendig sein, auch für diesen Abschnitt eine ebenso originelle und sorgfältig durchdachte Streckenführung zu ersinnen.',
    en: 'After the first two hundred meters of elevation from Bergün to Muet were surmounted with a truly ingenious route, we deem it entirely possible to overcome the next two hundred meters of elevation to Preda in a similar manner. Given that the distance to be covered is again quite short and only a gradient of thirty-five per mille is permitted, it will be necessary to devise an equally original and carefully considered route for this section as well.',
  },
  type: 'narrowGaugeRailway',
  start: {
    x: 1656,
    y: 2833,
  },
  end: {
    x: 2813,
    y: 4554,
  },
  budget: 3000000,
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
