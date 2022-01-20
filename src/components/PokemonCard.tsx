import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageColors from 'react-native-image-colors';
import {SimplePokemon} from '../interfaces/PokemonInterfaces';
import {FadeInImage} from './FadeInImage';

const windoWidth = Dimensions.get('window').width;

interface Props {
  pokemon: SimplePokemon;
}

export const PokemonCard = ({pokemon}: Props) => {
  const [bgColor, setBgColor] = useState('grey');
  const navigation = useNavigation();

  const isMounted = useRef(true);

  useEffect(() => {
    ImageColors.getColors(pokemon.picture, {fallback: 'grey'}).then(
      (colors: any) => {
        if (!isMounted) return;

        colors.platform === 'android'
          ? setBgColor(colors.dominant || 'grey')
          : setBgColor(colors.background || 'grey');
      },
    );
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate(
          'PokemonScreen' as never,
          {simplePokemon: pokemon, color: bgColor} as never,
        )
      }>
      <View
        style={{
          ...styleCard.cardContainer,
          width: windoWidth * 0.4,
          backgroundColor: bgColor,
        }}>
        <View>
          <Text style={styleCard.name}>
            {pokemon.name} {'\n#' + pokemon.id}
          </Text>
        </View>
        <View style={styleCard.pokebolaContainer}>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={styleCard.pokebola}
          />
        </View>

        <FadeInImage uri={pokemon.picture} style={styleCard.pokemonImage} />
      </View>
    </TouchableOpacity>
  );
};

const styleCard = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 15,
    height: 120,
    width: 160,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 20,
    left: 10,
  },
  pokebola: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: -25,
    right: -25,
  },
  pokemonImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -8,
    bottom: -5,
  },
  pokebolaContainer: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    overflow: 'hidden',
    opacity: 0.5,
  },
});
