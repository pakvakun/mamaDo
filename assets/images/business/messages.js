import React from 'react'
import Svg, { G, Path } from 'react-native-svg'

const Messages = props => (
    <Svg width={18.092} height={18.092} {...props}>
        <G data-name="Group 11528">
            <Path
                data-name="Path 1642"
                d="M18.083 1.809A1.807 1.807 0 0 0 16.283 0H1.809A1.814 1.814 0 0 0 0 1.809v10.855a1.814 1.814 0 0 0 1.809 1.809h12.664l3.618 3.618z"
                fill={props.fill}
            />
            <G data-name="Group 11527" fill="#fff">
                <Path data-name="Rectangle 1559" d="M2.959 2.929h12v2h-12z" />
                <Path data-name="Rectangle 1560" d="M2.959 6.125h12v2h-12z" />
                <Path data-name="Rectangle 1561" d="M2.959 9.321h12v2h-12z" />
            </G>
        </G>
    </Svg>
)

export default Messages
