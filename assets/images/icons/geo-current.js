import React from 'react'
import Svg, { Path } from 'react-native-svg'

const GeoCurrent = props => (
    <Svg width={24} height={24} {...props}>
        <Path data-name="Path 80" d="M0 0h24v24H0z" fill="none" />
        <Path
            data-name="Path 81"
            d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98z"
            fill="#e94c89"
        />
    </Svg>
)

export default GeoCurrent
