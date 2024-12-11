export default {
  id: 'saentisbahn-meglisalp-saentis',
  map: 'saentis',
  name: {
    'de': 'Säntisbahn III: Gipfel',
    'en': 'Säntisbahn III: Peak'
  },
  description: {
    'de': 'Nach dem erfolgreichen Betrieb der Säntisbahn von Wasserauen bis zur Meglisalp haben die ehrenwerten Investoren nunmehr genügend Geldmittel bereitgestellt, um die letzte Etappe auf den Gipfel des Säntis in Angriff zu nehmen. Angesichts der beträchtlichen Länge der Strecke sowie der mehr als tausend Höhenmeter, ist hier die Errichtung einer durchgängigen Zahnradbahn unumgänglich. Ferner wird es am Gipfel notwendig sein, längere Tunnelbauten zu errichten, um das felsige Gelände zu überwinden.',
    'en': 'Following the successful operation of the Säntisbahn from Wasserauen to Meglisalp, the honorable investors have now provided sufficient funds to undertake the final stage to the summit of Säntis. In view of the considerable length of the route and the elevation gain of over one thousand meters, the construction of a continuous cog railway is indispensable. Furthermore, it will be necessary to construct longer tunnels at the summit to overcome the rocky terrain.'
  },
  type: 'cogRailway',
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
};