import React from 'react'
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg'

const IconsBack = props => (
    <Svg width={24} height={24} {...props}>
        <Defs>
            <ClipPath id="prefix__a">
                <Path fill="none" d="M0 0h24v24H0z" />
            </ClipPath>
        </Defs>
        <G data-name="icons/back" clipPath="url(#prefix__a)">
            <Path fill="none" d="M0 0h24v24H0z" />
            <Path
                d="M11.241 18.52l-5.879-5.88A.749.749 0 0 1 5 11.998a.748.748 0 0 1 .1-.378.744.744 0 0 1 .128-.171.751.751 0 0 1 .078-.068l5.932-5.932a.751.751 0 0 1 1.061 0 .751.751 0 0 1 0 1.061L7.56 11.248h12.688a.75.75 0 0 1 .75.751.75.75 0 0 1-.75.75H7.588l4.711 4.711a.751.751 0 0 1 0 1.061.749.749 0 0 1-.531.219.749.749 0 0 1-.527-.22z"
                fill={props.fill||"#444b69"}
            />
        </G>
    </Svg>
)

export default IconsBack
