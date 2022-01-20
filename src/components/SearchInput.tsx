import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Platform,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDebounceSetValue} from '../hooks/useDebounceSetValue';

interface Props {
  onDebounce: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}

export const SearchInput = ({onDebounce, style}: Props) => {
  const [textValue, setTextValue] = useState('');

  const debounceValue = useDebounceSetValue(textValue);

  useEffect(() => {
    onDebounce(debounceValue);
  }, [debounceValue]);

  return (
    <View style={{...styles.container, ...(style as any)}}>
      <View style={styles.textBackground}>
        <TextInput
          placeholder="Search Pokemon"
          style={{...styles.textInput, top: Platform.OS === 'ios' ? 0 : 2}}
          autoCapitalize="none"
          autoCorrect={false}
          value={textValue}
          onChangeText={setTextValue}
        />
        <Icon name="search-outline" color="grey" size={30} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
  },
  textBackground: {
    backgroundColor: '#f3f1f3',
    borderRadius: 50,
    height: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  textInput: {flex: 1, fontSize: 18},
});
