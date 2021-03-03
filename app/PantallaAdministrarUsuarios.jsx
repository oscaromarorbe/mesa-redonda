import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class PantallaAdministrarUsuarios extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>pantalla administrar usuarios</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PantallaAdministrarUsuarios;