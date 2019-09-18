import React from 'react'
import Svg, { G, Path } from 'react-native-svg'

const Map = props => (
    <Svg width={19.074} height={16.5} {...props}>
        <G data-name="Group 806">
            <G data-name="Group 805" fill={props.fill}>
                <Path
                    data-name="Path 127"
                    d="M5.225 14.41a.544.544 0 0 1-.355.46L.355 16.477C.16 16.546 0 16.453 0 16.264V2.089a.543.543 0 0 1 .355-.46L4.87.023c.2-.069.355.024.355.208z"
                />
                <Path
                    data-name="Path 128"
                    d="M12.15 16.265c0 .184-.16.277-.355.208L7.28 14.867a.544.544 0 0 1-.355-.46V.231c0-.184.16-.277.355-.208l4.515 1.606a.544.544 0 0 1 .355.46z"
                />
                <Path
                    data-name="Path 129"
                    d="M19.074 14.41a.543.543 0 0 1-.355.46l-4.515 1.606c-.2.069-.355-.024-.355-.208V2.089a.543.543 0 0 1 .355-.46L18.719.023c.2-.069.355.024.355.208v14.18z"
                />
            </G>
        </G>
    </Svg>
)

export default Map
