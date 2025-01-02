export default {
  id: 'jungfraubahn-alpiglen-scheidegg',
  map: 'jungfrau',
  name: {
    de: 'Jungfraubahn III: Kleine Scheidegg Ost',
    en: 'Jungfraubahn III: Kleine Scheidegg Ost',
  },
  description: {
    de: 'Für den weiteren anspruchsvollen Bau der Bahn hinauf zur Jungfrau mangelt es uns leider an den notwendigen finanziellen Mitteln. Daher gedenken wir zunächst, weitere Einnahmen durch den Anschluss Grindelwalds an die Kleine Scheidegg zu erzielen. Bis zum Berghaus Alpiglen wurde bereits eine Zahnradbahn errichtet. Die Planung der weiteren 400 zu überwindenden Höhenmeter sei nun Euch anvertraut. Diese Aufgabe erscheint nicht von großer Schwierigkeit, doch stehen für die Ausführung lediglich bescheidene Geldmittel zur Verfügung. Wir vertrauen auf Eure Umsicht, dieses Werk mit kluger Hand und sparsamer Führung zu vollenden.',
    en: 'For the further arduous construction of the railway to the Jungfrau, we unfortunately lack the necessary financial means. Thus, we intend first to secure additional revenues by connecting Grindelwald to the Kleine Scheidegg. A cog railway has already been constructed up to Mountain House of Alpiglen. The planning of the remaining 400 meters in elevation is now entrusted to you. While this task does not appear overly challenging, only modest funds are available for its execution. We place our trust in your prudence to complete this work with wise guidance and frugal management.',
  },
  type: 'cogRailway',
  start: {
    x: 7178,
    y: 1020,
  },
  end: {
    x: 4030,
    y: 2724,
  },
  budget: 400000,
  costs: {
    tunnelMeter: 7,
    tunnelDepthFactor: 1,
    bridgeMeter: 5,
    bridgeHeightFactor: 5,
    groundMeter: 2,
    groundSlopeFactor: 20,
  },
  limits: {
    minRadius: 60,
    maxGradient: 20,
    maxVariance: null,
    minGap: 10,
  },
};
