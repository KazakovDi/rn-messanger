import React, {useEffect, useState} from 'react';
import {FlatList, Text, TextInput, TouchableOpacity, View} from 'react-native';
import NavBar from '../../Functional/NavBar/NavBar';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons/faArrowRight';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Contacts from 'react-native-contacts';

import FloatingBtn from '../../Functional/FloatIcon/FloatingBtn';
import {RootState, useAppDispatch, useAppSelector} from '../../../store/store';
import InterestItem from '../../UI/InterestItem/InterestItem';
const AddMembers = ({navigation}) => {
  const [members, setMembers] = useState([]);
  const [contactList, setContact] = useState([]);
  const [filterInputValue, setFilterInputValue] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (filterInputValue === '') {
      request(PERMISSIONS.ANDROID.READ_CONTACTS).then(() => {
        Contacts.getAll().then(res => {
          const value = res.slice(0, 10);
          setContact(value);
        });
      });
    } else {
      const id = setTimeout(() => {
        const reg = new RegExp(filterInputValue, 'gi');
        const offers = contactList.filter(item => {
          return reg.test(item.displayName);
        });
        setContact(offers);
      }, 500);
      return () => {
        clearTimeout(id);
      };
    }
  }, [filterInputValue]);
  return (
    <View style={{flex: 1}}>
      <NavBar leftBtn={faArrowLeft} leftOnPress={navigation.goBack}>
        <View>
          <Text style={{marginLeft: 20, color: '#fff', fontWeight: '700'}}>
            Создать канал
          </Text>
          <Text>{members.length} участников</Text>
        </View>
      </NavBar>
      <TextInput value={filterInputValue} onChangeText={setFilterInputValue} />
      <FlatList
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              const newMembers = members.filter(
                member => item.displayName !== member,
              );
              if (newMembers.length === members.length) {
                setMembers([...newMembers, item.displayName]);
              } else {
                setMembers(newMembers);
              }
            }}>
            <InterestItem msg="" title={item.displayName} />
          </TouchableOpacity>
        )}
        data={contactList}
      />
      <FloatingBtn
        Press={() => {
          navigation.navigate('Home');
          dispatch(editChanel({members}));
        }}
        icon={faArrowRight}
        pos={{right: 10, bottom: 15}}
      />
    </View>
  );
};

export default AddMembers;
