import React from 'react';
import { GestureResponderEvent, Pressable as RNPressable, PressableProps as RNPressableProps } from 'react-native';
import { NOOP } from '../helper';

interface PressableProps extends RNPressableProps
{
    debounce    ?: number
    timeout     ?: number
};

type HandlerResult = Promise<any> | any | undefined;

function awaitResult( result: HandlerResult, promises: Array<Promise<any>> )
{
    if( result && result instanceof Promise )
    {
        const index = promises.length;

        promises.push( result.catch( NOOP ).finally(() => promises.splice( index, 1 )));
    }
}

const Pressable = ({ onPress, onPressIn, onPressOut, onLongPress, debounce = 0, timeout = 30000, children, ...props }: PressableProps ) =>
{
    const promises          = React.useRef(new Array<Promise<any>>());
    const disabled          = React.useRef(false);
    const lastPressOutTime  = React.useRef(0);

    const onPressInHandler = ( event: GestureResponderEvent ) =>
    {
        if(( disabled.current = ( promises.current.length > 0 || lastPressOutTime.current + debounce > Date.now() ))){ return }
        
        awaitResult( onPressIn?.( event ), promises.current );
    };

    const onPressHandler = ( event: GestureResponderEvent ) => !disabled.current && awaitResult( onPress?.( event ), promises.current );
    const onLongPressHandler = ( event: GestureResponderEvent ) => !disabled.current && awaitResult( onLongPress?.( event ), promises.current );

    const onPressOutHandler = ( event: GestureResponderEvent ) => 
    {
        if( disabled.current ){ return }

        lastPressOutTime.current = Date.now();

        awaitResult( onPressOut?.( event ), promises.current );

        if( promises.current.length > 0 && timeout )
        {
            setTimeout(() => promises.current = new Array(), timeout );
        }
    }

    return (
        <RNPressable onPress={onPressHandler} onPressIn={onPressInHandler} onPressOut={onPressOutHandler} onLongPress={onLongPressHandler} {...props}>
            {children}
        </RNPressable>
    );
};

export { Pressable };
