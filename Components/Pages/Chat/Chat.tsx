import React from 'react';
import {View, Text, TouchableOpacity, FlatList, TextInput} from 'react-native';
import {Avatar} from '@rneui/themed';

import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faCircleArrowRight';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import ChatInput from '../../Functional/ChatInput/ChatInput';
import Message from '../../UI/Message';

import {RootState, useAppDispatch, useAppSelector} from '../../../store/store';
import {addMsg} from '../../../store/Room.slice';
const title = 'Олег';
const Chat = ({navigation: {navigate}, route}) => {
  const dispatch = useAppDispatch();
  const [msgs, roomId] = useAppSelector((state: RootState) => {
    for (let room of state.rooms.data) {
      if (room.id === route.params.roomId) return [room.msgs, room.id];
    }
  });

  const User = useAppSelector((state: RootState) => state.user.name);
  console.log('user', User);
  const sendMsgHandler = () => {
    dispatch(addMsg({user: User, body: 'body1', id: roomId}));
  };
  console.log(msgs);
  return (
    <View style={{display: 'flex', flex: 1}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <TouchableOpacity onPress={() => navigate('Home')}>
          <FontAwesomeIcon size={25} icon={faArrowLeft} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('Info')}>
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
          data={msgs}
          renderItem={({item}) => (
            <Message isUser={item.user === User} body={item.body} />
          )}
        />
      </View>
      <ChatInput onSendMsg={sendMsgHandler} />
    </View>
  );
};

export default Chat;
