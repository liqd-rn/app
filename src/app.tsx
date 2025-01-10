import React from 'react';
import { View, StatusBar } from 'react-native';

import { NavigationContainer, NavigationContainerRef, ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AppNavigation, AppSplashOnreadyProps, AppStackNavigation, AppTabNavigation } from './types/public';

import Style from './style';
import Overlay from './overlay';

export * from './helper';
export * from './component';
export * from './types/public';

//import Overlay from '../overlay';
//import Context from './context';

//@ts-ignore
let globalOverlayRef, rootNavigationRef = React.createRef<NavigationContainerRef<ParamListBase>>();

const createTabNavigation = ( navigation: AppTabNavigation ) =>
{
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator screenOptions={{ headerShown: false, ...navigation.options }}>
        {
            navigation.screens.map( screen => 
            <Tab.Screen 
                key={ screen.name } 
                name={ screen.name }
                component={ 'screen' in screen ? screen.screen : () => createNavigation( screen )}
                options={ screen.options }
            />
        )}
        </Tab.Navigator>
    );
}

const createStackNavigation = ( navigation: AppStackNavigation ) =>
{
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false, ...navigation.options }}>
        {
            navigation.screens.map( screen => 
            <Stack.Screen 
                key={ screen.name } 
                name={ screen.name }
                component={ 'screen' in screen ? screen.screen : () => createNavigation( screen )}
                options={ screen.options }
            />
        )}
        </Stack.Navigator>
    );
}

const createNavigation = ( navigation: AppNavigation ) =>
{
    switch( navigation.type )
    {
        case 'tab'  : return createTabNavigation( navigation );
        case 'stack': return createStackNavigation( navigation );
    }
    
    throw new Error( 'Invalid navigation type' );
}

/*const AppGlobal = 
{
    Overlay: new Proxy({}, { get: ( _, property ) => globalOverlayRef?.current?.[property]}),
    RootNavigator: new Proxy({}, { get: ( _, property ) => rootNavigationRef?.current?.[property]}),
}*/

// TODO status bar color StatusBar.setBarStyle('light-content');

//@ts-ignore
/*const App = ({ Splash, navigation, context, bar }) => 
{
    const splashRef = React.useRef(null);
    const overlayRef = globalOverlayRef = React.useRef(null);
    const overlay = new Proxy( overlayRef, { get: ( _, property ) => overlayRef?.current?.[property] });

    const [ loading, setLoading ] = React.useState(!!Splash);

    React.useEffect(() =>
    {
        if( splashRef.current && 'onReady' in splashRef.current )
        {
            //@ts-ignore
            splashRef.current.onReady(() => setLoading(false));
        }
        else if( Splash )
        {
            setTimeout(() => setLoading(false), 3500 );
        }
    },
    []);

    return (
        <>
            <StatusBar barStyle={ bar ?? "dark-content" } backgroundColor="transparent" />
            <MainContext.Provider value={{ ...context, overlay }}>
                <View style={ Style.wrapper }>
                    <View style={ Style.wrapper }>
                        { !loading && (
                            <NavigationContainer ref={rootNavigationRef}>
                                { createNavigation( navigation )}
                            </NavigationContainer>
                        )}
                    </View>
                    <Overlay ref={overlayRef}/>
                    { loading && (
                        <View style={ Style.wrapper }>
                            <Splash ref={splashRef} />
                        </View>
                    )}
                </View>
            </MainContext.Provider>
        </>
    );
}

export default App;
export { AppGlobal };*/

export type AppRootProps =
{
    //context     : any
    splash?     : React.ComponentType<any>,
    navigation  : AppNavigation
}

export default class App
{
    /*private static overlay      : MutableRefObject<any|undefined> | undefined;
    private static navigation   : MutableRefObject<any|undefined> | undefined;

    public get Splash(){ return App.overlay!.current }
    public get Overlay(){ return App.overlay!.current }
    public get Navigation(){ return App.navigation!.current }*/

    /*public static Component({ Splash, navigation, context, bar })
    {
        const splashRef = React.useRef(null);
        const overlayRef = globalOverlayRef = React.useRef(null);
        
        App.navigation = useRef(navigation);
        App.overlay = useRef<any>();

        const [ loading, setLoading ] = React.useState(!!Splash);

        React.useEffect(() =>
        {
            if( splashRef.current && 'onReady' in splashRef.current )
            {
                //@ts-ignore
                splashRef.current.onReady(() => setLoading(false));
            }
            else if( Splash )
            {
                setTimeout(() => setLoading(false), 3500 );
            }
        },
        []);

        // TODO zo statusBaru spravit komponent a forwardRef volat zmenu stavu

        return (
            <>
                <StatusBar barStyle={ bar ?? "dark-content" } backgroundColor="transparent" />
                <View style={ Style.wrapper }>
                    <View style={ Style.wrapper }>
                        { !loading && (
                            <NavigationContainer ref={rootNavigationRef}>
                                { createNavigation( navigation )}
                            </NavigationContainer>
                        )}
                    </View>
                    <Overlay ref={overlayRef}/>
                    { loading && (
                        <View style={ Style.wrapper }>
                            <Splash ref={splashRef} />
                        </View>
                    )}
                </View>
            </>
        );
    }*/


    private static navigation = React.createRef<NavigationContainerRef<ParamListBase>>();

    public static get Navigation()
    {
        return (
        {
            navigate: ( name: string, params?: any ) => App.navigation.current?.navigate( name, params ),
            reset   : () => App.navigation.current?.resetRoot()
        })
    }

    public static Root({ splash, navigation }: AppRootProps ): React.JSX.Element
    {
        const Splash = splash;
        const [ initialized, setInitialized ] = React.useState( !Splash );
        const onReady = React.useCallback(( _: AppSplashOnreadyProps ) => setInitialized( true ), []);

        return (
            <>
                <StatusBar barStyle="dark-content" backgroundColor="transparent" />
                <View style={ Style.wrapper }>
                    { initialized && 
                        <NavigationContainer ref={ App.navigation }>
                            { createNavigation( navigation )}
                        </NavigationContainer>
                    }
                    { !initialized && Splash && 
                        <View style={ Style.wrapper }>
                            <Splash onReady={ onReady } />
                        </View>
                    }
                    <Overlay />
                </View>
            </>
        );
    }
}