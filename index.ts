import { registerRootComponent } from 'expo';
import { Platform } from 'react-native';
import App from './App';

// Inject theme persistence script on web to prevent flash of wrong theme
if (Platform.OS === 'web' && typeof document !== 'undefined') {
  (function() {
    try {
      var stored = localStorage.getItem('aether_theme_mode');
      if (stored === 'dark') {
        document.documentElement.style.backgroundColor = '#101415';
      }
    } catch(e) {}
  })();
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);