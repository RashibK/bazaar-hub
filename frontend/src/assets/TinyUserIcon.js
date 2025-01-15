import * as React from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 32 32"
    {...props}
  >
    <title />
    <path d="M16 16a7 7 0 1 0-7-7 7 7 0 0 0 7 7Zm0-12a5 5 0 1 1-5 5 5 5 0 0 1 5-5ZM17 18h-2A11 11 0 0 0 4 29a1 1 0 0 0 1 1h22a1 1 0 0 0 1-1 11 11 0 0 0-11-11ZM6.06 28A9 9 0 0 1 15 20h2a9 9 0 0 1 8.94 8Z" />
  </svg>
)
export default SvgComponent
