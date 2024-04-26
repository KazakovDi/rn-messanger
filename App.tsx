/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {ThemeProvider, createTheme} from '@rneui/themed';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaView, ScrollView} from 'react-native';
import ChatsList from './Components/Pages/ChatsList/ChatsList';
import Chat from './Components/Pages/Chat/Chat';
import ActivityInfo from './Components/Pages/ActivityInfo/ActivityInfo';
import {Provider} from 'react-redux';
import store from './store/store';
import CreateActivity from './Components/Pages/CreateActivity/CreateActivity';
import Find from './Components/Pages/Find/Find';

const Stack = createNativeStackNavigator();

const config = {
  screens: {
    Chat: 'chat/:roomId',
  },
};
const theme = createTheme({
  mode: 'light',
  lightColors: {
    primary: '#222831',
    primaryLight: '#56595c',
    secondary: '#fff',
    bg: '#fff',
    msg: '#00ADB5',
    msgOpposite: '#F38181',
    header: '#3490DE',
    chatBg: '#E3FDFD',
    icon: '#c7bfbf',
    pinnedBg: '#76ABAE',
  },
  darkColors: {
    primary: '#fff',
    primaryLight: '#56595c',
    secondary: '#222831',
    bg: '#222831',
    msg: '#393E46',
    msgOpposite: '#364F6B',
    header: '#40514E',
    chatBg: '#3E4149',
    icon: '#c3c3c3',
    pinnedBg: '#31363F',
  },
});
function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <NavigationContainer linking={{config}}>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
              initialRouteName="Home">
              <Stack.Screen name="Info" component={ActivityInfo}></Stack.Screen>

              <Stack.Screen
                name="Chat"
                component={Chat}
                roomId={({params}) => params.roomId}></Stack.Screen>
              <Stack.Screen name="Home" component={ChatsList}></Stack.Screen>
              <Stack.Screen name="Find" component={Find}></Stack.Screen>
              <Stack.Screen
                name="Create"
                component={CreateActivity}></Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </ThemeProvider>
    </SafeAreaView>
  );
}

export default App;
