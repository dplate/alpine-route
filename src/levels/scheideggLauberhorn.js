export default {
  id: 'scheidegg-lauberhorn',
  map: 'jungfrau',
  name: {
    de: 'Lauberhornbahn',
    en: 'Lauberhornbahn',
  },
  description: {
    de: 'Zur Förderung des Wintersports im Bereich der kleinen Scheidegg wird der Bau einer Standseilbahn zum 2400 Meter hohen Lauberhorn in Erwägung gezogen. Es wird daher gebeten, einen Streckenplan zu erstellen, um die Machbarkeit dieses Projekts zu prüfen. Besondere Aufmerksamkeit ist dabei auf eine möglichst gleichmäßige Steigung entlang der Strecke zu richten, da diese für einen reibungslosen Betrieb von großer Bedeutung ist. Ebenso ist der große minimale Kurvenradius zu berücksichtigen, welcher für die Bauweise und Funktion einer Standseilbahn unerlässlich ist.',
    en: 'To promote winter sports in the vicinity of the Kleine Scheidegg, the construction of a funicular railway to the 2400-meter-high Lauberhorn is under consideration. It is therefore requested that a route plan be prepared to assess the feasibility of this undertaking. Particular attention must be paid to ensuring a consistent gradient along the route, as this is of great importance for smooth operation. Equally essential is the consideration of a large minimum curve radius, which is fundamental to the design and functionality of a funicular railway.',
  },
  type: 'funicular',
  start: {
    x: 4038,
    y: 2714,
  },
  end: {
    x: 3032,
    y: 1934,
  },
  budget: 175000,
  costs: {
    tunnelMeter: 7,
    tunnelDepthFactor: 1,
    bridgeMeter: 5,
    bridgeHeightFactor: 5,
    groundMeter: 2,
    groundSlopeFactor: 20,
  },
  limits: {
    minRadius: 400,
    maxGradient: 60,
    maxVariance: 15,
    minGap: null,
  },
};
