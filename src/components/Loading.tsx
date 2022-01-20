import React from 'react';
import {ActivityIndicator, View, Text, StyleSheet} from 'react-native';

export const Loading = () => {
  return (
    <View style={stylesSearch.activityContainer}>
      <ActivityIndicator size={50} color="grey" />
      <Text>Loading...</Text>
    </View>
  );
};

const stylesSearch = StyleSheet.create({
  activityContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
