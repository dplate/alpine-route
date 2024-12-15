export default {
  id: 'jungfraubahn-wengen-scheidegg',
  map: 'jungfrau',
  name: {
    'de': 'Jungfraubahn II: Kleine Scheidegg West',
    'en': 'Jungfraubahn II: Kleine Scheidegg West'
  },
  description: {
    'de': 'Es ist unser Anliegen, die Kleine Scheidegg ausgehend von Wengen einem breiteren Kreise von Reisenden zugänglich zu machen. Zu diesem Zweck gedenken wir, die bestehende Zahnradbahn, welche bereits bis nach Wengen führt, zu verlängern. Indes bitten wir Euch, bei der Planung jedweder Bauwerke von größerem Aufwand, insbesondere Brücken und Tunnel, abzusehen, da unsere finanziellen Mittel begrenzt sind. Das Terrain um die Wengernalp zeigt sich glücklicherweise von einer solchen Beschaffenheit, dass es uns als geeignet und verhältnismäßig unproblematisch für dieses Vorhaben erscheint. Wir vertrauen darauf, dass Euer Geschick und Eure Umsicht dies bedenken und in die Ausführung einfließen lassen mögen.',
    'en': 'It is our intent to render the Kleine Scheidegg, departing from Wengen, accessible to a broader circle of travelers. To this end, we propose the extension of the existing cog railway, which already reaches Wengen. However, we beseech you to refrain from planning any constructions of significant magnitude, particularly bridges and tunnels, as our financial resources are limited. The terrain surrounding the Wengernalp fortunately appears to be of such a nature as to present itself as suitable and comparatively unproblematic for this undertaking. We place our trust in your skill and prudence to consider this matter and to incorporate it into the execution of the work.'
  },
  type: 'cogRailway',
  start: {
    x: 949, 
    y: 530
  },
  end: {
    x: 3944, 
    y: 2785
  },
  budget: 650000,
  costs: {
    tunnelMeter: 7,
    tunnelDepthFactor: 1,
    bridgeMeter: 5,
    bridgeHeightFactor: 5,
    groundMeter: 2,
    groundSlopeFactor: 20
  },
  limits: {
    minRadius: 60,
    maxGradient: 20,
    maxVariance: null,
    minGap: 10
  }
};