import React from 'react'
import Svg, { G, Rect, Path } from 'react-native-svg'

const IconChecked = props => (
    <Svg width={27} height={27} {...props}>
        <G data-name="Group 11223" transform="translate(-24 -243)">
            <Rect
                data-name="Rectangle 1498"
                width={27}
                height={27}
                rx={6}
                transform="translate(24 243)"
                fill="#38afaf"
            />
            <Path
                d="M42.745 253.857l-6.344 6.344a.516.516 0 0 1-.046.054.5.5 0 0 1-.422.143.5.5 0 0 1-.3-.144.5.5 0 0 1-.044-.051l-3.249-3.249a.5.5 0 0 1 0-.71.5.5 0 0 1 .711 0l2.941 2.941 6.038-6.038a.5.5 0 0 1 .711 0 .5.5 0 0 1 .147.355.5.5 0 0 1-.143.355z"
                fill="#fafafa"
                stroke="#fafafa"
            />
        </G>
    </Svg>
)

export default IconChecked
