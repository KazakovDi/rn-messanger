import React, {useRef, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, TextInput} from 'react-native';
import RBSheet from '@poki_san/react-native-bottom-sheet';
import {useTheme} from '@rneui/themed';
import EmojiPicker, {emojiFromUtf16} from 'rn-emoji-picker';
import {emojis} from 'rn-emoji-picker/dist/data';
import {faCircleArrowRight} from '@fortawesome/free-solid-svg-icons/faCircleArrowRight';
import {faMicrophone} from '@fortawesome/free-solid-svg-icons/faMicrophone';
import {faPaperclip} from '@fortawesome/free-solid-svg-icons/faPaperclip';
import {faImage} from '@fortawesome/free-solid-svg-icons/faImage';
import {faFile} from '@fortawesome/free-solid-svg-icons/faFile';
import {faMusic} from '@fortawesome/free-solid-svg-icons/faMusic';
import {faFaceSmile} from '@fortawesome/free-solid-svg-icons/faFaceSmile';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {pick, pickDirectory} from 'react-native-document-picker';
const ChatInput = ({onSendMsg}) => {
  const [inputValue, setInputValue] = useState('');
  const [attachedPhotos, setAttachedPhotos] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const {theme} = useTheme();

  const bottomSheetRef = useRef(null);

  return (
    <View>
      <View
        style={{
          paddingVertical: 5,
          display: 'flex',
          backgroundColor: theme.colors.bg,
          flexDirection: 'row',
          alignItems: 'flex-end',
          paddingHorizontal: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            bottomSheetRef.current.open();
          }}>
          <FontAwesomeIcon
            color={theme.colors.icon}
            size={30}
            icon={faPaperclip}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setIsActive(state => !state);
          }}>
          <FontAwesomeIcon
            color={theme.colors.icon}
            size={30}
            icon={faFaceSmile}
          />
        </TouchableOpacity>
        <TextInput
          style={{
            maxHeight: 110,
            color: theme.colors.primary,
            paddingVertical: 0,
            // width: '70%',
            flexGrow: 1,
            flex: 1,
            // flexBasis:1
          }}
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
            setAttachedPhotos([]);
            setInputValue('');
          }}>
          <FontAwesomeIcon
            color={theme.colors.icon}
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
                const data = res.map(item => {
                  console.log(item);
                  return {type: item.type, uri: item.uri};
                });
                setAttachedPhotos(data);
                bottomSheetRef.current.close();
              });
              // pickDirectory();
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
      {isActive ? (
        <View style={{height: 300}}>
          <EmojiPicker
            emojis={emojis}
            autoFocus={false}
            loading={false}
            darkMode={false}
            perLine={7}
            onSelect={e => {
              const emoji = emojiFromUtf16(e.unified);
              setInputValue(state => state + emoji);
            }}
          />
        </View>
      ) : null}
    </View>
  );
};

export default ChatInput;
