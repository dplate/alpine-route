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
    id: 'berguen-alp-da-tisch',
    map: 'albula',
    name: {
      'de': 'Zugang zur Alp da Tisch',
      'en': 'Access to Alp da Tisch'
    },
    description: {
      'de': 'Um von Bergün aus die Alp im Val Tisch angemessen versorgen zu können, bedarf es eines Pfades, der sowohl für Kühe als auch für Lasttiere begehbar ist. Der Bau dieses Weges sollte jedoch nicht allzu kostspielig ausfallen, da lediglich bescheidene Mittel zur Verfügung stehen.',
      'en': 'To adequately supply the Alp in Val Tisch from Bergün, a path that is passable for both cattle and pack animals is required. However, the construction of this path should not be overly expensive, as only modest funds are available.'
    },
    type: 'muleTrack',
    start: {
      x: 711, 
      y: 437
    },
    end: {
      x: 4328, 
      y: 2213
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
  },
  {
    id: 'berguen-albula',
    map: 'albula',
    name: {
      'de': 'Albula - Passstraße',
      'en': 'Albula - pass road'
    },
    description: {
      'de': 'Über den Albulapass soll eine Postkutschen-Linie von Davos nach St. Moritz eingerichtet werden, wofür ein für Gespanne befahrbarer Weg von Bergün auf den Pass vonnöten ist. Die geplante gepflasterte Straße darf dabei eine maximale Steigung von 12 Prozent nicht überschreiten. Es ist zu erwarten, dass durch eine wohlbedachte Streckenführung auf den Bau hoher Brücken und langer Tunnel verzichtet werden kann, wodurch die Kosten erheblich reduziert würden.',
      'en': 'A stagecoach line is to be established over the Albula Pass, connecting Davos to St. Moritz, necessitating a road passable for teams of horses from Bergün to the pass. The planned paved road must not exceed a maximum gradient of 12 percent. It is anticipated that, through a well-considered route, the construction of high bridges and long tunnels can likely be avoided, thereby significantly reducing costs.'
    },
    type: 'road',
    start: {
      x: 711, 
      y: 437
    },
    end: {
      x: 7849, 
      y: 5410
    },
    budget: 1300000,
    costs: {
      tunnelMeter: 10,
      tunnelDepthFactor: 1,
      bridgeMeter: 7,
      bridgeHeightFactor: 5,
      groundMeter: 2,
      groundSlopeFactor: 20
    },
    limits: {
      minRadius: 8,
      maxGradient: 12,
      maxVariance: null,
      minGap: 5
    }
  },
  {
    id: 'saentisbahn-wasserauen-seealp',
    map: 'saentis',
    name: {
      'de': 'Säntisbahn I: Seealp',
      'en': 'Säntisbahn I: Seealp'
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
      'de': 'Säntisbahn II: Meglisalp',
      'en': 'Säntisbahn II: Meglisalp'
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
      'de': 'Säntisbahn III: Gipfel',
      'en': 'Säntisbahn III: Peak'
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
      'de': 'Albulabahn I: Bergün - Muet',
      'en': 'Albulabahn I: Bergün - Muet'
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
    budget: 1500000,
    costs: {
      tunnelMeter: 7,
      tunnelDepthFactor: 0.75,
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
  {
    id: 'albulabahn-muet-preda',
    map: 'albula',
    name: {
      'de': 'Albulabahn II: Muet - Preda',
      'en': 'Albulabahn II: Muet - Preda'
    },
    description: {
      'de': 'Nachdem die ersten zweihundert Höhenmeter von Bergün nach Muet mit einer wahrhaft einfallsreichen Streckenführung überwunden worden sind, so erachten wir es als durchaus möglich, auch die nächsten zweihundert Höhenmeter nach Preda auf ähnliche Weise zu bewältigen. Da die Distanz, die hierbei zurückzulegen ist, wiederum als äußerst gering erscheint und ebenfalls nur eine Steigung von fünfunddreißig Promille gestattet ist, wird es notwendig sein, auch für diesen Abschnitt eine ebenso originelle und sorgfältig durchdachte Streckenführung zu ersinnen.',
      'en': 'After the first two hundred meters of elevation from Bergün to Muet were surmounted with a truly ingenious route, we deem it entirely possible to overcome the next two hundred meters of elevation to Preda in a similar manner. Given that the distance to be covered is again quite short and only a gradient of thirty-five per mille is permitted, it will be necessary to devise an equally original and carefully considered route for this section as well.'
    },
    type: 'narrowGaugeRailroad',
    start: {
      x: 1656,
      y: 2833
    },
    end: {
      x: 2813,
      y: 4554
    },
    budget: 3000000,
    costs: {
      tunnelMeter: 7,
      tunnelDepthFactor: 0.75,
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
  {
    id: 'albulabahn-preda-spinas',
    map: 'albula',
    name: {
      'de': 'Albulabahn III: Preda - Spinas',
      'en': 'Albulabahn III: Preda - Spinas'
    },
    description: {
      'de': 'Die aufwändig gestaltete Strecke nach Preda ist nun vollendet. Es erscheint indes wenig sinnvoll, weitere fünfhundert Höhenmeter hinauf auf den Albulapass zu erklimmen, da die Bahn auch während der Wintermonate in Betrieb sein soll, um die Reisenden sicher nach St. Moritz zu geleiten. Aus diesem Grunde wird nun eine beträchtliche Summe bereitgestellt, um den Bau eines langen Tunnels in das benachbarte Tal nach Spina zu verwirklichen. Nach den mühseligen zwei Etappen sollte dieser Abschnitt durch den Tunnel einfacher zu planen sein. Dennoch wird man darauf bedacht sein, die Tunnelstrecke so kurz wie möglich zu halten, um übermäßige Kosten zu vermeiden und die Bauzeit gering zu bemessen.',
      'en': 'The elaborate route to Preda is now complete. However, it seems unwise to ascend an additional five hundred meters to the Albula Pass, as the railway is intended to operate even during the winter months, bringing guests safely to St. Moritz. Therefore, a considerable sum of money is now being allocated to construct a long tunnel into the neighboring valley of Spina. After the challenging two stages, this section through the tunnel is expected to be easier to plan. Nevertheless, efforts will be made to keep the tunnel route as short as possible, in order to avoid excessive costs and minimize construction time.'
    },
    type: 'narrowGaugeRailroad',
    start: {
      x: 2813,
      y: 4554
    },
    end: {
      x: 7901,
      y: 7733
    },
    budget: 37000000,
    costs: {
      tunnelMeter: 7,
      tunnelDepthFactor: 0.75,
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
  {
    id: 'furkastrasse-oberwald-gletsch',
    map: 'furka',
    name: {
      'de': 'Furkastraße I: Oberwald - Gletsch',
      'en': 'Furka road I: Oberwald - Gletsch'
    },
    description: {
      'de': 'Es soll endlich gelingen, den Furkapass von Westen her durch eine Straße zu erschließen. Der erste zu planende Abschnitt wird von Oberwald aus 400 Meter hinauf zur Zunge des Rhonegletschers führen. Da für die schweren Postkutschen ein Anstieg von maximal 12 Prozent möglich ist, werden Serpentinen unvermeidlich sein. So soll die Trasse geschickt durch das steile Gelände geleitet werden, um den Aufstieg zu erleichtern und dieses ehrgeizige Vorhaben zu verwirklichen.',
      'en': 'The long-awaited plan to finally connect the Furka Pass from the west with a road is now set in motion. The first section to be designed will extend 400 meters from the village of Oberwald up to the tongue of the Rhone Glacier. Given that the heavy stagecoaches can handle a maximum incline of 12 percent, the use of switchbacks will be unavoidable. Thus, the route must be skillfully laid out through the steep terrain to ease the ascent and bring this ambitious endeavor to fruition.'
    },
    type: 'road',
    start: {
      x: 2949, 
      y: 7031
    },
    end: {
      x: 3694, 
      y: 4058
    },
    budget: 500000,
    costs: {
      tunnelMeter: 10,
      tunnelDepthFactor: 1,
      bridgeMeter: 7,
      bridgeHeightFactor: 5,
      groundMeter: 2,
      groundSlopeFactor: 20
    },
    limits: {
      minRadius: 8,
      maxGradient: 12,
      maxVariance: null,
      minGap: 5
    }
  },
  {
    id: 'furkastrasse-gletsch-furkapass',
    map: 'furka',
    name: {
      'de': 'Furkastraße II: Gletsch - Furkapass',
      'en': 'Furka road II: Gletsch - Furkapass'
    },
    description: {
      'de': 'Nachdem Gletsch erreicht ist, stehen uns nunmehr die letzten 650 Höhenmeter bis zum Furkapass bevor. Hinsichtlich der Streckenführung bieten sich verschiedene Optionen dar. Wir vertrauen jedoch auf Ihre geschätzte Erfahrung, dass Sie nicht nur die Kosten im Auge behalten, sondern auch eine Route wählen werden, welche vermögende Reisende in unsere Region zu ziehen vermag. Gleichwohl darf eine Steigung von 12 Prozent keinesfalls überschritten werden.',
      'en': 'Having reached Gletsch, the remaining 650 meters of elevation to the Furka Pass now lie ahead. Several routes are available for the ascent, but we are confident that your esteemed expertise will not only consider the costs but also select a path that attracts affluent tourists to our region. Nevertheless, a gradient of 12 percent must not be exceeded under any circumstances.'
    },
    type: 'road',
    start: {
      x: 3694, 
      y: 4058
    },
    end: {
      x: 7821, 
      y: 2845
    },
    budget: 1000000,
    costs: {
      tunnelMeter: 10,
      tunnelDepthFactor: 1,
      bridgeMeter: 7,
      bridgeHeightFactor: 5,
      groundMeter: 2,
      groundSlopeFactor: 20
    },
    limits: {
      minRadius: 8,
      maxGradient: 12,
      maxVariance: null,
      minGap: 5
    }
  },
  {
    id: 'grimselstrasse-gletsch-grimselpass',
    map: 'furka',
    name: {
      'de': 'Grimselstraße: Südaufstieg',
      'en': 'Grimsel road: South ascent'
    },
    description: {
      'de': 'Die Straße, welche von Norden zum Hospiz auf dem Grimselpass führt, hat sich bereits als großer Erfolg erwiesen. Doch sowohl Waren als auch Reisende müssen dort auf Maultiere umsatteln, um den steilen Abstieg ins Wallis zu bewältigen. Es ist nunmehr Ihre Aufgabe, diese Lücke zu schließen und eine Straße von Gletsch zum Grimselpass zu entwerfen. Auf kürzester Strecke sind dort 400 Höhenmeter zu überwinden; ohne zahlreiche Serpentinen wird es unmöglich sein, die maximal erlaubte Steigung von 12 Prozent einzuhalten.',
      'en': 'The road leading from the north to the hospice on the Grimsel Pass has already proven to be a great success. However, both goods and travelers must transfer to mules there to navigate the steep descent into the Valais. It is now your task to close this gap and design a road from Gletsch to the Grimsel Pass. On the shortest route, 400 meters of elevation must be overcome; without numerous switchbacks, it will be impossible to maintain the maximum allowable gradient of 12 percent.'
    },
    type: 'road',
    start: {
      x: 3694, 
      y: 4058
    },
    end: {
      x: 1965, 
      y: 4045
    },
    budget: 650000,
    costs: {
      tunnelMeter: 10,
      tunnelDepthFactor: 1,
      bridgeMeter: 7,
      bridgeHeightFactor: 5,
      groundMeter: 2,
      groundSlopeFactor: 20
    },
    limits: {
      minRadius: 8,
      maxGradient: 12,
      maxVariance: null,
      minGap: 5
    }
  },
];