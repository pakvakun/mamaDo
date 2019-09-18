import React from 'react'
import Svg, { G, Circle, Path } from 'react-native-svg'

const Information = props => (
    <Svg width={20.165} height={20.165} {...props}>
        <G data-name="Group 2392">
            <G data-name="Group 2391" fill="#9da6c1">
                <Circle
                    data-name="Ellipse 1"
                    cx={0.985}
                    cy={0.985}
                    r={0.985}
                    transform="translate(9.098 13.923)"
                />
                <Path
                    data-name="Path 773"
                    d="M10.083 0a10.083 10.083 0 1 0 10.082 10.083A10.077 10.077 0 0 0 10.083 0zm0 18.59a8.507 8.507 0 1 1 8.507-8.507 8.5 8.5 0 0 1-8.507 8.507z"
                />
                <Path
                    data-name="Path 774"
                    d="M10.083 5.061a3.154 3.154 0 0 0-3.151 3.151.788.788 0 0 0 1.575 0 1.575 1.575 0 1 1 1.575 1.575.788.788 0 0 0-.788.788v1.969a.788.788 0 0 0 1.575 0v-1.283a3.151 3.151 0 0 0-.788-6.2z"
                />
            </G>
        </G>
    </Svg>
)

export default Information
