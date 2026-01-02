export default {
  id: 'furkastrasse-gletsch-furkapass',
  map: 'furka',
  dependsOn: 'furkastrasse-oberwald-gletsch',
  name: {
    de: 'Furkastraße II: Gletsch - Furkapass',
    en: 'Furka road II: Gletsch - Furkapass',
  },
  description: {
    de: 'Nachdem Gletsch erreicht ist, stehen uns nunmehr die letzten 650 Höhenmeter bis zum Furkapass bevor. Hinsichtlich der Streckenführung bieten sich verschiedene Optionen dar. Wir vertrauen jedoch auf Ihre geschätzte Erfahrung, dass Sie nicht nur die Kosten im Auge behalten, sondern auch eine Route wählen werden, welche vermögende Reisende in unsere Region zu ziehen vermag. Gleichwohl darf eine Steigung von 12 Prozent keinesfalls überschritten werden.',
    en: 'Having reached Gletsch, the remaining 650 meters of elevation to the Furka Pass now lie ahead. Several routes are available for the ascent, but we are confident that your esteemed expertise will not only consider the costs but also select a path that attracts affluent tourists to our region. Nevertheless, a gradient of 12 percent must not be exceeded under any circumstances.',
  },
  type: 'road',
  difficulty: 'medium',
  start: {
    x: 3694,
    y: 4058,
  },
  end: {
    x: 7821,
    y: 2845,
  },
  budget: 1000000,
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
