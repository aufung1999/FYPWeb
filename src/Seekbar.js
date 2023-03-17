import React from 'react'

 function Seekbar({ value, min, max, onInput }) {
    return (
      <input
        type="range"
        step="any"
        value={value}
        min={min}
        max={max}
        onInput={onInput}
      />
    );
  }

export default Seekbar