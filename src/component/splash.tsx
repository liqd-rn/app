import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

type Callback = () => void;

type SplashScreenProps =
{
    loading     : boolean
    duration?   : number
    style?      : StyleProp<ViewStyle>
    children    : React.ReactNode
    onReady     : Callback
}

const SplashScreen = ({ loading, duration = 0, children, style, onReady }: SplashScreenProps ) =>
{
    const created   = React.useRef( Date.now() );
    const ready     = React.useRef( !loading );

    React.useEffect(() =>
    {
        if( !loading && !ready.current )
        {
            ready.current = true;

            setTimeout( onReady, Math.max( 0, duration + created.current - Date.now()));
        }
    },
    [ loading ]);

    return <View style={[{ flex: 1 }, style ]}>{ children }</View>;
}

export { SplashScreen };
