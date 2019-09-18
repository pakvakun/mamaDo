import React from 'react'
import Svg, { Path } from 'react-native-svg'

const List = props => (
    <Svg width={19} height={14} {...props}>
        <Path
            data-name="Path 130"
            d="M0 4h4V0H0zm0 5h4V5H0zm5 0h4V5H5zm5 0h4V5h-4zM5 4h4V0H5zm5-4v4h4V0zm5 9h4V5h-4zM0 14h4v-4H0zm5 0h4v-4H5zm5 0h4v-4h-4zm5 0h4v-4h-4zm0-14v4h4V0z"
            fill={props.fill}
        />
    </Svg>
)

export default List
