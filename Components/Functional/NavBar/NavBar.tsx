import React, {ReactElement} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useTheme} from '@rneui/themed';

interface INavBar {
  leftBtn?: ReactElement;
  rightBtn?: ReactElement;
  leftOnPress?: () => void;
  rightOnPress?: () => void;
  children?: ReactElement;
}
const NavBar = ({
  leftBtn,
  leftOnPress,
  rightBtn,
  rightOnPress,
  children,
}: INavBar) => {
  const {theme} = useTheme();

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 15,
        justifyContent: 'space-between',
        backgroundColor: theme.colors.header,
        width: '100%',
      }}>
      <TouchableOpacity style={{paddingHorizontal: 2}} onPress={leftOnPress}>
        <FontAwesomeIcon color={theme.colors.bg} size={28} icon={leftBtn} />
      </TouchableOpacity>
      <View style={{flexGrow: 1}}>{children}</View>
      <TouchableOpacity style={{paddingHorizontal: 2}} onPress={rightOnPress}>
        <FontAwesomeIcon color={theme.colors.bg} size={28} icon={rightBtn} />
      </TouchableOpacity>
    </View>
  );
};

export default NavBar;
