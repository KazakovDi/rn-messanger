import React from 'react';
import {View, Text, TouchableOpacity, FlatList, TextInput} from 'react-native';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faCircleArrowRight';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Avatar} from '@rneui/themed';

import ChatInput from '../../Functional/ChatInput/ChatInput';
import Message from '../../UI/Message';
const title = 'Олег';
const fakeMsgs = [
  {user: 'Олег', body: 'Lorem Ipsum is simply dummy t'},
  {user: 'Ты', body: 'ext of the printing and '},
  {user: 'Олег', body: 'typesetting industry. Lo'},
  {user: 'Ты', body: 'rem Ipsum has b'},
  {user: 'Олег', body: 'een the industrys standard dummy text '},
  {user: 'Ты', body: 'ever since the 1500s, when an unknown'},
  {user: 'Олег', body: 'printer took a galley of type'},
  {user: 'Олег', body: 'and scrambled it to make'},
  {user: 'Ты', body: 'a type specimen book. It'},
  {user: 'Олег', body: 'has survived not only five centuries,'},
  {user: 'Ты', body: 'ut also the leap into electronic typesetting,'},
  {
    user: 'Олег',
    body: 'b remaining essentially unchanged. It was popularised ',
  },
  {
    user: 'Ты',
    body: ' in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,',
  },
  {user: 'Ты', body: ' and more recently with desktop '},
  {
    user: 'Олег',
    body: ' publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  },
];
const Chat = ({navigation}) => {
  return (
    <View style={{display: 'flex', flex: 1}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <FontAwesomeIcon size={25} icon={faArrowLeft} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Info')}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignContent: 'center',
              paddingVertical: 10,
              paddingLeft: 10,
            }}>
            <Avatar
              size={64}
              rounded
              title={title[0] + title[1]}
              containerStyle={{backgroundColor: '#6733b9'}}
            />
            <View style={{marginLeft: 15, paddingVertical: 6}}>
              <Text style={{fontWeight: 700}}>{title}</Text>
              <Text>Был(а) недавно</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{flexShrink: 2, marginHorizontal: 10}}>
        <FlatList
          keyExtractor={item => item.body}
          data={fakeMsgs}
          renderItem={({item}) => (
            <Message isUser={item.user === 'Ты'} body={item.body} />
          )}></FlatList>
      </View>
      <ChatInput />
    </View>
  );
};

export default Chat;
