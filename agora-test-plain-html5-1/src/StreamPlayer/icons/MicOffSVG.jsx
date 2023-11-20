/* eslint-disable max-len */
import React, { useState, useEffect, } from 'react';
import { v4 as uuid, } from 'uuid';

const MicOffSVG = (props) => {
  const [ uniqueId, setUniqueId, ] = useState(uuid());
  useEffect(() => setUniqueId(uuid()), []);

  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter={`url(#filter0_d_601_22039-${uniqueId})`} transform="translate(.2 1.6)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.81 4.54V1.594C8.81.722 8.104.018 7.231.018c-.81 0-1.467.61-1.556 1.393L8.809 4.54Zm2.102.21h-.894a2.7 2.7 0 0 1-.142.862l.668.668a3.42 3.42 0 0 0 .368-1.53ZM2.5 1.21l.741-.74 8.807 8.807-.742.74L9.098 7.81a3.77 3.77 0 0 1-1.34.473v1.724H6.706V8.283c-1.724-.258-3.154-1.74-3.154-3.533h.893c0 1.577 1.336 2.681 2.787 2.681.426 0 .841-.1 1.214-.273l-.872-.873c-.11.026-.221.042-.342.042A1.575 1.575 0 0 1 5.655 4.75v-.384L2.5 1.21Z"
          fill="#fff"
        />
      </g>
      <defs>
        <filter
          id={`filter0_d_601_22039-${uniqueId}`}
          x={0.569}
          y={0.018}
          width={13.41}
          height={13.863}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={1.931} />
          <feGaussianBlur stdDeviation={0.966} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_601_22039"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_601_22039"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
export default MicOffSVG;
