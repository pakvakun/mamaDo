import React from 'react'
import Svg, { G, Path } from 'react-native-svg'

const IconCalendar = props => (
    <Svg width={18} height={17} {...props}>
        <G fill="#e2e4e9">
            <Path
                data-name="Path 89"
                d="M16.5 2.2h-2.75V1.1a1.1 1.1 0 1 0-2.2 0v1.1h-5.5V1.1a1.1 1.1 0 1 0-2.2 0v1.1H1.1A1.1 1.1 0 0 0 0 3.3v1.1h17.6V3.3a1.1 1.1 0 0 0-1.1-1.1z"
            />
            <Path
                data-name="Path 90"
                d="M0 15.4a1.1 1.1 0 0 0 1.1 1.1h15.4a1.1 1.1 0 0 0 1.1-1.1V5.5H0zm12.1-7.7h2.2v2.2h-2.2zm-4.4 0h2.2v2.2H7.7zm0 4.4h2.2v2.2H7.7zM3.3 7.7h2.2v2.2H3.3zm0 4.4h2.2v2.2H3.3z"
            />
        </G>
    </Svg>
)

export default IconCalendar
