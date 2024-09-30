import React from 'react'

import { IconProps } from 'types/icon'

const ChevronDown = (props: IconProps) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Chevron down icon</title>
      <path
        d="M3.72505 7.47481C3.94694 7.25292 4.29416 7.23275 4.53884 7.41429L4.60893 7.47481L10.0003 12.8659L15.3917 7.47481C15.6136 7.25292 15.9608 7.23275 16.2055 7.41429L16.2756 7.47481C16.4975 7.6967 16.5177 8.04391 16.3361 8.28859L16.2756 8.35869L10.4423 14.192C10.2204 14.4139 9.87316 14.4341 9.62848 14.2525L9.55838 14.192L3.72505 8.35869C3.48097 8.11461 3.48097 7.71888 3.72505 7.47481Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default ChevronDown
