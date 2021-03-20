import React from 'react';

const index = ({
  text,
  textColor = 'primary',
  number,
  percentage,
  subTitle,
  positive = true,
}) => {
  return (
    <div className="flex font-sans text-gray-400 justify-between h-28 px-4 flex-col pt-2 pb-4 w-full mx-3.5 rounded-xl m-shadow ">
      <p className={`text-sm`}>{text}</p>
      <div
        className={`flex ${
          percentage ? 'justify-between' : 'justify-center'
        } items-end`}
      >
        <p className={`text-sm text-${textColor} text-5xl font-medium`}>
          {number}
        </p>
        {percentage && (
          <div className="relative">
            <p
              className={`text-center text-xs ${
                positive ? 'text-primary' : 'text-tomato'
              }`}
            >
              {percentage}%
            </p>
            <p className="text-xs">{subTitle}</p>
            <svg
              className={`absolute top-1 ${positive && 'transform rotate-180'}`}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default index;
