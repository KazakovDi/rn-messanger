import React, {useRef, useState} from 'react';
import {Text, View, TouchableOpacity, Image, TextInput} from 'react-native';
import NavBar from '../../Functional/NavBar/NavBar';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {pick, pickDirectory} from 'react-native-document-picker';
import {faCamera} from '@fortawesome/free-solid-svg-icons/faCamera';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {useTheme} from '@rneui/themed';
import FloatingBtn from '../../Functional/FloatIcon/FloatingBtn';
import {useAppDispatch} from '../../../store/store';
import {createChat} from '../../../store/Room.slice';
const CreateGroup = ({navigation, route}) => {
  const [imageSource, setImageSource] = useState('');
  const [hasError, setHasError] = useState(false);
  const {theme} = useTheme();
  const dispatch = useAppDispatch();
  const nameRef = useRef(null);
  const id = Math.random();
  const {members} = route.params;
  return (
    <View style={{flex: 1, backgroundColor: theme.colors.bg}}>
      <NavBar leftBtn={faArrowLeft} leftOnPress={navigation.goBack}>
        <Text>Создать группу</Text>
      </NavBar>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          marginTop: 10,
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
          onChangeText={e => {
            nameRef.current.value = e;
            setHasError(false);
          }}
          placeholder="Название канала"
          placeholderTextColor={hasError ? 'red' : theme.colors.primary}
          style={{
            color: theme.colors.primary,
            borderBottomWidth: 1,
            borderBottomColor: hasError ? 'red' : theme.colors.icon,
            flexGrow: 1,
            marginLeft: 15,
          }}
        />
      </View>
      <View style={{flex: 1}} />
      <FloatingBtn
        pos={{right: 10, bottom: 15}}
        Press={() => {
          if (nameRef.current.value) {
            dispatch(
              createChat({
                type: 'group',
                id,
                members: members,
                name: nameRef.current.value,
                description: '',
                avatarUrl: imageSource,
              }),
            );

            navigation.navigate('Chat', {roomId: id});
          } else {
            setHasError(true);
          }
        }}
        icon={faCheck}
      />
    </View>
  );
};

export default CreateGroup;
