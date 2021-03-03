import React from "react";
import { Button, ImageBackground, StyleSheet, Text, TextInput, View } from "react-native";

class PantallaEmpleado extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Button title="Ingresar Camarero" onPress={() => this.props.navigation.navigate("PantallaCamarero")} />
        <Button title="Ingresar Cocina" onPress={() => this.props.navigation.navigate("PantallaCocina")} />
        <Button title="Ingresar Caja" onPress={() => this.props.navigation.navigate("PantallaCaja")} />
        <Button title="Ingresar Administrador" onPress={() => this.props.navigation.navigate("PantallaAdministrador")} />
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

export default PantallaEmpleado;
