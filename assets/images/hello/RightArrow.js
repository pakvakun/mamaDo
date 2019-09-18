import React from 'react'
import Svg, { G, Rect } from 'react-native-svg'

const RightArrow = props => (
    <Svg width={6} height={10} {...props}>
        <G
            data-name="Group 440"
            transform="rotate(-90 -960.412 1304.053)"
            fill="#d4d6df"
        >
            <Rect
                width={6.783}
                height={1.696}
                rx={0.848}
                transform="rotate(45 -2565.85 1536.853)"
            />
            <Rect
                data-name="line"
                width={6.783}
                height={1.696}
                rx={0.848}
                transform="rotate(-45 2908.063 727.056)"
            />
        </G>
    </Svg>
)

export default RightArrow
