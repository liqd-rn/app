import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, { useAnimatedProps, withRepeat, withTiming, useSharedValue, Easing } from 'react-native-reanimated';

const AnimatedPath = Animated.createAnimatedComponent(Path);

type LoaderProps = 
{
    size?: number;
    weight?: number;
    color?: string;
    style?: StyleProp<ViewStyle>;
}

const Loader = ({ size = 128, weight = 12, color = 'white', style }: LoaderProps) =>
{
    const progress = useSharedValue(0);

    React.useEffect(() => 
    {
        progress.value = withRepeat( withTiming( 1, {
            duration : 1500,
            easing   : Easing.bezier( 0.500, 0.250, 0.500, 0.750 ),
        }),
        -1, false );
    }, []);

    const animatedProps = useAnimatedProps(() => 
    {
        const rotation = progress.value * 720;
        const sweepAngle = 60 + 2 * Math.abs( progress.value - 0.5 )  * 240;

        const center = size / 2;
        const radius = ( size - weight ) / 2;
        
        const startX = center + radius * Math.cos(rotation * Math.PI / 180);
        const startY = center + radius * Math.sin(rotation * Math.PI / 180);

        const endX = center + radius * Math.cos((rotation + sweepAngle) * Math.PI / 180);
        const endY = center + radius * Math.sin((rotation + sweepAngle) * Math.PI / 180);
        
        return { d: `M${startX},${startY}A${radius},${radius},0,${sweepAngle > 180 ? 0: 1},0,${endX},${endY}` };
    });

    return (
        <Svg height={size} width={size} style={style}>
            <AnimatedPath stroke={color} strokeWidth={weight} strokeLinecap="round" fill="none" animatedProps={animatedProps} />
        </Svg>
    );
};

export { Loader };
