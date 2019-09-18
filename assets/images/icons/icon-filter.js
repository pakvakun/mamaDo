import React from 'react'
import Svg, { G, Rect, Circle } from 'react-native-svg'

const IconFilter = props => (
    <Svg width={17} height={14} {...props}>
        <G data-name="Group 11107" transform="translate(-319 -61)" fill="#fff">
            <Rect
                width={15.764}
                height={1.5}
                rx={0.75}
                transform="translate(319 63)"
            />
            <Rect
                data-name="path"
                width={15.764}
                height={1.5}
                rx={0.75}
                transform="rotate(180 168 36.75)"
            />
            <Circle
                data-name="Ellipse 52"
                cx={2.5}
                cy={2.5}
                r={2.5}
                transform="rotate(180 168 33)"
            />
            <Circle
                data-name="Ellipse 53"
                cx={2.5}
                cy={2.5}
                r={2.5}
                transform="translate(319 70)"
            />
        </G>
    </Svg>
)

export default IconFilter
