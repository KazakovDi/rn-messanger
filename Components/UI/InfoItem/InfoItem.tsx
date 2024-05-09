import React, {useState} from 'react';
import {View, Switch, Text} from 'react-native';
import {useTheme, Avatar} from '@rneui/themed';

interface InfoItemProps {
  body: string;
  description: string;
  onToggle: () => void;
}

const InfoItem = ({body, description, onToggle}: InfoItemProps) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const {theme} = useTheme();

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View>
        <Text
          style={{
            color: theme.colors.primary,
            fontWeight: '500',
            marginVertical: 4,
          }}>
          {body}
        </Text>
        <Text style={{color: theme.colors.primaryLight}}>{description}</Text>
      </View>

      {onToggle ? (
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => {
            onToggle();
            setIsEnabled(state => !state);
          }}
          value={isEnabled}
        />
      ) : null}
    </View>
  );
};

export default InfoItem;
