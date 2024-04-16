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
const CreateActivity = () => {
  const [contactList, setContact] = useState([]);
  console.log('c', contactList);
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
          <InterestItem msg="" title={item.displayName} />
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
