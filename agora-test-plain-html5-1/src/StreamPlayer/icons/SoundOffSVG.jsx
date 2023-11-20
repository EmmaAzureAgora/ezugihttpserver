/* eslint-disable max-len */
import React, { useState, useEffect, } from 'react';
import { v4 as uuid, } from 'uuid';

const SoundOffSVG = (props) => {
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
      <g filter={`url(#soundoff-a-${uniqueId})`} transform="translate(.2 1.6)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.553 1.478 3.33.7l9.223 9.222-.777.778-1.13-1.13c-.574.457-1.252.8-1.99.964V9.399a3.699 3.699 0 0 0 1.201-.612L7.553 6.48v3.635L4.797 7.357H2.592V4.048h2.205l.16-.165-2.404-2.405Zm8.633 5.515a3.848 3.848 0 0 0-2.53-4.991V.865a4.962 4.962 0 0 1 3.373 6.972l-.843-.844ZM7.553 1.29 6.517 2.327l1.036 1.037V1.29Zm1.103 2.19a2.482 2.482 0 0 1 1.378 2.223c0 .044-.006.088-.011.132L8.656 4.467V3.48Z"
          fill="#fff"
        />
      </g>
      <defs>
        <filter
          id={`soundoff-a-${uniqueId}`}
          x={0.622}
          y={0.7}
          width={13.863}
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
            result="effect1_dropShadow_511_859"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_511_859"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default SoundOffSVG;
