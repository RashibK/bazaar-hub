import * as React from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01m4.994 0a9 9 0 0 1-9 9h-9s1.56-3.744.936-5a9 9 0 1 1 17.064-4Z"
    />
  </svg>
)
export default SvgComponent
