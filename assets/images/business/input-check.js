import React from 'react'
import Svg, { Path } from 'react-native-svg'

const InputCheck = props => (
    <Svg width={12} height={9} {...props}>
        <Path
            d="M11.108 1.357L4.764 7.701a.516.516 0 0 1-.046.054.5.5 0 0 1-.422.143.5.5 0 0 1-.3-.144.5.5 0 0 1-.044-.051L.703 4.454a.5.5 0 0 1 0-.71.5.5 0 0 1 .711 0l2.941 2.941L10.393.647a.5.5 0 0 1 .711 0 .5.5 0 0 1 .147.355.5.5 0 0 1-.143.355z"
            fill="#e94c89"
            stroke="#e94c89"
        />
    </Svg>
)

export default InputCheck
