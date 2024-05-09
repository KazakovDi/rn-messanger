import React, {useRef, useState} from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import NavBar from '../../Functional/NavBar/NavBar';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import CustomRadioButton from '../../Functional/RadioBtn/RadioBtn';
import {useAppDispatch} from '../../../store/store';
import {editRoomInfo} from '../../../store/Room.slice';
import {useTheme} from '@rneui/themed';
const LinkBase = 't.me/';

const ChanelSettings = ({navigation, route}) => {
  const {theme} = useTheme();
  const dispatch = useAppDispatch();

  const [selectedValue, setSelectedValue] = useState('public');
  const [hasError, setHasError] = useState(false);
  const [link, setLink] = useState(LinkBase);

  const id = route.params.id;

  const handleNavigateForward = () => {
    if (link.length === LinkBase.length) {
      setHasError(true);
      return;
    }
    dispatch(editRoomInfo({id, publicLink: {label: 'Ссылка', data: link}}));
    navigation.navigate('Add_Members', {type: 'chanel', id});
  };
  return (
    <View style={{flex: 1, backgroundColor: theme.colors.bgPrimary}}>
      <NavBar
        leftBtn={faArrowLeft}
        leftOnPress={navigation.goBack}
        rightBtn={faCheck}
        rightOnPress={handleNavigateForward}>
        <Text style={{marginLeft: 20, color: '#fff', fontWeight: '700'}}>
          Параметры канала
        </Text>
      </NavBar>
      <View
        style={{
          display: 'flex',
          marginHorizontal: 10,
          paddingTop: 20,
        }}>
        <CustomRadioButton
          label="Публичный"
          description="Все могут найти канал через поиск и подписаться"
          selected={selectedValue === 'public'}
          onSelect={() => setSelectedValue('public')}
        />
        <CustomRadioButton
          label="Частный"
          description="Подписаться можно только по ссылке-приглашению"
          selected={selectedValue === 'private'}
          onSelect={() => setSelectedValue('private')}
        />
        <Text>Ссылка</Text>
        <TextInput
          defaultValue={LinkBase}
          value={link}
          onChangeText={e => {
            setHasError(false);
            if (e.length <= LinkBase.length) setLink(LinkBase);
            else setLink(e);
          }}
          style={{
            color: hasError ? 'red' : theme.colors.primary,
            borderBottomWidth: 1,
            borderBottomColor: hasError ? 'red' : theme.colors.icon,
            flexGrow: 1,
            marginLeft: 15,
          }}
        />
      </View>
    </View>
  );
};

export default ChanelSettings;
