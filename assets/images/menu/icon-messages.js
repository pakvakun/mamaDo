import React from 'react'
import Svg, { Path } from 'react-native-svg'

const Messages = props => (
  <Svg width={18} height={18} {...props}>
    <Path
      d="M.327 15.791a1.469 1.469 0 0 0 1.882 1.882l2.7-.655A8.751 8.751 0 0 0 9 18a8.943 8.943 0 1 0-8.018-4.868l-.655 2.659zm2.332-2.577a.818.818 0 0 0-.082-.614A7.366 7.366 0 1 1 5.4 15.423a.793.793 0 0 0-.614-.082l-2.864.7.736-2.823zm10.023-5.032a.818.818 0 0 0 0-1.636H5.318a.818.818 0 1 0 0 1.636zm0 3.273a.818.818 0 0 0 0-1.636H7.773a.818.818 0 0 0 0 1.636z"
      fill="#9da6c1"
    />
  </Svg>
)

export default Messages;
