import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {useTheme, Avatar} from '@rneui/themed';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import InfoItem from '../../UI/InfoItem/InfoItem';
import NavBar from '../../Functional/NavBar/NavBar';
import {RootState, useAppSelector} from '../../../store/store';
import MediaList from '../../Functional/MediaList/MediaList';

const dataUser = [
  {body: '+367676437', key: 1, description: 'Телефон'},
  {body: '@CoolGuy', key: 2, description: 'Имя пользователя'},
];
const ActivityInfo = ({navigation, route}) => {
  const {theme} = useTheme();
  const [title, mediaData] = useAppSelector((state: RootState) => {
    for (let room of state.rooms.data) {
      if (room.id === route.params.roomId) {
        return [room.name, room.media];
      }
    }
  });
  console.log('activity', mediaData);
  return (
    <View>
      <NavBar
        leftBtn={faArrowLeft}
        leftOnPress={() => {
          navigation.goBack();
        }}>
        <View
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Avatar
            size={64}
            rounded
            title={title[0] + title[1]}
            containerStyle={{backgroundColor: '#6733b9'}}
          />
          <View style={{marginLeft: 15, paddingVertical: 6}}>
            <Text style={{color: theme.colors.primary, fontWeight: '700'}}>
              {title}
            </Text>
            <Text style={{color: theme.colors.primary}}>Был(а) недавно</Text>
          </View>
        </View>
      </NavBar>

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
      <MediaList data={mediaData} />
    </View>
  );
};

export default ActivityInfo;
