import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {Button, ThemeProvider, Avatar} from '@rneui/themed';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import InfoItem from '../../UI/InfoItem/InfoItem';
const title = 'Олег';
const dataUser = [
  {body: '+367676437', key: 1, description: 'Телефон'},
  {body: '@CoolGuy', key: 2, description: 'Имя пользователя'},
];
const dataChannel = [
  {body: 't.me/fake123', key: 1, description: 'Ссылка-приглашение'},
];
const ActivityInfo = ({navigation}) => {
  return (
    <View
      style={{
        marginHorizontal: 20,
        marginTop: 20,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <FontAwesomeIcon size={25} icon={faArrowLeft} />
        </TouchableOpacity>
        <Avatar
          size={64}
          rounded
          title={title[0] + title[1]}
          containerStyle={{backgroundColor: '#6733b9'}}
        />
        <View style={{marginLeft: 15, paddingVertical: 6}}>
          <Text style={{fontWeight: 700}}>{title}</Text>
          <Text style={{color: '#c7c7c7'}}>Был(а) недавно</Text>
        </View>
      </View>
      <View style={{paddingVertical: 10}}>
        <FlatList
          renderItem={({item}) => (
            <InfoItem body={item.body} description={item.description} />
          )}
          data={dataUser}
        />

        <InfoItem
          body={'Уведомления'}
          description="Вкл/Выкл"
          onToggle={() => {
            console.log('toggle');
          }}
        />
      </View>
    </View>
  );
};

export default ActivityInfo;
