export default {
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
};