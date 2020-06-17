import * as React from 'react'
import { BackHandler, Platform } from 'react-native'
import { connect } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LaunchScreen from '../Containers/LaunchScreen';
import LoginScreen from '../Containers/LoginScreen';
import HomeScreen from '../Containers/HomeScreen';
import ForgotScreen from '../Containers/ForgotScreen';
import ChangePassScreen from '../Containers/ChangePassScreen';
import SettingScreen from '../Containers/SettingScreen';
import ProfileScreen from '../Containers/ProfileScreen';
const Stack = createStackNavigator();

export const ScreenNames = {
  LaunchScreen: "LAUNCH_SCREEN",
  Login: "LOGIN",
  Home: 'HOME',
  Forgot: 'FORGOT',
  ChangePass:'CHANGEPASS',
  Setting:'SETTING',
  Profile:'PROFILE',
};

class AppNavigation extends React.Component {
  componentDidMount() {
    if (Platform.OS === 'ios') return
    BackHandler.addEventListener('hardwareBackPress', () => {
      const { dispatch, nav } = this.props
      // change to whatever is your first screen, otherwise unpredictable results may occur
      if (nav.routes.length === 1 && (nav.routes[0].routeName === 'LaunchScreen')) {
        return false
      }
      // if (shouldCloseApp(nav)) return false
      dispatch({ type: 'Navigation/BACK' })
      return true
    })
  }

  componentWillUnmount() {
    if (Platform.OS === 'ios') return
    BackHandler.removeEventListener('hardwareBackPress', undefined)
  }

  render() {
    return <NavigationContainer>
      <Stack.Navigator headerMode={"none"}>
      <Stack.Screen name={ScreenNames.Login} component={LoginScreen} />
        <Stack.Screen name={ScreenNames.ChangePass} component ={ChangePassScreen}/>
        <Stack.Screen name={ScreenNames.Forgot} component={ForgotScreen}/>
        <Stack.Screen name={ScreenNames.Home} component={HomeScreen} />
        <Stack.Screen name={ScreenNames.Setting} component={SettingScreen}/>
        <Stack.Screen name={ScreenNames.Profile}  component={ProfileScreen}></Stack.Screen>
        <Stack.Screen name={ScreenNames.LaunchScreen} component={LaunchScreen} />
      </Stack.Navigator>
    </NavigationContainer>;
  }
}

const mapStateToProps = state => ({
  nav: state.nav
})
export default connect(mapStateToProps)(AppNavigation)
