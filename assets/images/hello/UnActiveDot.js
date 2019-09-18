import React from 'react'
import Svg, { Path } from 'react-native-svg'

const UnActiveDot = props => (
    <Svg width={10} height={10} {...props}>
        <Path
            d="M9.558 5.69a7.28 7.28 0 0 0-3.873 3.873.761.761 0 0 1-1.378 0A7.28 7.28 0 0 0 .434 5.69a.761.761 0 0 1 0-1.378A7.28 7.28 0 0 0 4.307.439a.761.761 0 0 1 1.378 0 7.28 7.28 0 0 0 3.873 3.873.761.761 0 0 1 0 1.378z"
            fill="#707896"
            opacity={0.3}
        />
    </Svg>
)

export default UnActiveDot
