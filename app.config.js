const appName = process.env.EXPO_PUBLIC_APP_NAME || 'App';

export default {
  expo: {
    name: appName,
    slug: "aziz",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "automatic",
    ios: {
      supportsTablet: true,
      infoPlist: {
        UIUserInterfaceStyle: "automatic"
      }
    },
    android: {
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/android-icon-foreground.png",
        backgroundImage: "./assets/android-icon-background.png",
        monochromeImage: "./assets/android-icon-monochrome.png"
      },
      userInterfaceStyle: "automatic"
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    plugins: [
      "expo-status-bar"
    ],
    extra: {
      EXPO_PUBLIC_APP_NAME: appName
    }
  }
};