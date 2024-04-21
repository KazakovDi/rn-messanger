import React, {useEffect, useRef, useState} from 'react';
import {FlatList, Text, TextInput, TouchableOpacity, View} from 'react-native';
import IconButton from '../../Functional/IconButton/IconButton';
import {faUsers} from '@fortawesome/free-solid-svg-icons/faUsers';
import {faBullhorn} from '@fortawesome/free-solid-svg-icons/faBullhorn';
import {faUserPlus} from '@fortawesome/free-solid-svg-icons/faUserPlus';

import FloatingBtn from '../../Functional/FloatIcon/FloatingBtn';

import Contacts from 'react-native-contacts';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import InterestItem from '../../UI/InterestItem/InterestItem';
import RBSheet from '@poki_san/react-native-bottom-sheet';
import {RootState, useAppDispatch, useAppSelector} from '../../../store/store';
import {createChat} from '../../../store/Room.slice';
import {linkRoom} from '../../../store/User.slice';
const CreateActivity = ({navigation}) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state: RootState) => state.rooms.data);
  const [contactList, setContact] = useState([]);
  const bottomSheetRef = useRef();
  const nameRef = useRef();
  const telRef = useRef();
  useEffect(() => {
    request(PERMISSIONS.ANDROID.READ_CONTACTS).then(() => {
      Contacts.getAll().then(res => {
        setContact(res);
      });
    });
  }, []);
  return (
    <View style={{flex: 1}}>
      <IconButton
        title={'Создать группу'}
        onPress={() => console.log('press')}
        icon={faUsers}
      />
      <IconButton
        title={'Создать канал'}
        onPress={() => console.log('press')}
        icon={faBullhorn}
      />
      <FlatList
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              for (let room of state) {
                console.log('room', room);
                if (room.name === item.displayName) {
                  navigation.navigate('Chat', {roomId: room.id});
                  return;
                }
              }
              const newRoomId = Math.random();
              dispatch(createChat({name: item.displayName, id: newRoomId}));
              dispatch(linkRoom({id: newRoomId}));
              navigation.navigate('Chat', {roomId: newRoomId});
            }}>
            <InterestItem msg="" title={item.displayName} />
          </TouchableOpacity>
        )}
        data={contactList}
      />
      <FloatingBtn
        icon={faUserPlus}
        onPress={() => bottomSheetRef.current.open()}
        pos={{right: 10, bottom: 15}}
      />
      <RBSheet
        animationType="slide"
        openDuration={500}
        height={500}
        closeOnDragDown={true}
        dragFromTopOnly={true}
        ref={bottomSheetRef}>
        <View />
        <TextInput
          onChangeText={e => (nameRef.current.value = e)}
          ref={nameRef}
          inputMode="text"
          required
          style={{color: '#000'}}
          placeholder="Имя"
        />
        <TextInput
          onChangeText={e => (telRef.current.value = e)}
          ref={telRef}
          inputMode="tel"
          required
          style={{color: '#000'}}
          placeholder="Телефон"
        />
        <TouchableOpacity
          onPress={() => {
            request(PERMISSIONS.ANDROID.WRITE_CONTACTS).then(res => {
              console.log('res', nameRef.current.value, telRef.current.value);
              Contacts.addContact({
                givenName: nameRef.current.value,
                phoneNumbers: [{label: 'mobile', number: telRef.current.value}],
              })
                .then(res => console.log('res', res))
                .catch(err => console.log('err', err));
            });
          }}>
          <Text style={{color: 'red'}}>Добавить контакт</Text>
        </TouchableOpacity>
      </RBSheet>
    </View>
  );
};

export default CreateActivity;
