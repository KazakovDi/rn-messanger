import React, {useEffect, useRef, useState} from 'react';
import {
  Button,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
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
import {useTheme} from '@rneui/themed';

const CreateActivity = ({navigation}) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state: RootState) => state.rooms.data);
  const [contactList, setContact] = useState([]);
  const bottomSheetRef = useRef();
  const nameRef = useRef();
  const telRef = useRef();
  const {theme} = useTheme();
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
        height={350}
        closeOnDragDown={true}
        dragFromTopOnly={true}
        customStyles={{
          container: {
            paddingVertical: 10,
            paddingHorizontal: 10,
            backgroundColor: theme.colors.bg,
          },
        }}
        ref={bottomSheetRef}>
        <Text
          style={{
            fontSize: 26,
            fontWeight: 'bold',
            color: theme.colors.primary,
          }}>
          Новый контакт
        </Text>
        <Text style={{color: theme.colors.icon}}>Имя</Text>
        <TextInput
          onChangeText={e => (nameRef.current.value = e)}
          ref={nameRef}
          inputMode="text"
          required
          style={{
            marginVertical: 5,
            borderWidth: 1,
            borderColor: theme.colors.icon,
            color: '#000',
          }}
          placeholder="Имя"
        />
        <Text style={{color: theme.colors.icon}}>Номер телефона</Text>
        <TextInput
          onChangeText={e => (telRef.current.value = e)}
          ref={telRef}
          inputMode="tel"
          required
          style={{
            marginVertical: 5,
            borderWidth: 1,
            borderColor: theme.colors.icon,
            color: '#000',
          }}
          placeholder="Телефон"
        />
        <Button
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
          }}
          title={'Добавить контакт'}
        />
      </RBSheet>
    </View>
  );
};

export default CreateActivity;
