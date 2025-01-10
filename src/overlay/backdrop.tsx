import React from 'react';
import { Animated, Easing/*, KeyboardAvoidingView*/, Pressable } from 'react-native';

export interface BackdropMethods
{
    close: ( duration:number ) => void
}

export type BackdropProps = 
{
    style?          : () => object,
    duration?       : number,
    backgroundColor?: string,
    onPress?        : () => void,
    children?       : JSX.Element
}

const Backdrop = React.forwardRef<BackdropMethods,BackdropProps>(({ style = {}, onPress = undefined, backgroundColor = 'rgba(0,0,0,0.5)' , ...props }, ref ) => 
{
    const [ bgColor, setBgColor ] : [any, any] = React.useState( 'rgba(0,0,0,0)' );

    //@ts-ignore
    function animate( backgroundAnimation, duration = undefined )
    {
        const animation = new Animated.Value( 0 );

        setBgColor( animation.interpolate({ inputRange: [ 0, 1 ], outputRange: backgroundAnimation }));

        Animated.timing( animation, { toValue: 1, duration: duration || props.duration || 350, easing: Easing.bezier( 0.65, 0, 0.35, 1 ), useNativeDriver: false }).start();
    }

    React.useEffect(() => { animate([ 'rgba(0,0,0,0)', backgroundColor ])}, []);

    React.useImperativeHandle( ref, () => (
    {
        close( duration )
        {
            //@ts-ignore
            animate([ backgroundColor, 'rgba(0,0,0,0)' ], duration );
        }
    }));

    return (
        <Animated.View style={{ position: 'absolute', display: 'flex', justifyContent: 'center', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: bgColor, ...style }}>
            <>
                { onPress && <Pressable style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} onPress={onPress}></Pressable> }
                { props.children }
            </>
        </Animated.View>
    );
});

export default Backdrop;