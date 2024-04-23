import React, {useRef, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, TextInput} from 'react-native';
import RBSheet from '@poki_san/react-native-bottom-sheet';

import {faCircleArrowRight} from '@fortawesome/free-solid-svg-icons/faCircleArrowRight';
import {faMicrophone} from '@fortawesome/free-solid-svg-icons/faMicrophone';
import {faPaperclip} from '@fortawesome/free-solid-svg-icons/faPaperclip';
import {faImage} from '@fortawesome/free-solid-svg-icons/faImage';
import {faFile} from '@fortawesome/free-solid-svg-icons/faFile';
import {faMusic} from '@fortawesome/free-solid-svg-icons/faMusic';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {pick} from 'react-native-document-picker';
const ChatInput = ({onSendMsg}) => {
  const [inputValue, setInputValue] = useState('');
  const [attachedPhotos, setAttachedPhotos] = useState([]);

  const bottomSheetRef = useRef(null);
  return (
    <View
      style={{
        paddingVertical: 5,
        display: 'flex',
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'flex-end',
      }}>
      <TouchableOpacity
        onPress={() => {
          bottomSheetRef.current.open();
        }}>
        <FontAwesomeIcon size={30} icon={faPaperclip} />
      </TouchableOpacity>
      <TextInput
        style={{maxHeight: 110, paddingVertical: 0, width: '80%'}}
        multiline
        placeholder="отправить"
        value={inputValue}
        maxLength={500}
        onChangeText={e => {
          setInputValue(e);
        }}
      />
      <TouchableOpacity
        onPress={() => {
          onSendMsg(inputValue, attachedPhotos);
          setInputValue('');
        }}>
        <FontAwesomeIcon
          size={30}
          icon={!!inputValue ? faCircleArrowRight : faMicrophone}
        />
      </TouchableOpacity>
      <RBSheet
        animationType="slide"
        openDuration={500}
        height={350}
        closeOnDragDown={true}
        dragFromTopOnly={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
        }}
        ref={bottomSheetRef}>
        <TouchableOpacity
          onPress={() => {
            pick({
              allowMultiSelection: true,
              type: ['image/jpeg', 'video/mp4', 'video/mpeg', 'image/png'],
              mode: 'open',
            }).then(res => {
              const data = res.map(item => ({type: 'img', uri: item.uri}));
              setAttachedPhotos(data);
              bottomSheetRef.current.close();
            });
          }}>
          <FontAwesomeIcon size={50} icon={faImage} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            pick({
              allowMultiSelection: true,
              mode: 'open',
            }).then(res => console.log('res', res));
          }}>
          <FontAwesomeIcon size={50} icon={faFile} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            pick({
              allowMultiSelection: true,
              type: 'audio/mpeg',
              mode: 'open',
            }).then(res => console.log('res', res));
          }}>
          <FontAwesomeIcon size={50} icon={faMusic} />
        </TouchableOpacity>
      </RBSheet>
    </View>
  );
};

export default ChatInput;
