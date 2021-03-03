import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { ListItem, Avatar, Divider } from "react-native-elements";
import firebase from "../database/firebase";

class PantallaAdministrarDisponibilidad extends React.Component {
  state = {
    cantidad: 1,
  };
  async handleAvailability() {
    const articulo = this.props.route.params;
    if (this.props.route.params.disponibilidad === true) {
      articulo.disponibilidad = false;
    } else {
      articulo.disponibilidad = true;
    }
    try {
      await firebase.db
        .collection("articulos")
        .doc(this.props.route.params.articuloId)
        .set(articulo);
      this.props.navigation.navigate("PantallaComensal");
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: this.props.route.params.imagen }}
          style={styles.image}
        />
        <Text style={styles.name}>{this.props.route.params.nombre}</Text>
        <Text style={styles.description}>
          {this.props.route.params.descripcion}
        </Text>
        <Divider style={{ backgroundColor: "blue" }} />
        <View style={styles.articulo}>
          <View style={styles.itemArticulo}>
            <Text style={styles.articuloText}>Disponible</Text>
          </View>
          <View style={styles.itemArticulo}>
            <Text style={styles.articuloText}>
              {this.props.route.params.disponibilidad ? "Sí" : "No"}
            </Text>
          </View>
        </View>
        <Divider style={{ backgroundColor: "blue" }} />
        <TouchableOpacity
          style={
            this.props.route.params.disponibilidad
              ? styles.cancel
              : styles.checkout
          }
          onPress={() => this.handleAvailability()}
        >
          <Text style={styles.checkoutText}>
            {this.props.route.params.disponibilidad
              ? "Marcar no disponible"
              : "Marcar disponible"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#d8d9de",
  },
  image: {
    top: 0,
    width: "100%",
    height: "50%",
    marginBottom: 30,
  },
  name: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#584848",
  },
  description: {
    fontSize: 20,
    marginBottom: 20,
    margin: 20,
  },
  price: {
    fontSize: 40,
  },
  add: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: "#f3b54a",
    padding: 15,
  },
  plusMinus: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantitySymbols: {
    fontSize: 40,
  },
  quantity: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 40,
  },
  addButton: {
    backgroundColor: "#584848",
    height: 60,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  addText: {
    color: "#fff",
    fontSize: 40,
  },
  articulosContainer: {
    flex: 1,
    marginBottom: 20,
  },
  articulo: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "stretch",
    padding: 15,
  },
  itemArticulo: {
    width: "30%",
    height: 75,
  },
  articuloText: {
    fontSize: 20,
  },
  quantity: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 20,
  },
  checkout: {
    width: "100%",
    height: 50,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#33ee11",
    marginBottom: 5,
  },
  cancel: {
    width: "100%",
    height: 50,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dd7722",
  },
  checkoutText: {
    fontWeight: "bold",
    fontSize: 30,
  },
});

export default PantallaAdministrarDisponibilidad;
