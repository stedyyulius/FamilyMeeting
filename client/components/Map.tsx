import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const Map = () => {
    return (
        <View style={styles.mapContainer}>
            <MapView style={styles.map} />
        </View>
    )
}

const styles = StyleSheet.create({
    mapContainer: {
      padding: 10
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height * 0.5,
    },
  });

export default Map