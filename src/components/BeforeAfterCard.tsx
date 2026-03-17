import { useId, useState } from 'react';
import type { CaseStudy } from '../types/content';

type BeforeAfterCardProps = {
  item: CaseStudy;
};

function BeforeAfterCard({ item }: BeforeAfterCardProps) {
  const [sliderValue, setSliderValue] = useState(54);
  const sliderId = useId();

  return (
    <article className="result-card">
      <div className="result-visual">
        <div className="result-media">
          <img
            className="result-image"
            src={item.beforeImage}
            alt={`Antes del tratamiento ${item.treatment}`}
          />
          <img
            className="result-image result-image-after"
            src={item.afterImage}
            alt={`Despues del tratamiento ${item.treatment}`}
            style={{ clipPath: `inset(0 ${100 - sliderValue}% 0 0)` }}
          />
          <div className="result-handle" style={{ left: `calc(${sliderValue}% - 1px)` }} />
        </div>
        <label className="result-range" htmlFor={sliderId}>
          <span>Antes</span>
          <input
            id={sliderId}
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={(event) => setSliderValue(Number(event.target.value))}
            aria-label={`Comparador de antes y despues para ${item.treatment}`}
          />
          <span>Despues</span>
        </label>
      </div>
      <div className="result-copy">
        <h3>{item.treatment}</h3>
        <p>{item.resultText}</p>
        <blockquote>
          "{item.testimonialText}"
          <footer>
            {item.testimonialName} | {item.testimonialRole}
          </footer>
        </blockquote>
      </div>
    </article>
  );
}

export default BeforeAfterCard;
