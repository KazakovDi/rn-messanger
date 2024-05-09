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
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft';

import FloatingBtn from '../../Functional/FloatIcon/FloatingBtn';

import Contacts from 'react-native-contacts';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import InterestItem from '../../UI/InterestItem/InterestItem';
import RBSheet from '@poki_san/react-native-bottom-sheet';
import {RootState, useAppDispatch, useAppSelector} from '../../../store/store';
import {createChat} from '../../../store/Room.slice';
import {useTheme} from '@rneui/themed';
import NavBar from '../../Functional/NavBar/NavBar';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import Devider from '../../UI/Devider/Devider';

const CreateActivity = ({navigation}) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state: RootState) => state.rooms.data);
  const [contactList, setContact] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [isActive, setIsActive] = useState(false);
  const bottomSheetRef = useRef();
  const nameRef = useRef();
  const telRef = useRef();
  const filterInputRef = useRef();
  const {theme} = useTheme();
  useEffect(() => {
    if (filterValue === '') {
      request(PERMISSIONS.ANDROID.READ_CONTACTS).then(() => {
        Contacts.getAll().then(res => {
          const value = res.slice(0, 10);
          setContact(value);
        });
      });
    } else {
      const id = setTimeout(() => {
        const reg = new RegExp(filterValue, 'gi');
        const offers = contactList.filter(item => {
          return reg.test(item.displayName);
        });
        setContact(offers);
      }, 500);
      return () => {
        clearTimeout(id);
      };
    }
  }, [filterValue]);
  return (
    <View style={{flex: 1, backgroundColor: theme.colors.bgPrimary}}>
      <NavBar
        leftBtn={faArrowLeft}
        leftOnPress={isActive ? () => setIsActive(false) : navigation.goBack}
        rightBtn={isActive ? null : faMagnifyingGlass}
        rightOnPress={() => {
          setIsActive(true);
          filterInputRef.current.focus();
        }}>
        <TextInput
          value={filterValue}
          ref={filterInputRef}
          onChangeText={e => {
            setFilterValue(e);
          }}
          style={{opacity: isActive ? 1 : 0}}
          placeholder="Поиск"
        />
      </NavBar>
      <IconButton
        title={'Создать группу'}
        onPress={() => {
          navigation.navigate('Add_Members', {
            type: 'group',
            id: Math.random(),
          });
        }}
        icon={faUsers}
      />
      <IconButton
        title={'Создать канал'}
        onPress={() => navigation.navigate('Create_Chanel')}
        icon={faBullhorn}
      />
      <Devider title="" />
      <FlatList
        style={{marginHorizontal: 10}}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              for (let room of state) {
                if (room.name === item.displayName) {
                  navigation.navigate('Chat', {roomId: room.id});
                  return;
                }
              }
              const newRoomId = Math.random();
              dispatch(
                createChat({
                  name: item.displayName,
                  type: 'chat',
                  id: newRoomId,
                }),
              );
              navigation.navigate('Chat', {roomId: newRoomId});
            }}>
            <InterestItem msg="" title={item.displayName} />
          </TouchableOpacity>
        )}
        data={contactList}
      />
      <FloatingBtn
        icon={faUserPlus}
        Press={() => bottomSheetRef.current.open()}
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
            backgroundColor: theme.colors.bgPrimary,
          },
          wrapper: {
            backgroundColor: 'transparent',
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
          placeholderTextColor={theme.colors.primary}
          inputMode="text"
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
          placeholderTextColor={theme.colors.primary}
          ref={telRef}
          inputMode="tel"
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
              Contacts.addContact({
                givenName: nameRef.current.value,
                phoneNumbers: [{label: 'mobile', number: telRef.current.value}],
              })
                .then(res => {
                  const newRoomId = Math.random();
                  dispatch(
                    createChat({
                      name: nameRef.current.value,
                      type: 'chat',
                      id: newRoomId,
                      roomInfo: {
                        phoneNumber: {
                          label: 'Номер телефона',
                          data: telRef.current.value,
                        },
                      },
                    }),
                  );
                  navigation.navigate('Chat', {roomId: newRoomId});
                })
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
