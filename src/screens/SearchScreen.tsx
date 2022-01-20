import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Platform,
  FlatList,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Loading} from '../components/Loading';
import {PokemonCard} from '../components/PokemonCard';
import {SearchInput} from '../components/SearchInput';
import {usePokemonSearch} from '../hooks/usePokemonSearch';
import {styles} from '../Theme/appTheme';
import {SimplePokemon} from '../interfaces/PokemonInterfaces';

const screenWidth = Dimensions.get('window').width;

export const SearchScreen = () => {
  const {top} = useSafeAreaInsets();
  const {isFetching, simplePokemonList} = usePokemonSearch();
  const [term, setTerm] = useState('');
  const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([]);

  useEffect(() => {
    if (term.length === 0) {
      return setPokemonFiltered([]);
    }

    if (isNaN(Number(term))) {
      setPokemonFiltered(
        simplePokemonList.filter(poke =>
          poke.name.toLowerCase().includes(term.toLowerCase()),
        ),
      );
    } else {
      const pokemonById = simplePokemonList.find(poke => poke.id === term);
      setPokemonFiltered(pokemonById ? [pokemonById] : []);
    }
  }, [term]);

  if (isFetching) {
    console.log(isFetching);
    return <Loading />;
  }

  return (
    <View
      style={{
        flex: 1,
        // marginHorizontal: 20,
      }}>
      <SearchInput
        onDebounce={setTerm}
        style={{
          position: 'absolute',
          top: Platform.OS === 'ios' ? top : 30,
          width: screenWidth - 40,
          zIndex: 999,
          marginHorizontal: 20,
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              alignItems: 'center',
            }}>
            <FlatList
              data={pokemonFiltered}
              keyExtractor={pokemon => pokemon.id + pokemon.name}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              ListHeaderComponent={
                <Text
                  style={{
                    ...styles.title,
                    ...styles.globalMargin,
                    marginTop: Platform.OS === 'ios' ? top + 60 : top + 80,
                    paddingBottom: 10,
                  }}>
                  {term}
                </Text>
              }
              renderItem={({item}) => <PokemonCard pokemon={item} />}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};
