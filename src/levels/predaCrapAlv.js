export default {
  id: 'preda-crap-alv',
  map: 'albula',
  name: {
    de: 'Weg nach Crap Alv',
    en: 'Path to Crap Alv',
  },
  description: {
    de: 'Es ist vorgesehen, auf Crap Alv am Albulapass eine Ziegelfabrik zu errichten. Zum Zwecke des Abtransports der gefertigten Ziegel wird ein ausgebauter Weg für Maultiere vonnöten sein. Bei der Planung sei jedoch dringend darauf geachtet, dass weder kostspielige Brücken noch Tunnel Berücksichtigung finden und die Steigung des Weges sich in bescheidenem Maße halte.',
    en: 'It is proposed to establish a brick factory at Crap Alv on the Albula Pass. For the transportation of the manufactured bricks, an expanded path suitable for mules will be required. In the planning, however, strict attention must be paid to avoiding costly bridges or tunnels, and the gradient of the path must remain moderate.',
  },
  type: 'muleTrack',
  start: {
    x: 2849,
    y: 4767,
  },
  end: {
    x: 5061,
    y: 5601,
  },
  budget: 20000,
  costs: {
    tunnelMeter: 7,
    tunnelDepthFactor: 1,
    bridgeMeter: 5,
    bridgeHeightFactor: 5,
    groundMeter: 0.1,
    groundSlopeFactor: 20,
  },
  limits: {
    minRadius: null,
    maxGradient: 25,
    maxVariance: null,
    minGap: 2,
  },
};
