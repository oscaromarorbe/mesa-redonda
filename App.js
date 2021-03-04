import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PantallaInicio from "./app/PantallaInicio";
import PantallaRegistro from "./app/PantallaRegistro";
import PantallaComensal from "./app/PantallaComensal";
import PantallaCamarero from "./app/PantallaCamarero";
import PantallaCocina from "./app/PantallaCocina";
import PantallaCaja from "./app/PantallaCaja";
import PantallaAdministrador from "./app/PantallaAdministrador";
import PantallaEmpleado from "./app/PantallaEmpleado";
import PantallaArticulo from "./app/PantallaArticulo";
import PantallaRealizarPedido from "./app/PantallaRealizarPedido";
import PantallaCheckout from "./app/PantallaCheckout";
import PantallaVerPedidos from "./app/PantallaVerPedidos";
import PantallaPedido from "./app/PantallaPedido";
import PantallaDisponibilidad from "./app/PantallaDisponibilidad";
import PantallaAdministrarDisponibilidad from "./app/PantallaAdministrarDisponibilidad";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PantallaInicio">
        <Stack.Screen
          name="PantallaInicio"
          component={PantallaInicio}
          options={{ title: "Bienvenido" }}
        />
        <Stack.Screen
          name="PantallaRegistro"
          component={PantallaRegistro}
          options={{ title: "Registro" }}
        />
        <Stack.Screen
          name="PantallaComensal"
          component={PantallaComensal}
          options={{ title: "¿Qué te gustaría comer hoy?" }}
        />
        <Stack.Screen
          name="PantallaEmpleado"
          component={PantallaEmpleado}
          options={{ title: "Por favor seleccionar rol" }}
        />
        <Stack.Screen name="PantallaCamarero" component={PantallaCamarero} />
        <Stack.Screen name="PantallaCocina" component={PantallaCocina} />
        <Stack.Screen name="PantallaCaja" component={PantallaCaja} />
        <Stack.Screen
          name="PantallaAdministrador"
          component={PantallaAdministrador}
        />
        <Stack.Screen
          name="PantallaRealizarPedido"
          component={PantallaRealizarPedido}
        />
        <Stack.Screen name="PantallaArticulo" component={PantallaArticulo} />
        <Stack.Screen name="PantallaCheckout" component={PantallaCheckout} />
        <Stack.Screen name="PantallaVerPedidos" component={PantallaVerPedidos} />
        <Stack.Screen name="PantallaPedido" component={PantallaPedido} />
        <Stack.Screen name="PantallaDisponibilidad" component={PantallaDisponibilidad} />
        <Stack.Screen name="PantallaAdministrarDisponibilidad" component={PantallaAdministrarDisponibilidad} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
