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
import CreateChanel from './Components/Pages/CreateChanel/CreateChanel';
import ChanelSettings from './Components/Pages/ChanelSettings/ChanelSeetings';
import AddMembers from './Components/Pages/AddMembers/AddMembers';
import CreateGroup from './Components/Pages/CreateGroup/CreateGroup';

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
    bgPrimary: '#fff',
    bgSecondary: '#edf1f7',
    msg: '#00ADB5',
    msgOpposite: '#F38181',
    header: '#3490DE',
    chatbgPrimary: '#E3FDFD',
    icon: '#c7bfbf',
    pinnedbgPrimary: '#76ABAE',
  },
  darkColors: {
    primary: '#fff',
    primaryLight: '#56595c',
    secondary: '#222831',
    bgPrimary: '#2e2e2e',
    bgSecondary: '#121212',
    msg: '#393E46',
    msgOpposite: '#364F6B',
    header: '#40514E',
    chatbgPrimary: '#3E4149',
    icon: '#c3c3c3',
    pinnedbgPrimary: '#31363F',
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
              <Stack.Screen name="Info" component={ActivityInfo} />

              <Stack.Screen
                name="Chat"
                component={Chat}
                roomId={({params}) => params.roomId}
              />
              <Stack.Screen name="Home" component={ChatsList} />
              <Stack.Screen name="Find" component={Find} />
              <Stack.Screen name="Create_Chanel" component={CreateChanel} />
              <Stack.Screen name="Create_Group" component={CreateGroup} />
              <Stack.Screen name="Add_Members" component={AddMembers} />
              <Stack.Screen name="Chanel_Settings" component={ChanelSettings} />
              <Stack.Screen name="Create" component={CreateActivity} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </ThemeProvider>
    </SafeAreaView>
  );
}

export default App;
