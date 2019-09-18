import React from 'react'
import Svg, { G, Rect } from 'react-native-svg'

const IconUnchecked = props => (
    <Svg width={27} height={27} {...props}>
        <G data-name="Rectangle 1499" fill="#fff" stroke="#d8dbe3">
            <Rect width={27} height={27} rx={6} stroke="none" />
            <Rect x={0.5} y={0.5} width={26} height={26} rx={5.5} fill="none" />
        </G>
    </Svg>
)

export default IconUnchecked
