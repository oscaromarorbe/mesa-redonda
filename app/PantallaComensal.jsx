import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RealizarPedido from "./PantallaRealizarPedido";
import VerPedidos from "./PantallaVerPedidos";
import CalificarPedidos from "./PantallaCalificarPedidos";
import Disponibilidad from "./PantallaDisponibilidad";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import _ from "lodash";

const Tab = createMaterialBottomTabNavigator();

class PantallaComensal extends React.Component {
  state = {
    currentOrder: {
      establecimiento: "",
      cantidadesAclaraciones: {},
      estado: "",
      subtotal: 0,
      abonado: false,
      medioDePago: "efectivo",
      mesa: 0,
      comensal: "",
      camarero: "",
      cocina: "",
      caja: "",
      aclaracionGeneral: "",
      puntuacion: 0,
      comentarios: "",
      fecha: "",
      timesAdded: 0,
    },
    currentUser: "customer1",
  };
  componentDidUpdate(prevProps) {
    if (this.props.route.params) {
      if (
        this.props.route.params.pedido === "finalizado" ||
        this.props.route.params.pedido === "cancelado"
      ) {
        this.props.navigation.setParams({ pedido: "", timesAdded: 0 });
        this.setState({
          currentOrder: {
            establecimiento: "",
            cantidadesAclaraciones: {},
            estado: "",
            subtotal: 0,
            abonado: false,
            medioDePago: "",
            mesa: 0,
            comensal: "",
            camarero: "",
            cocina: "",
            caja: "",
            aclaracionGeneral: "",
            puntuacion: 0,
            comentarios: "",
            fecha: "",
            timesAdded: 0,
          },
        });
      } else if (
        this.props.route.params.timesAdded >
          this.state.currentOrder.timesAdded &&
        this.props.route.params.pedido !== "finalizado" &&
        this.props.route.params.pedido !== "cancelado"
      ) {
        const result = this.props.route.params;

        this.modifyOrder(result);
      }
    }
  }
  modifyOrder = (order) => {
    let currentOrder = _.merge(this.state.currentOrder, order);
    this.setState(
      {
        currentOrder,
      },
      () => console.log(this.state.currentOrder)
    );
  };
  render() {
    return (
      <Tab.Navigator
        initialRouteName="Feed"
        activeColor="#1155ff"
        barStyle={{ backgroundColor: "#dd7700" }}
        backBehavior="none"
      >
        {(this.props.route.params.tipo === "comensal" ||
          this.props.route.params.tipo === "camarero") && (
          <Tab.Screen
            name="RealizarPedido"
            //component={props => <RealizarPedido {...props} />}
            options={{
              tabBarLabel: "Realizar Pedido",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          >
            {() => (
              <RealizarPedido
                currentUser={this.props.route.params.userId}
                userType={this.props.route.params.tipo}
                currentOrder={this.state.currentOrder}
                navigation={this.props.navigation}
              />
            )}
          </Tab.Screen>
        )}
        <Tab.Screen
          name="VerPedidos"
          //component={VerPedidos}
          options={{
            tabBarLabel: "Ver Pedidos",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="bell" color={color} size={26} />
            ),
          }}
        >
          {() => (
            <VerPedidos
              currentUser={this.props.route.params.userId}
              userType={this.props.route.params.tipo}
              currentOrder={this.state.currentOrder}
              navigation={this.props.navigation}
            />
          )}
        </Tab.Screen>
        {this.props.route.params.tipo === "comensal" && (
          <Tab.Screen
            name="CalificarPedidos"
            //component={CalificarPedidos}
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
          >
            {() => (
              <CalificarPedidos
                currentUser={this.props.route.params.userId}
                userType={this.props.route.params.tipo}
                currentOrder={this.state.currentOrder}
                navigation={this.props.navigation}
              />
            )}
          </Tab.Screen>
        )}
        {(this.props.route.params.tipo === "camarero" ||
          this.props.route.params.tipo === "cocina") && (
          <Tab.Screen
            name="AdministrarDisponibilidad"
            //component={AdministrarDisponibilidad}
            options={{
              tabBarLabel: "Disponibilidad",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="account"
                  color={color}
                  size={26}
                />
              ),
            }}
          >
            {() => (
              <Disponibilidad
                currentUser={this.props.route.params.userId}
                userType={this.props.route.params.tipo}
                currentOrder={this.state.currentOrder}
                navigation={this.props.navigation}
              />
            )}
          </Tab.Screen>
        )}
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PantallaComensal;
