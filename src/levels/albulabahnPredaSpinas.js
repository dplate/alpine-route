export default {
  id: 'albulabahn-preda-spinas',
  map: 'albula',
  name: {
    de: 'Albulabahn III: Preda - Spinas',
    en: 'Albulabahn III: Preda - Spinas',
  },
  description: {
    de: 'Die aufwändig gestaltete Strecke nach Preda ist nun vollendet. Es erscheint indes wenig sinnvoll, weitere fünfhundert Höhenmeter hinauf auf den Albulapass zu erklimmen, da die Bahn auch während der Wintermonate in Betrieb sein soll, um die Reisenden sicher nach St. Moritz zu geleiten. Aus diesem Grunde wird nun eine beträchtliche Summe bereitgestellt, um den Bau eines langen Tunnels in das benachbarte Tal nach Spina zu verwirklichen. Nach den mühseligen zwei Etappen sollte dieser Abschnitt durch den Tunnel einfacher zu planen sein. Dennoch wird man darauf bedacht sein, die Tunnelstrecke so kurz wie möglich zu halten, um übermäßige Kosten zu vermeiden und die Bauzeit gering zu bemessen.',
    en: 'The elaborate route to Preda is now complete. However, it seems unwise to ascend an additional five hundred meters to the Albula Pass, as the railway is intended to operate even during the winter months, bringing guests safely to St. Moritz. Therefore, a considerable sum of money is now being allocated to construct a long tunnel into the neighboring valley of Spina. After the challenging two stages, this section through the tunnel is expected to be easier to plan. Nevertheless, efforts will be made to keep the tunnel route as short as possible, in order to avoid excessive costs and minimize construction time.',
  },
  type: 'narrowGaugeRailway',
  start: {
    x: 2813,
    y: 4554,
  },
  end: {
    x: 7901,
    y: 7733,
  },
  budget: 37000000,
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
