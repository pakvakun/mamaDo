import React from 'react'
import Svg, { G, Rect, Circle } from 'react-native-svg'

const Payment = props => (
  <Svg width={20} height={18} {...props}>
    <G data-name="Group 11524" transform="translate(-27 -377.082)">
      <G
        data-name="Rectangle 1557"
        transform="translate(27 377.082)"
        fill="none"
        stroke="#9da6c1"
        strokeLinecap="square"
        strokeLinejoin="round"
        strokeWidth={1.6}
      >
        <Rect width={18.412} height={16.918} rx={2} stroke="none" />
        <Rect x={0.8} y={0.8} width={16.812} height={15.318} rx={1.2} />
      </G>
      <Circle
        data-name="Ellipse 84"
        cx={1.5}
        cy={1.5}
        r={1.5}
        transform="translate(38 384)"
        fill="#9da6c1"
      />
      <G
        data-name="Rectangle 1558"
        transform="translate(34 381.082)"
        fill="none"
        stroke="#9da6c1"
        strokeLinecap="square"
        strokeLinejoin="round"
        strokeWidth={1.6}
      >
        <Rect width={11.412} height={8.918} rx={2} stroke="none" />
        <Rect x={0.8} y={0.8} width={9.812} height={7.318} rx={1.2} />
      </G>
    </G>
  </Svg>
)

export default Payment;
