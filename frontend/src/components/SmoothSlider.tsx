import React from "react";

export interface SmoothSliderProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  className?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  style?: React.CSSProperties;
}

export default function SmoothSlider({ value, min = 0, max = 10, step = 1, onChange, ...props }: SmoothSliderProps) {
  return (
    <div className="w-full flex items-center gap-2">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className={"slider-thumb-smooth w-full accent-primary h-2 rounded-lg appearance-none bg-gradient-to-r from-primary/30 to-primary/60 focus:outline-none transition-all duration-300 " + (props.className || "")}
        disabled={props.disabled}
        id={props.id}
        name={props.name}
        style={props.style}
      />
      <style>{`
        input[type='range'].slider-thumb-smooth::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          background: #6366f1;
          border-radius: 50%;
          box-shadow: 0 0 4px #6366f1cc;
          cursor: pointer;
          transition: background 0.2s, box-shadow 0.2s, left 0.2s cubic-bezier(0.4,0,0.2,1), transform 0.2s cubic-bezier(0.4,0,0.2,1);
          margin-top: -8px; /* (24-8)/2 = 8px, centers the thumb on an 8px track */
        }
        input[type='range'].slider-thumb-smooth:focus::-webkit-slider-thumb {
          background: #818cf8;
          box-shadow: 0 0 8px #6366f1cc;
        }
        input[type='range'].slider-thumb-smooth::-moz-range-thumb {
          width: 24px;
          height: 24px;
          background: #6366f1;
          border-radius: 50%;
          box-shadow: 0 0 4px #6366f1cc;
          cursor: pointer;
          transition: background 0.2s, box-shadow 0.2s, left 0.2s cubic-bezier(0.4,0,0.2,1), transform 0.2s cubic-bezier(0.4,0,0.2,1);
          /* Center thumb in Firefox */
        }
        input[type='range'].slider-thumb-smooth:focus::-moz-range-thumb {
          background: #818cf8;
          box-shadow: 0 0 8px #6366f1cc;
        }
        input[type='range'].slider-thumb-smooth::-ms-thumb {
          width: 24px;
          height: 24px;
          background: #6366f1;
          border-radius: 50%;
          box-shadow: 0 0 4px #6366f1cc;
          cursor: pointer;
          transition: background 0.2s, box-shadow 0.2s, left 0.2s cubic-bezier(0.4,0,0.2,1), transform 0.2s cubic-bezier(0.4,0,0.2,1);
          margin-top: 0px;
        }
        input[type='range'].slider-thumb-smooth:focus::-ms-thumb {
          background: #818cf8;
          box-shadow: 0 0 8px #6366f1cc;
        }
        input[type='range'].slider-thumb-smooth::-webkit-slider-runnable-track {
          height: 8px;
          border-radius: 8px;
          background: linear-gradient(90deg, #6366f1 0%, #818cf8 100%);
        }
        input[type='range'].slider-thumb-smooth::-moz-range-track {
          height: 8px;
          border-radius: 8px;
          background: linear-gradient(90deg, #6366f1 0%, #818cf8 100%);
        }
        input[type='range'].slider-thumb-smooth::-ms-fill-lower {
          background: #6366f1;
        }
        input[type='range'].slider-thumb-smooth::-ms-fill-upper {
          background: #818cf8;
        }
        input[type='range'].slider-thumb-smooth:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
}
