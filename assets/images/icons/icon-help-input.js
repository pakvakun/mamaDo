import React from 'react'
import Svg, { G, Path, Circle } from 'react-native-svg'

const IconHelpInput = props => (
    <Svg width={23} height={23} {...props}>
        <G data-name="Group 11593">
            <Path
                data-name="Path 773"
                d="M11.157 0a11.157 11.157 0 1 0 11.156 11.157A11.151 11.151 0 0 0 11.157 0z"
                fill="#dee2eb"
            />
            <G data-name="Group 11592" transform="translate(7.67 5.6)" fill="#99a2b4">
                <Circle
                    data-name="Ellipse 1"
                    cx={1.09}
                    cy={1.09}
                    r={1.09}
                    transform="translate(2.397 9.806)"
                />
                <Path
                    data-name="Path 774"
                    d="M3.486 0A3.49 3.49 0 0 0 0 3.486a.872.872 0 0 0 1.743 0 1.743 1.743 0 1 1 1.743 1.743.872.872 0 0 0-.872.872V8.28a.872.872 0 0 0 1.743 0V6.862a3.487 3.487 0 0 0-.872-6.863z"
                />
            </G>
        </G>
    </Svg>
)

export default IconHelpInput
