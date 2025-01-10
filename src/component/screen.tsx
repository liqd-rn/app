import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
//import { Is } from '../helper';

/*

pointerEvents:
React Native uses this property to control how views respond to touch events.
Options:
none: Allows events to pass through the view.
box-none

*/

type ScreenProps =
{
    style?      : StyleProp<ViewStyle>
    children    : React.ReactNode
    header?     : React.ReactNode
    footer?     : React.ReactNode
    bottomTabs? : React.ReactNode
}

const Screen = ({ style, children, header, footer, bottomTabs }: ScreenProps ): React.JSX.Element =>
{
    return (
        <View style={[ styles.screen, style ]}>
            { header }
            <View style={{ flex: 1, backgroundColor: 'silver' }}>
                { children }
            </View>
            { footer }
            { bottomTabs }
        </View>
    );
}

export { Screen };

const styles = StyleSheet.create(
{
    screen:
    {
        flex            : 1,
        flexDirection   : 'column',
        alignItems      : 'stretch',
    },
});
