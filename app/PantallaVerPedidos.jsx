import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import firebase from "../database/firebase";

class PantallaVerPedidos extends React.Component {
  state = {
    loading: true,
  };
  componentDidMount() {
    let field = "";
    let operator = "";
    let where = [];
    if (this.props.userType === "comensal") {
      field = "estado";
      operator = "in";
      where.push("Pendiente", "En preparación", "Listo para servir");
    } else if (this.props.userType === "camarero") {
      field = "estado";
      operator = "in";
      where.push("Pendiente", "En preparación", "Listo para servir", "Entregado", "Cancelado");
    } else if (this.props.userType === "cocina") {
      field = "estado";
      operator = "in";
      where.push("En preparación");
    } else if (this.props.userType === "caja") {
      field = "abonado";
      operator = "==";
      where = false;
    } else {
      field = "estado";
      operator = "in";
      where.push("Pendiente", "En preparación", "Listo para servir", "Entregado", "Cancelado");
    }
    firebase.db
      .collection("pedidos")
      .where(field, operator, where)
      .onSnapshot((querySnapshot) => {
        const pedidos = [];
        querySnapshot.docs.forEach((doc) => {
          const {
            abonado,
            aclaracionGeneral,
            caja,
            camarero,
            cantidadesAclaraciones,
            cocina,
            comensal,
            comentarios,
            establecimiento,
            estado,
            fecha,
            medioDePago,
            mesa,
            puntuacion,
            subtotal,
          } = doc.data();
          pedidos.push({
            id: doc.id,
            abonado,
            aclaracionGeneral,
            caja,
            camarero,
            cantidadesAclaraciones,
            cocina,
            comensal,
            comentarios,
            establecimiento,
            estado,
            fecha,
            medioDePago,
            mesa,
            puntuacion,
            subtotal,
          });
        });
        this.setState({ pedidos, loading: false });
      });
  }
  render() {
    return this.state.loading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    ) : (
      <View style={styles.container}>
        <ScrollView>
          {this.state.pedidos.map((pedido) => {
            return (
              <ListItem
                key={pedido.id}
                bottomDivider
                onPress={() => {
                  this.props.navigation.navigate("PantallaPedido", {
                    pedidoId: pedido.id,
                    abonado: pedido.abonado,
                    aclaracionGeneral: pedido.aclaracionGeneral,
                    caja: pedido.caja,
                    camarero: pedido.camarero,
                    cantidadesAclaraciones: pedido.cantidadesAclaraciones,
                    cocina: pedido.cocina,
                    comensal: pedido.comensal,
                    comentarios: pedido.comentarios,
                    establecimiento: pedido.establecimiento,
                    estado: pedido.estado,
                    fecha: pedido.fecha,
                    medioDePago: pedido.medioDePago,
                    mesa: pedido.mesa,
                    puntuacion: pedido.puntuacion,
                    subtotal: pedido.subtotal,
                    userType: this.props.userType,
                    currentUser: this.props.currentUser,
                  });
                }}
              >
                <ListItem.Content style={styles.listItemContent}>
                  <ListItem.Title style={styles.titleText}>
                    {pedido.estado}
                  </ListItem.Title>
                  <ListItem.Subtitle style={styles.subtitleText}>
                    {pedido.fecha}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  listItemContent: {
    marginRight: 20,
    width: "100%",
    height: 100,
  },
  listBottom: {
    height: 50,
  },
  titleText: {
    fontSize: 30,
  },
  subtitleText: {
    fontSize: 20,
  },
  checkout: {
    width: "100%",
    height: 50,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#33ee11",
  },
  checkoutText: {
    fontWeight: "bold",
    fontSize: 30,
  },
});

export default PantallaVerPedidos;
