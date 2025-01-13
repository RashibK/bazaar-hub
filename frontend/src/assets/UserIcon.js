import * as React from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="Layer_1"
    width={32}
    height={32}
    data-name="Layer 1"
    viewBox="0 0 24 24"
    {...props}
  >
    <defs>
      <style>
        {
          ".cls-1{fill:none;stroke:#020202;stroke-miterlimit:10;stroke-width:1.91px}"
        }
      </style>
    </defs>
    <circle cx={12} cy={7.25} r={5.73} className="cls-1" />
    <path
      d="m1.5 23.48.37-2.05A10.3 10.3 0 0 1 12 13a10.3 10.3 0 0 1 10.13 8.45l.37 2.05"
      className="cls-1"
    />
  </svg>
)
export default SvgComponent
