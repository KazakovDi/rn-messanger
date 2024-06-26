import React, {useEffect, useState} from 'react';
import {View, FlatList, Image, Touchable, TouchableOpacity} from 'react-native';
import {removeMediaScreen, setMediaScreen} from '../../../store/Room.slice';
import {useAppDispatch} from '../../../store/store';
import Video from 'react-native-video';
import FullScreen from '../../UI/FullScreen';
import {faXmark} from '@fortawesome/free-solid-svg-icons/faXmark';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
const MediaList = ({
  data,
  isHorizontal,
  isEditible,
  onEditList,
}: {
  data: string[];
  isHorizontal: boolean;
  isEditible: boolean;
  onEditList?: (index: number) => void;
}) => {
  const dispatch = useAppDispatch();

  const handleEdit = index => {
    if (onEditList) onEditList(index);
  };
  return (
    <FlatList
      numColumns={isHorizontal ? 0 : 3}
      horizontal={isHorizontal}
      renderItem={({item, index}) => (
        <View style={{position: 'relative'}}>
          {isEditible ? (
            <TouchableOpacity
              onPress={() => handleEdit(index)}
              style={{
                position: 'absolute',
                top: 5,
                right: 5,
                zIndex: 999,
              }}>
              <View
                style={{
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: '#fff',
                  backgroundColor: 'cyan',
                }}>
                <FontAwesomeIcon color="#fff" size={24} icon={faXmark} />
              </View>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            onPress={() => {
              dispatch(setMediaScreen({type: item.type, uri: item.uri}));
            }}>
            {item.type === 'video/mp4' ? (
              <Video
                muted={true}
                source={{uri: item.uri}}
                style={{width: 128, height: 128}}
              />
            ) : (
              <Image
                style={{height: 128, width: 128}}
                source={{uri: item.uri}}
              />
            )}
          </TouchableOpacity>
        </View>
      )}
      keyExtractor={item => item}
      data={data}
    />
  );
};

export default MediaList;
