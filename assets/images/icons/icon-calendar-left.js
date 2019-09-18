import React from 'react'
import Svg, { G, Circle, Rect } from 'react-native-svg'

const CalendarLeft = props => (
    <Svg width={35} height={35} {...props}>
        <G data-name="Group 11233" transform="translate(1 1)">
            <Circle
                data-name="Ellipse 70"
                cx={17.5}
                cy={17.5}
                r={17.5}
                transform="rotate(180 17 17)"
                fill="#f0f1f3"
            />
            <G
                data-name="Group 11230"
                transform="rotate(90 3.821 15.179)"
                fill="#606a8b"
            >
                <Rect
                    width={6.783}
                    height={1.696}
                    rx={0.848}
                    transform="rotate(45 .6 1.447)"
                />
                <Rect
                    data-name="line"
                    width={6.783}
                    height={1.696}
                    rx={0.848}
                    transform="rotate(-45 7.612 -2.003)"
                />
            </G>
        </G>
    </Svg>
)

export default CalendarLeft
