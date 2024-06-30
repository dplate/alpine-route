export default [
  {
    id: 'saentisbahn-wasserauen-seealp',
    map: 'saentis',
    name: {
      'de': 'Säntisbahn 1: Seealp',
      'en': 'Säntisbahn 1: Seealp'
    },
    description: {
      'de': 'Um den Tourismus im Alpstein zu beleben, ist der Bau einer Eisenbahn von dem auf 870 Metern gelegenen Wasserauen hinauf zum 2500 Meter hohen Säntis vorgesehen. Es wäre bereits eine bedeutende Leistung, wenn diese erste Etappe bis zum Seealpsee mit den begrenzten Mitteln verwirklicht werden könnte. Auf dieser Strecke soll eine Schmalspurbahn eingesetzt werden, die teilweise durch Zahnradunterstützung ergänzt wird.',
      'en': 'To invigorate tourism in the Alpstein region, the construction of a railway from the 870-meter-high Wasserauen to the 2500-meter-high Säntis is proposed. It would already be a significant achievement if this first stage to the Seealpsee could be realized within the limited budget. A narrow-gauge railway is to be employed along this route, supplemented in part by cogwheel support.'
    },
    type: 'cogRailroad',
    start: {
      x: 7442,
      y: 2226
    },
    end: {
      x: 4855,
      y: 4577   
    },
    budget: 450000,
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
      maxGradient: 30,
      maxVariance: 15,
      minGap: 10
    }
  },
  {
    id: 'saentisbahn-seealp-meglisalp',
    map: 'saentis',
    name: {
      'de': 'Säntisbahn 2: Meglisalp',
      'en': 'Säntisbahn 2: Meglisalp'
    },
    description: {
      'de': 'Nachdem wir endlich die Hochebene des malerischen Seealpsees erreicht haben, steht nun die Umsetzung des steilsten Abschnitts der Säntisbahn bevor: von der Seealp durch die Felswände hindurch bis zur Siedlung Meglisalp. Dies bedeutet eine Überwindung von 400 Höhenmetern auf kurzer Strecke, wofür wir den Bau einer Standseilbahn in Erwägung ziehen.',
      'en': 'Having at last reached the plateau of the picturesque Seealpsee, we now face the implementation of the steepest section of the Säntis Railway: from Seealp through the rock walls to the settlement of Meglisalp. This entails an ascent of 400 meters over a short distance, for which we have considered the construction of a funicular railway.'
    },
    type: 'funicular',
    start: {
      x: 4860,
      y: 4597
    },
    end: {
      x: 4537,
      y: 5307
    },
    budget: 220000,
    costs: {
      tunnelMeter: 7,
      tunnelDepthFactor: 1,
      bridgeMeter: 5,
      bridgeHeightFactor: 5,
      groundMeter: 2,
      groundSlopeFactor: 20
    },
    limits: {
      minRadius: 400,
      maxGradient: 60,
      maxVariance: 15,
      minGap: 10
    }
  },
  {
    id: 'saentisbahn-meglisalp-saentis',
    map: 'saentis',
    name: {
      'de': 'Säntisbahn 3: Gipfel',
      'en': 'Säntisbahn 3: Peak'
    },
    description: {
      'de': 'Nach dem erfolgreichen Betrieb der Säntisbahn von Wasserauen bis zur Meglisalp haben die ehrenwerten Investoren nunmehr genügend Geldmittel bereitgestellt, um die letzte Etappe auf den Gipfel des Säntis in Angriff zu nehmen. Angesichts der beträchtlichen Länge der Strecke sowie der mehr als tausend Höhenmeter, ist hier die Errichtung einer durchgängigen Zahnradbahn unumgänglich. Ferner wird es am Gipfel notwendig sein, längere Tunnelbauten zu errichten, um das felsige Gelände zu überwinden.',
      'en': 'Following the successful operation of the Säntisbahn from Wasserauen to Meglisalp, the honorable investors have now provided sufficient funds to undertake the final stage to the summit of Säntis. In view of the considerable length of the route and the elevation gain of over one thousand meters, the construction of a continuous cog railway is indispensable. Furthermore, it will be necessary to construct longer tunnels at the summit to overcome the rocky terrain.'
    },
    type: 'cogRailroad',
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