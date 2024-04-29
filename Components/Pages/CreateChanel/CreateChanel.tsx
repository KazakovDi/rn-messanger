import React, {useRef, useState} from 'react';
import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import NavBar from '../../Functional/NavBar/NavBar';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {faCamera} from '@fortawesome/free-solid-svg-icons/faCamera';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useTheme} from '@rneui/themed';
import {pick, pickDirectory} from 'react-native-document-picker';
import {useAppDispatch} from '../../../store/store';
import {createChat, removeActivity} from '../../../store/Room.slice';

const CreateChanel = ({navigation}) => {
  const {theme} = useTheme();
  const dispatch = useAppDispatch();
  const [imageSource, setImageSource] = useState('');
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const id = Math.random();
  return (
    <View>
      <NavBar
        leftBtn={faArrowLeft}
        leftOnPress={() => {
          dispatch(removeActivity({id}));
          navigation.goBack();
        }}
        rightBtn={faCheck}
        rightOnPress={() => {
          dispatch(
            createChat({
              type: 'chanel',
              id: id,
              name: nameRef.current.value,
              description: descriptionRef.current?.value,
              avatarUrl: imageSource,
              members: [],
            }),
          );
          navigation.navigate('Add_Members', {type: 'chanel', id});
        }}>
        <Text style={{marginLeft: 20, color: '#fff', fontWeight: '700'}}>
          Создать канал
        </Text>
      </NavBar>
      <View style={{marginHorizontal: 20, marginTop: 20}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
          }}>
          {imageSource ? (
            <TouchableOpacity>
              <Image
                style={{width: 68, height: 68, borderRadius: 50}}
                source={{uri: imageSource}}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                pick({
                  allowMultiSelection: false,
                  type: ['image/jpeg', 'image/png'],
                  mode: 'open',
                }).then(res => {
                  console.log('res', res);
                  setImageSource(res[0].uri);
                });
              }}>
              <View
                style={{
                  backgroundColor: theme.colors.header,
                  borderRadius: 50,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 68,
                  height: 68,
                }}>
                <FontAwesomeIcon color={'#fff'} size={30} icon={faCamera} />
              </View>
            </TouchableOpacity>
          )}
          <TextInput
            ref={nameRef}
            onChangeText={e => (nameRef.current.value = e)}
            placeholder="Название канала"
            style={{
              borderBottomWidth: 1,
              borderBottomColor: theme.colors.icon,
              flexGrow: 1,
              marginLeft: 15,
            }}
          />
        </View>
        <TextInput
          ref={descriptionRef}
          onChangeText={e => (descriptionRef.current.value = e)}
          placeholder="Описание"
          style={{
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.icon,
            paddingVertical: 7,
          }}
          multiline
          maxLength={250}
        />
      </View>
    </View>
  );
};

export default CreateChanel;
