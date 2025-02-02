import {
  COSTS_HIGHLIGHTS,
  LIMIT_HIGHLIGHTS,
} from '../cameras/highlightTypes.js';

export default (cameras, renderer, elements, highlightType) => {
  [elements.label, elements.value, elements.selector].forEach((element) => {
    element.onclick = () => {
      if (cameras.highlights.has(highlightType)) {
        cameras.highlights.delete(highlightType);
      } else {
        if (
          (COSTS_HIGHLIGHTS.has(highlightType) &&
            !COSTS_HIGHLIGHTS.has(cameras.highlights.values().next().value)) ||
          LIMIT_HIGHLIGHTS.has(highlightType)
        ) {
          cameras.highlights.clear();
        }
        cameras.highlights.add(highlightType);
      }
      renderer.renderAll();
    };
  });
};
