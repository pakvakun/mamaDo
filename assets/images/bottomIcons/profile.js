import React from 'react'
import Svg, { Path } from 'react-native-svg'

const Profile = props => (
    <Svg width={16} height={16} {...props}>
        <Path
            data-name="Path 125"
            d="M8 8a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
            fill="#868FB1"
        />
    </Svg>
)

export default Profile
