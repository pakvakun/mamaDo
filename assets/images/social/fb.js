import React from 'react'
import Svg, { Path } from 'react-native-svg'

const Facebook = props => (
    <Svg width={7.197} height={15.42} {...props}>
        <Path
            d="M1.555 2.986v2.123H.004v2.6h1.555v7.715h3.2V7.706h2.144s.2-1.245.3-2.606h-2.43V3.325a.754.754 0 0 1 .693-.622h1.741V-.001H4.84c-3.364 0-3.285 2.6-3.285 2.987z"
            fill={props.fill||"#707896"}
        />
    </Svg>
)

export default Facebook
