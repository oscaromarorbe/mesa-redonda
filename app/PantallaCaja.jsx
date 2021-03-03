import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import VerPedidos from "./PantallaVerPedidos";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

class PantallaCaja extends React.Component {
  render() {
    return (
      <Tab.Navigator
        initialRouteName="Feed"
        activeColor="#1155ff"
        barStyle={{ backgroundColor: "#dd7700" }}
        backBehavior="none"
      >
        {/* <Tab.Screen
          name="RealizarPedido"
          component={RealizarPedido}
          options={{
            tabBarLabel: "Realizar Pedido",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="home"
                color={color}
                size={26}
              />
            ),
          }}
        /> */}
        <Tab.Screen
          name="VerPedidos"
          component={VerPedidos}
          options={{
            tabBarLabel: "Ver Pedidos",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="bell"
                color={color}
                size={26}
              />
            ),
          }}
        />
        {/* <Tab.Screen
          name="CalificarPedidos"
          component={CalificarPedidos}
          options={{
            tabBarLabel: "Calificar Pedidos",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={26}
              />
            ),
          }}
        /> */}
      </Tab.Navigator>
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

export default PantallaCaja;