import React from 'react'
import Svg, { G, Ellipse, Path } from 'react-native-svg'

const IconMetro = props => (
    
    <Svg width={14} height={14} {...props}>
        <G data-name="Group 11135" transform="translate(-102.521 -256.326)">
            <Ellipse
                data-name="Ellipse 15"
                cx={6.815}
                cy={6.815}
                rx={6.815}
                ry={6.815}
                transform="translate(102.521 256.327)"
                fill={`${props.fill}`||'#38afaf'}
                />
            <Path
                data-name="Path 110"
                d="M112.175 259.374l-2.776 4.218-2.841-4.12-1.559 6.898h2.109l.391-2.206 1.863 2.778 1.857-2.717.374 2.157h2.106z"
                fill="#fff"
                />
        </G>
    </Svg>
)

export default IconMetro
