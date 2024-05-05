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
              style={{position: 'absolute', top: 5, right: 5, zIndex: 999}}>
              <FontAwesomeIcon color="#fff" size={18} icon={faXmark} />
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            onPress={() => {
              dispatch(setMediaScreen({type: item.type, uri: item.uri}));
            }}>
            {item.type === 'video/mp4' ? (
              <Video
                // Can be a URL or a local file.
                source={{uri: item.uri}}
                // Store reference
                style={{width: 128, height: 128}}
                // Callback when remote video is buffering
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
