import React, {useEffect, useState} from 'react';
import {View, FlatList, TouchableOpacity, Text, TextInput} from 'react-native';
import {findActivities} from '../../../store/Room.slice';
import {RootState, useAppDispatch, useAppSelector} from '../../../store/store';
import {Input, Button} from '@rneui/themed';
import InterestItem from '../../UI/InterestItem/InterestItem';
import NavBar from '../../Functional/NavBar/NavBar';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft';

const Find = ({navigation}) => {
  const dispatch = useAppDispatch();
  const finded = useAppSelector((state: RootState) => state.rooms.find);
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    const id = setTimeout(() => {
      dispatch(findActivities({filter: filterValue}));
      return () => {
        clearTimeout(id);
      };
    }, 700);
  }, [filterValue]);
  return (
    <View style={{flex: 1, paddingHorizontal: 5}}>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <NavBar
          leftBtn={faArrowLeft}
          leftOnPress={() => {
            navigation.navigate('Home');
          }}>
          <TextInput
            value={filterValue}
            onChangeText={e => {
              setFilterValue(e);
            }}
            placeholder="Поиск"
            style={{borderWidth: 1, borderColor: 'red'}}
          />
        </NavBar>
      </View>
      <Text style={{paddingVertical: 5, backgroundColor: '#c3c3c3'}}>
        Совпадения:
      </Text>
      <FlatList
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Chat', {roomId: item.id});
            }}>
            <InterestItem
              title={item.name}
              msg={item.msgs.length ? item.msgs[item.msgs.length - 1].body : ''}
            />
          </TouchableOpacity>
        )}
        data={finded}></FlatList>
    </View>
  );
};

export default Find;
