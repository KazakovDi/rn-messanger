/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {ThemeProvider} from '@rneui/themed';
import InterestsList from './Components/Functional/InterestsList/InterestsList';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaView, ScrollView} from 'react-native';
import ChatsList from './Components/Pages/ChatsList/ChatsList';
import Chat from './Components/Pages/Chat/Chat';
import ActivityInfo from './Components/Pages/ActivityInfo/ActivityInfo';
import {Provider} from 'react-redux';
import store from './store/store';
const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Info" component={ActivityInfo}></Stack.Screen>

            <Stack.Screen
              name="Chat"
              component={Chat}
              roomId={({params}) => params.roomId}></Stack.Screen>
            <Stack.Screen name="Home" component={ChatsList}></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaView>
  );
}

export default App;
