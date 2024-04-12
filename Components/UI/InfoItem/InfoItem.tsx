import React, {useState} from 'react';
import {View, Switch, Text} from 'react-native';
const InfoItem = ({body, description, onToggle}) => {
  const [isEnabled, setIsEnabled] = useState(true);
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View>
        <Text style={{fontWeight: 500, marginVertical: 4}}>{body}</Text>
        <Text style={{color: '#000'}}>{description}</Text>
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
