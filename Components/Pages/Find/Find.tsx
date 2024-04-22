import React, {useEffect, useState} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import {findActivities} from '../../../store/Room.slice';
import {RootState, useAppDispatch, useAppSelector} from '../../../store/store';
import {Input, Button} from '@rneui/themed';
import InterestItem from '../../UI/InterestItem/InterestItem';

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
    <View style={{flex: 1}}>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Input
          value={filterValue}
          onChangeText={e => {
            setFilterValue(e);
          }}
          placeholder="Поиск"
        />
      </View>
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
