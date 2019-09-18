import React from 'react'
import Svg, { Path } from 'react-native-svg'

const Search = props => (
    <Svg width={18} height={18} {...props}>
        <Path
            d="M13.117 11.96l4.643 4.64a.82.82 0 0 1-1.16 1.16l-4.64-4.643a7.363 7.363 0 1 1 1.157-1.157zm-5.753 1.131a5.727 5.727 0 1 0-5.728-5.727 5.727 5.727 0 0 0 5.728 5.727z"
            fill="#fff"
        />
    </Svg>
)

export default Search
