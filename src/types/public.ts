import type { NativeStackNavigatorProps } from '@react-navigation/native-stack';
import type { BottomTabNavigatorProps } from '@react-navigation/bottom-tabs';

export type AppSplashOnreadyProps = 
{
    delay?      : number
    duration?   : number
    animation?  : 'fade' | 'slide' | 'zoom'
}

export type AppSplashProps = 
{
    onReady: ( props: AppSplashOnreadyProps ) => void
}

export type AppNavigationScreen =
{
    name        : string
    screen      : React.ComponentType<any>
    options?    : any
}

type AppBaseNavigation =
{
    name        : string,
    screens     : ( AppNavigation | AppNavigationScreen )[]
}

export type AppTabNavigation = AppBaseNavigation &
{
    type        : 'tab'
    options?    : BottomTabNavigatorProps['screenOptions']
}

export type AppStackNavigation = AppBaseNavigation &
{
    type        : 'stack'
    options?    : NativeStackNavigatorProps['screenOptions']
}

export type AppNavigation = ( AppTabNavigation | AppStackNavigation )

export type AppNavigationRouteParams<T> = T extends ( props: infer P, ...args: any[]) => any
    ? P extends { route: { params: infer Params }}
        ? Params
        : never
    : never;
