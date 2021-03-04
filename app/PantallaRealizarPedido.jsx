import React, { useState, useEffect } from "react";
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

class PantallaRealizarPedido extends React.Component {
  /* const [articulos, setArticulos] = useState([]);

  useEffect(() => {
    firebase.db.collection("articulos").onSnapshot((querySnapshot) => {
      const articulos = [];
      querySnapshot.docs.forEach((doc) => {
        const {
          nombre,
          descripcion,
          precio,
          disponibilidad,
          establecimiento,
        } = doc.data();
        articulos.push({
          id: doc.id,
          nombre,
          descripcion,
          precio,
          disponibilidad,
          establecimiento,
        });
      });
      setArticulos(articulos);
      console.log(props)
    });
  }, []); */

  state = {
    loading: true,
    articulos: [],
  };

  componentDidMount() {
    firebase.db
      .collection("articulos")
      .where("disponibilidad", "==", true)
      .onSnapshot((querySnapshot) => {
        const articulos = [];
        querySnapshot.docs.forEach((doc) => {
          const {
            nombre,
            descripcion,
            precio,
            disponibilidad,
            establecimiento,
            imagen,
          } = doc.data();
          articulos.push({
            id: doc.id,
            nombre,
            descripcion,
            precio,
            disponibilidad,
            establecimiento,
            imagen,
          });
        });
        this.setState({ articulos, loading: false });
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
          {this.state.articulos.map((articulo) => {
            return (
              <ListItem
                key={articulo.id}
                bottomDivider
                onPress={() => {
                  this.props.navigation.navigate("PantallaArticulo", {
                    articuloId: articulo.id,
                    nombre: articulo.nombre,
                    descripcion: articulo.descripcion,
                    precio: articulo.precio,
                    disponibilidad: articulo.disponibilidad,
                    establecimiento: articulo.establecimiento,
                    imagen: articulo.imagen,
                    currentOrder: this.props.currentOrder,
                    currentUser: this.props.currentUser,
                  });
                }}
              >
                <ListItem.Content style={styles.listItemContent}>
                  <ListItem.Title style={styles.productName}>{articulo.nombre}</ListItem.Title>
                  <ListItem.Subtitle>{articulo.descripcion}</ListItem.Subtitle>
                </ListItem.Content>
                <Avatar
                  source={{uri: articulo.imagen}}
                  size="large"
                />
                <ListItem.Chevron />
              </ListItem>
            );
          })}
        </ScrollView>
        {this.props.currentOrder.timesAdded > 0 && (
          <TouchableOpacity
            style={styles.checkout}
            onPress={() =>
              this.props.navigation.navigate("PantallaCheckout", {
                currentOrder: this.props.currentOrder,
                currentUser: this.props.currentUser,
              })
            }
          >
            <Text style={styles.checkoutText}>Ir a Checkout</Text>
          </TouchableOpacity>
        )}
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
  },
  listBottom: {
    height: 50,
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
  productName: {
    fontWeight: "bold",
    fontSize: 30,
  },
});

export default PantallaRealizarPedido;
