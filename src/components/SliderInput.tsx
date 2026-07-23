import React, { useId } from 'react';
import './SliderInput.css';

interface SliderInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  formatValue: (value: number) => string;
}

const SliderInput: React.FC<SliderInputProps> = ({
  label,
  value,
  min,
  max,
  step,
  onChange,
  formatValue,
}) => {
  const id = useId();
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className="slider-input">
      <div className="slider-input-header">
        <label className="slider-input-label" htmlFor={id}>
          {label}
        </label>
        <span className="slider-input-value">{formatValue(value)}</span>
      </div>
      <input
        id={id}
        type="range"
        className="slider-input-range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ '--slider-fill': `${percent}%` } as React.CSSProperties}
      />
      <div className="slider-input-bounds">
        <span>{formatValue(min)}</span>
        <span>{formatValue(max)}</span>
      </div>
    </div>
  );
};

export default SliderInput;
