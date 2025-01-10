module.exports = {
  dependencies: {
    'RNScreens': {
      platforms: {
        ios: {
          podspecPath: '../node_modules/react-native-screens/RNScreens.podspec',
        },
      },
    },
    'RNGestureHandler': {
      platforms: {
        ios: {
          podspecPath: '../node_modules/react-native-gesture-handler/RNGestureHandler.podspec',
        },
      },
    },
    'RNReanimated': {
      platforms: {
        ios: {
          podspecPath: '../node_modules/react-native-reanimated/RNReanimated.podspec',
        },
      },
    },
  },
};