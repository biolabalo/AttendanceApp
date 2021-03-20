import React from 'react';

const BarContainer = ({
  children,
  text = 'Hello World',
  textColor = 'primary',
  number,
  percentage,
  positive = true,
}) => {
  return (
    <div className="m-shadow rounded-xl relative br-contrain w-8/25 pt-8/25 xl:w-49/100 xl:pt-49/100">
      {children}
      <div className="absolute-center absolute h-4/5 w-4/5 rounded-full m-shadow"></div>
      <div className="absolute-center absolute h-1/2 w-1/2 text-gray-400 flex flex-col px-4 text-center py-8 rounded-full shadow-inner-extra justify-center">
        <p className={`text-xs`}>{text}</p>
        <p className={`text-${textColor} text-3xl`}>{number}%</p>
        {percentage && (
          <div className="relative flex justify-center items-center">
            <svg
              className={`${positive && 'transform rotate-180'}`}
              width="11"
              height="8"
              viewBox="0 0 11 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.57971 8L0.255954 0.499999L10.9035 0.5L5.57971 8Z"
                fill={positive ? '#26A595' : '#D12100'}
              />
            </svg>
            <p
              className={`ml-1 text-sm ${
                positive ? 'text-primary' : 'text-tomato'
              }`}
            >
              {percentage}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BarContainer;
