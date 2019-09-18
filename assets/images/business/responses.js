import React from 'react'
import Svg, { Path } from 'react-native-svg'

const Responses = props => (
    <Svg width={15.301} height={17} {...props}>
        <Path
            data-name="Path 1643"
            d="M13.6 1.7h-3.553a2.54 2.54 0 0 0-4.794 0H1.7A1.7 1.7 0 0 0 0 3.4v11.9A1.7 1.7 0 0 0 1.7 17h11.9a1.7 1.7 0 0 0 1.7-1.7V3.4a1.7 1.7 0 0 0-1.7-1.7zm-5.95 0a.85.85 0 1 1-.85.85.852.852 0 0 1 .85-.85zm-1.7 11.9l-3.4-3.4L3.75 9l2.2 2.193 5.6-5.6 1.2 1.207z"
            fill={props.fill}
        />
    </Svg>
)

export default Responses
