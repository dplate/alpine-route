export default [
  {
    id: 'route',
    text: {
      'de': 'Es wird der Verlauf der Strecke vom Start zum Ziel dargestellt. Mit schwarzem Rand werden Brücken verdeutlicht, gestrichelt Tunnel. Die restlichen Abschnitte befinden sich auf dem Boden und sind gewöhnlich am Günstigsten.',
      'en': 'The course of the route from start to finish is shown. Bridges are shown with a black border and tunnels with a dashed line. The remaining sections are on the ground and are usually the most favorable.'
    }
  },
  {
    id: 'map',
    text: {
      'de': 'Die Strecke wird auf einer Karte der Umgebung angezeigt. Besonders wichtig sind die braunen Höhenlinien: Je steiler das Gelände, desto enger liegen sie beieinander. Felswände werden durch dickere graue Linien visualisiert. Grundsätzlich sollte die Strecke auf möglichst flachem Gelände verlaufen, um günstiger zu sein.',
      'en': 'The route is displayed on a map of the surrounding area. The brown contour lines are particularly important: The steeper the terrain, the closer together they are. Rock faces are visualized by thicker grey lines. In general, the route should be on as flat a terrain as possible in order to be more economical.'
    }
  },
  {
    id: 'map-drag',
    text: {
      'de': 'Berühre die Karte und bewege deinen Finger (bzw. klicke und ziehe die Maus), um den sichtbaren Ausschnitt zu verschieben.',
      'en': 'Touch the map and move your finger (or click and drag the mouse) to move the visible area.'
    }
  },
  {
    id: 'map-zoom',
    text: {
      'de': 'Ziehe zwei Finger auf der Karte auseinander oder zusammen (bzw. benutze das Mausrad), um den sichtbaren Ausschnitt zu vergrößern und zu verkleinern.',
      'en': 'Drag two fingers on the map apart or together (or use the mouse wheel) to enlarge or reduce the visible area.'
    }
  },
  {
    id: 'map-control-point',
    text: {
      'de': 'In die Strecke können Kontrollpunkte eingefügt werden. Dafür eine beliebige Stelle der Strecke berühren (bzw. mit der Maus klicken) und halten, bis ein neuer Punkt erzeugt wurde. Dieser Punkt kann anschließen verschoben werden, um Kurven festzulegen.',
      'en': 'Control points can be inserted into the route. To do this, touch any point on the route (or click with the mouse) and hold until a new point is created. This point can then be moved to define curves.'
    }
  },
  {
    id: 'delete-control-point',
    text: {
      'de': 'Nicht mehr benötigte Kontrollpunkte können entfernt werden, in dem sie auf den Anfang oder Ende der Strecke, oder auf einen anderen Kontrollpunkt geschoben werden.',
      'en': 'Control points that are no longer required can be removed by moving them to the start or end of the route or to another control point.'
    }
  },
  {
    id: 'profile',
    text: {
      'de': 'Unter der Karte kann das Höhenprofil entlang der Strecke angezeigt werden. Dabei wird immer nur der Bereich angezeigt, der auf der Karte sichtbar ist oder gerade bearbeitet wird.',
      'en': 'The elevation profile along the route can be displayed below the map. Only the area that is visible on the map or is currently being edited is displayed.'
    }
  },
  {
    id: 'profile-control-point',
    text: {
      'de': 'Im Höhenprofil können Kontrollpunkte auf die selbe Art und Weise hinzugefügt werden wie auf der Karte. Kontrollpunkte befinden sich zu erst immer auf Bodenhöhe, lassen sich aber im Profil über bzw. unter die Erde verschieben, um gezielt Brücken oder Tunnel festzulegen.',
      'en': 'Control points can be added to the elevation profile in the same way as on the map. Control points are initially always at ground level, but can be moved above or below the ground in the profile to define specific bridges or tunnels.'
    }
  },
  {
    id: 'notes',
    text: {
      'de': 'Links der Karte können die Daten der Strecke angezeigt werden. Oben werden die Kosten aufgeschlüsselt und darunter, ob der Bau möglich ist. Nur wenn dies der Fall ist, kann die Planung beendet werden. Neue Aufträge gibt es aber nur, wenn auch das Budget eingehalten wurde.',
      'en': 'The data of the route can be displayed on the left of the map. At the top is a breakdown of the costs and below that, whether construction is possible. Only if this is the case can the planning be completed. New tasks will only be given if the budget has been met.'
    }
  },
  {
    id: 'highlights',
    text: {
      'de': 'Zu Beginn wird die Steigung der Strecke farblich visualisiert. Je roter, desto näher am Limit. Lila markiert zu steile Abschnitte, die korrigiert werden müssen. Durch Auswahl einzelner Daten im Bereich links der Karte können diese stattdessen dargestellt werden (Augensymbol).',
      'en': 'At the beginning, the gradient of the route is visualized in color. The redder the color, the closer to the limit. Purple indicates sections that are too steep and need to be corrected. By selecting individual data in the area to the left of the map, these can be displayed instead (eye symbol).'
    }
  },
  {
    id: 'radius',
    text: {
      'de': 'Diese Strecke darf einen minimalen Kurvenradius nicht unterschreiten. Ist dies der Fall, wird der Radius mit lila Strichen auf der Karte visualisiert und die Kurve muss weniger scharf gestaltet werden.',
      'en': 'This route must not fall below a minimum curve radius. If this is the case, the radius is visualized with purple lines on the map and the curve must be made less sharp.'
    }
  },
  {
    id: 'variance',
    text: {
      'de': 'Die minimale und maximale Steigung darf bei dieser Strecke nicht zu unterschiedlich sein, da die Wagons nur auf eine bestimmte Steigung ausgelegt werden können und sonst der Komfort der Fahrgäste leidet. Zur Lösung müssen entweder die zu flachen oder zu steilen Abschnitte verändert werden.',
      'en': 'The minimum and maximum gradients on this route must not be too different, as the wagons can only be designed for a certain gradient and passenger comfort would otherwise suffer. To find a solution, either the sections that are too flat or too steep must be changed.'
    }
  },
]