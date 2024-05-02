import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, TextInput} from 'react-native';
import {Avatar, useTheme} from '@rneui/themed';

import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft';

// import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import ChatInput from '../../Functional/ChatInput/ChatInput';
import Message from '../../UI/Message';
// import {RNCamera} from 'react-native-camera';

import {RootState, useAppDispatch, useAppSelector} from '../../../store/store';
import {
  addMsg,
  addMedia,
  togglePinned,
  setVideo,
} from '../../../store/Room.slice';
import PinnedMessages from '../../Functional/PinnedMessages/PinnedMessages';
import NavBar from '../../Functional/NavBar/NavBar';
import FullScreen from '../../UI/FullScreen';
import MediaList from '../../Functional/MediaList/MediaList';
const Chat = ({navigation: {navigate, goBack}, route}) => {
  const dispatch = useAppDispatch();
  const {theme} = useTheme();
  // const [title, msgs, roomId, pinned, members]
  const {
    name: title,
    msgs,
    id: roomId,
    pinned,
    members,
    avatarUrl,
  } = useAppSelector((state: RootState) => {
    for (let room of state.rooms.data) {
      console.log('room', room);
      if (room.id === route.params.roomId) return room;
      // return [room.name, room.msgs, room.id, room.pinned, room.members];
    }
  });
  const User = useAppSelector((state: RootState) => state.user.name);
  const listRef = useRef(null);
  useEffect(() => {
    listRef.current.scrollToEnd();
  }, []);
  const sendMsgHandler = (msg: string, attached) => {
    dispatch(addMsg({user: User, body: msg, id: roomId}));
    dispatch(addMedia({user: User, roomId: roomId, attaches: attached}));
    listRef.current.scrollToEnd();
  };
  return (
    <>
      <FullScreen
        onClose={() => {
          dispatch(setVideo(''));
        }}
      />
      <View
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: theme.colors.chatBg,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            position: 'relative',
          }}>
          <NavBar leftBtn={faArrowLeft} leftOnPress={() => navigate('Home')}>
            <TouchableOpacity onPress={() => navigate('Info', {roomId})}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignContent: 'center',
                  paddingLeft: 10,
                }}>
                {avatarUrl ? (
                  <Avatar
                    size={64}
                    rounded
                    source={{uri: avatarUrl}}
                    containerStyle={{backgroundColor: '#6733b9'}}
                  />
                ) : (
                  <Avatar
                    size={64}
                    rounded
                    title={title[0] + title[1]}
                    containerStyle={{backgroundColor: '#6733b9'}}
                  />
                )}

                <View style={{marginLeft: 15, paddingVertical: 6}}>
                  <Text style={{fontWeight: '700'}}>{title}</Text>
                  <Text>Был(а) недавно</Text>
                  <Text>
                    {members?.length ? members?.length + ' Участников' : ''}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </NavBar>

          <PinnedMessages
            onPress={key => {
              for (let index = 0; index < msgs.length; index++) {
                if (msgs[index].timestamp == key) {
                  listRef.current.scrollToIndex({index});
                  break;
                }
              }
            }}
            pinned={pinned}
          />
        </View>

        <View style={{flex: 1, flexGrow: 2, marginHorizontal: 10}}>
          <FlatList
            style={{paddingTop: 35}}
            ref={listRef}
            keyExtractor={(item, index) => item.timestamp}
            data={msgs}
            renderItem={({item, index}) => (
              <Message
                key={item.timestamp}
                onLongPress={() => {
                  dispatch(
                    togglePinned({
                      roomId,
                      key: item.timestamp,
                      body: item.body,
                    }),
                  );
                }}
                isUser={item.user === User}
                type={item.type}
                uri={item.uri}
                body={item.body}
              />
            )}
            getItemLayout={(data, index) => ({
              length: 50,
              offset: 500 * index,
              index,
            })}
          />
        </View>

        <ChatInput onSendMsg={sendMsgHandler} />
      </View>
    </>
  );
};

export default Chat;
