import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

class PantallaArticulo extends React.Component {
  state = {
    cantidad: 1,
  };
  handleAdd = () => {
    const cantidad = this.props.route.params.currentOrder
      .cantidadesAclaraciones[this.props.route.params.articuloId]
      ? this.props.route.params.currentOrder.cantidadesAclaraciones[
          this.props.route.params.articuloId
        ].cantidad
      : false;
    const currentOrder = {
      cantidadesAclaraciones: {
        [this.props.route.params.articuloId]: {
          articuloId: this.props.route.params.articuloId,
          cantidad: cantidad
            ? cantidad + this.state.cantidad
            : this.state.cantidad,
          nombreArticulo: this.props.route.params.nombre,
          valor: cantidad
            ? this.props.route.params.precio * (cantidad + this.state.cantidad)
            : this.props.route.params.precio * this.state.cantidad,
          imagen: this.props.route.params.imagen,
        },
      },
      subtotal:
        this.props.route.params.currentOrder.subtotal +
        this.props.route.params.precio * this.state.cantidad,
      comensal: this.props.route.params.currentUser,
      establecimiento: this.props.route.params.establecimiento,
      timesAdded: this.props.route.params.currentOrder.timesAdded + 1,
    };
    this.setState({ cantidad: 1 });
    this.props.navigation.navigate("PantallaComensal", currentOrder);
  };
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
        <View style={styles.add}>
          <Text style={styles.price}>
            $ {this.props.route.params.precio * this.state.cantidad}
          </Text>
          <View style={styles.plusMinus}>
            <TouchableOpacity
              onPress={() =>
                this.setState({
                  cantidad:
                    this.state.cantidad === 1
                      ? this.state.cantidad
                      : this.state.cantidad - 1,
                })
              }
            >
              <Text style={styles.quantitySymbols}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{this.state.cantidad}</Text>
            <TouchableOpacity
              onPress={() =>
                this.setState({
                  cantidad:
                    this.state.cantidad === 9
                      ? this.state.cantidad
                      : this.state.cantidad + 1,
                })
              }
            >
              <Text style={styles.quantitySymbols}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => this.handleAdd()}
          >
            <Text style={styles.addText}>Añadir</Text>
          </TouchableOpacity>
        </View>
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
});

export default PantallaArticulo;
