export default [
  {
    id: 'ebenalp-schaefler',
    map: 'saentis',
    name: {
      'de': 'Pfad auf den Schäfler',
      'en': 'Mule track onto Schäfler'
    },
    description: {
      'de': 'Um ein Gasthaus auf dem Gipfel des Schäflers zu errichten, ist es unumgänglich, einen ausgebauten Weg von der Ebenalp hinauf zu schaffen. Dieser Weg darf nicht zu steil sein, damit auch Lasttiere mit schweren Beladungen ihn mühelos bewältigen können. Es ist außerdem von größter Wichtigkeit, dass die Kosten für die Anlage dieses Weges möglichst gering gehalten werden, da der Großteil der Mittel für den eigentlichen Bau des Gasthauses benötigt wird.',
      'en': 'To construct an inn on the summit of Schäfler, it is essential to build an improved path leading up from Ebenalp. This path must not be too steep, so that pack animals bearing heavy loads can traverse it with ease. Additionally, it is of utmost importance that the costs for the construction of this path be kept as low as possible, as the majority of funds will be required for the actual building of the inn.'
    },
    type: 'muleTrack',
    start: {
      x: 6198, 
      y: 2327
    },
    end: {
      x: 4711, 
      y: 3216
    },
    budget: 15000,
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
  },
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
      maxGradient: 15,
      maxVariance: null,
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
    budget: 230000,
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
  },
  {
    id: 'bollenwees-zwinglipass',
    map: 'saentis',
    name: {
      'de': 'Pfad zum Zwinglipass',
      'en': 'Mule track to Zwinglipass'
    },
    description: {
      'de': 'Der Wirt der kleinen Zwinglipass Hütte wünscht sich einen Zugang, der auch für Maultiere begehbar ist. Dieser soll beim gut erschlossenen Gasthaus Bollenwees beginnen und etwa 550 Höhenmeter durch den Alpstein hinaufführen. Erfreulicherweise müssen keine Schluchten überwunden oder Tunnel gebaut werden, wodurch das Projekt kostengünstig bleibt. Eine sparsame Umsetzung ist jedoch von großer Bedeutung.',
      'en': 'The hutkeeper of the small Zwinglipass Hut desires an accessible path for mules. This path should start at the well-established Bollenwees Inn and ascend approximately 550 meters through the Alpstein. Fortunately, there are no gorges to cross or tunnels to build, making the project cost-effective. However, careful and economical execution is essential.'
    },
    type: 'muleTrack',
    start: {
      x: 7317, 
      y: 5733
    },
    end: {
      x: 3783, 
      y: 7933
    },
    budget: 25000,
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
  },
  {
    id: 'albulabahn-berguen-muet',
    map: 'albula',
    name: {
      'de': 'Albulabahn 1: Bergün - Muet',
      'en': 'Albulabahn 1: Bergün - Muet'
    },
    description: {
      'de': 'Über den Albula soll der Kurort St. Moritz von Norden her mit einer Bahn erschlossen werden. Da auch schwere Güterzüge zum Einsatz kommen sollen, darf die Schmalspurstrecke nur eine geringe Steigung von 35 Promille aufweisen. Um dieses schwierige Unterfangen zu vollbringen, haben wir das Vorhaben in drei Bauvorhaben gegliedert. Zuerst stehen die etwa 200 Höhenmeter vom Orte Bergün nach Muet an. Aufgrund der kurzen Entfernung werden wohl aufwändige Serpentinen erforderlich sein, welche auch einiges an Kosten verursachen dürften.',
      'en': 'It is intended to establish a railway connection over the Albula to reach the spa town of St. Moritz from the north. As heavy freight trains are also to be employed, the narrow-gauge track must have a gradient of no more than 35 per mille. To accomplish this arduous endeavor, we have divided the project into three construction phases. The first phase involves overcoming the approximately 200 meters of elevation from the village of Bergün to Muet. Due to the short distance, elaborate switchbacks will likely be necessary, which are expected to incur considerable costs.'
    },
    type: 'narrowGaugeRailroad',
    start: {
      x: 850, 
      y: 231
    },
    end: {
      x: 1656,
      y: 2833
    },
    budget: 1800000,
    costs: {
      tunnelMeter: 7,
      tunnelDepthFactor: 1,
      bridgeMeter: 5,
      bridgeHeightFactor: 5,
      groundMeter: 2,
      groundSlopeFactor: 20
    },
    limits: {
      minRadius: 100,
      maxGradient: 3.5,
      maxVariance: null,
      minGap: 10
    }
  },
];