import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootStackParams} from '../navigator/Navigator';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FadeInImage} from '../components/FadeInImage';
import {usePokemon} from '../hooks/usePokemon';
import {PokemonDetail} from '../components/PokemonDetail';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

export const PokemonScreen = ({navigation, route}: Props) => {
  const {simplePokemon, color} = route.params;
  const {id, name, picture} = simplePokemon;
  const {top} = useSafeAreaInsets();
  const {isLoading, pokemon} = usePokemon(id);

  return (
    <View style={{flex: 1}}>
      <View style={{...styles.headerContainer, backgroundColor: color}}>
        <TouchableOpacity
          onPress={() => navigation.pop()}
          activeOpacity={0.9}
          style={{...styles.backButton, top: top + 10}}>
          <Icon name="arrow-back-outline" size={35} color="white" />
        </TouchableOpacity>

        <Text style={{...styles.pokemonName, top: top + 45}}>
          {name + '\n'}#{id}
        </Text>

        <Image
          source={require('../assets/pokebola-blanca.png')}
          style={styles.pokebola}
        />

        <FadeInImage uri={picture} style={styles.pokemonImage} />
      </View>

      {isLoading ? (
        <View style={styles.activityIndicator}>
          <ActivityIndicator color={color} size={50} />
        </View>
      ) : (
        <PokemonDetail pokemon={pokemon} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
  },

  backButton: {
    position: 'absolute',
    left: 20,
    borderRadius: 100,
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20,
    textTransform: 'capitalize',
  },
  pokebola: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.7,
  },
  pokemonImage: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -15,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
