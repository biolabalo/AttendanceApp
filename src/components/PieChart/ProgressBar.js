import React from 'react';

const ProgressBar = ({ radius, stroke, progress, color = 'primary' }) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  return (
    <svg
      key={radius}
      className={`text-${color} stroke-current absolute-center `}
      height={radius * 2}
      width={radius * 2}
    >
      <circle
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference + ' ' + circumference}
        style={{
          strokeDashoffset,
          transition: 'stroke-dashoffset 0.35s',
          // transform: 'rotate(-90deg)',
          // transformOrigin: '50% 50%',
        }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  );
};

export default ProgressBar;
