import React from 'react';
import { Text, View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Is } from '../helper';
//import { Is } from '../helper';

type HeaderProps = (
{
    style?      : StyleProp<ViewStyle>
    leftIcons?  : React.ReactNode
    rightIcons? : React.ReactNode
    panel?      : React.ReactNode
    tabs?       : React.ReactNode
} &
(
    | {
        title?: string, subtitle?: string
    } |
    {
        children: React.ReactNode
    }
))

const Header = ({ style, panel, tabs, leftIcons, rightIcons, ...props }: HeaderProps ): React.JSX.Element =>
{
    return (
        <View style={[ styles.header, style ]}>
            { !( Is( leftIcons ) || Is( rightIcons ) || ( 'children' in props && Is( props.children )) || ( 'title' in props )) ? undefined : (
                <View style={styles.wrap}>
                    { Is( leftIcons ) || Is( rightIcons ) ? <View style={styles.leftIcons}>{ leftIcons }</View> : undefined }
                    { 'children' in props
                        ? <View style={styles.customContent}>{props.children}</View>
                        : 'title' in props
                            ? (
                                <View style={styles.content}>
                                    <Text>{ props.title }</Text>
                                    { 'subtitle' in props && <Text>{ props.subtitle }</Text> }
                                </View>
                            )
                            : undefined
                    }
                    { Is( leftIcons ) || Is( rightIcons ) ? <View style={styles.rightIcons}>{ rightIcons }</View> : undefined }
                </View>
            )}
            { panel }
            { tabs }
        </View>
    );
}

export { Header };

const styles = StyleSheet.create(
{
    header:
    {
        display         : 'flex',
        flexDirection   : 'column',
        flexGrow        : 0,
        flexShrink      : 0,
    },
    wrap:
    {
        display         : 'flex',
        flexDirection   : 'row',
        flexGrow        : 0,
        flexShrink      : 0,
        //backgroundColor : 'lightgray',
        gap             : 20,
    },
    leftIcons: {
        //flex: 1,
        flexGrow: 1,
        flexShrink: 0,
        flexBasis: 'auto',
        //flexBasis: 0,
        flexWrap: 'nowrap',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        //backgroundColor: 'lightblue',
    },
    content: {
        display: 'flex',
        flexGrow: 0,
        flexShrink: 1,
        flexWrap: 'wrap',
        flexBasis: 'auto',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'lightgreen',
    },
    rightIcons: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 'auto',
        //flexBasis: 0,
        flexWrap: 'nowrap',
        //alignSelf:'stretch',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
        //backgroundColor: 'lightcoral',
    },
    customContent: 
    {
        flex            : 2,
    },
});
