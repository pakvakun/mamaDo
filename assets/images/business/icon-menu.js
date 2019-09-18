import React from 'react'
import Svg, { G, Rect } from 'react-native-svg'

const Menu = props => (
    <Svg width={20} height={13.5} {...props}>
        <G data-name="Group 11106" transform="translate(-34 -55)" fill="#fff">
            <Rect width={20} height={1.5} rx={0.75} transform="translate(34 61)" />
            <Rect
                data-name="path"
                width={20}
                height={1.5}
                rx={0.75}
                transform="translate(34 55)"
            />
            <Rect
                data-name="path"
                width={10}
                height={1.5}
                rx={0.75}
                transform="translate(34 67)"
            />
        </G>
    </Svg>
)

export default Menu
