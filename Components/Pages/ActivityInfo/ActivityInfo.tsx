import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {useTheme, Avatar} from '@rneui/themed';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import InfoItem from '../../UI/InfoItem/InfoItem';
import NavBar from '../../Functional/NavBar/NavBar';
import {RootState, useAppDispatch, useAppSelector} from '../../../store/store';
import MediaList from '../../Functional/MediaList/MediaList';
import FullScreen from '../../UI/FullScreen';
import {removeMediaScreen} from '../../../store/Room.slice';

const ActivityInfo = ({navigation, route}) => {
  const dispatch = useAppDispatch();
  const {theme} = useTheme();

  const {
    name: title,
    media: mediaData,
    avatarUrl,
    roomInfo,
  } = useAppSelector((state: RootState) => {
    for (let room of state.rooms.data) {
      if (room.id === route.params.roomId) return room;
    }
  });

  const covertedRoomInfo = Object.keys(roomInfo);

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.bgPrimary}}>
      <FullScreen
        media={mediaData}
        onClose={() => dispatch(removeMediaScreen())}
      />
      <NavBar leftBtn={faArrowLeft} leftOnPress={navigation.goBack}>
        <View
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
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
            <Text style={{color: theme.colors.primary, fontWeight: '700'}}>
              {title}
            </Text>
            <Text style={{color: theme.colors.primary}}>Был(а) недавно</Text>
          </View>
        </View>
      </NavBar>

      <View
        style={{
          paddingVertical: 10,
          backgroundColor: theme.colors.bgSecondary,
        }}>
        <FlatList
          renderItem={({item}) => (
            <InfoItem
              onToggle={() => {}}
              body={roomInfo[item].label}
              description={roomInfo[item].data}
            />
          )}
          data={covertedRoomInfo}
        />

        <InfoItem
          body={'Уведомления'}
          description="Вкл/Выкл"
          onToggle={() => {
            console.log('toggle');
          }}
        />
      </View>

      <MediaList isEditible={false} isHorizontal={false} data={mediaData} />
    </View>
  );
};

export default ActivityInfo;
