import React from 'react'
import Svg, { Path } from 'react-native-svg'

const IconAddReview = props => (
    <Svg width={16} height={16} {...props}>
        <Path
            d="M7.25 15.25v-6.5H.75a.75.75 0 0 1 0-1.5h6.5V.75a.75.75 0 1 1 1.5 0v6.5h6.5a.75.75 0 0 1 0 1.5h-6.5v6.5a.75.75 0 1 1-1.5 0z"
            fill="#fff"
        />
    </Svg>
)

export default IconAddReview
