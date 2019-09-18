import React from 'react'
import Svg, { Path } from 'react-native-svg'

const Company = props => (
    <Svg width={18} height={17} {...props}>
        <Path
            data-name="Path 1641"
            d="M16.15 3.579h-3.589v-1.79A1.786 1.786 0 0 0 10.767 0H7.178a1.786 1.786 0 0 0-1.795 1.789v1.79H1.794A1.778 1.778 0 0 0 .009 5.368L0 15.211A1.786 1.786 0 0 0 1.794 17H16.15a1.786 1.786 0 0 0 1.794-1.789V5.368a1.786 1.786 0 0 0-1.794-1.789zm-5.383 0H7.178v-1.79h3.589z"
            fill={props.fill}
        />
    </Svg>
)

export default Company
