import React, { useEffect, useState } from 'react';
import BarContainer from './BarContainer';
import ProgressBar from './ProgressBar';

const PieChart = ({ progress = 0, color, text, percentage, positive }) => {
  const [size, setSize] = useState(60);

  useEffect(() => {
    const setSvgSize = () => {
      const con = document.querySelector('.br-contrain');
      const elWidth = con.getBoundingClientRect().width;
      const roundedWidth = Math.round((elWidth * 0.65) / 2);
      setSize(roundedWidth + 32);
    };

    setSvgSize();

    window.onresize = setSvgSize;

    return () => {
      window.onresize = null;
    };
  }, []);

  return (
    <BarContainer
      key={percentage}
      text={text}
      number={progress}
      textColor={color}
      percentage={percentage}
      positive={positive}
    >
      <ProgressBar
        key={percentage * size}
        radius={size}
        stroke={16}
        progress={progress}
        color={color}
      />
    </BarContainer>
  );
};

export default PieChart;
