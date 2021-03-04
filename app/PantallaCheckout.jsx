import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { ListItem, Avatar, Divider } from "react-native-elements";
import ModalDropdown from "react-native-modal-dropdown";
import firebase from "../database/firebase";

class PantallaArticulo extends React.Component {
  state = {
    mediosDePago: ["efectivo", "tarjeta", "mercado pago"],
    mesas: ["1", "2", "3", "4", "5", "6", "7"],
    medioDePagoSeleccionado: "",
    mesaSeleccionada: "",
    aclaraciones: "",
  };
  handlePaymentMethod(value) {
    this.setState({ medioDePagoSeleccionado: value });
  }
  handleTableSelected(value) {
    this.setState({ mesaSeleccionada: value });
  }
  handleDetails(value) {
    this.setState({ aclaraciones: value });
  }
  async handleFinishOrder() {
    const finalOrder = this.props.route.params.currentOrder;
    finalOrder.comensal = this.props.route.params.currentUser;
    finalOrder.estado = "Pendiente";
    finalOrder.medioDePago = this.state.medioDePagoSeleccionado;
    finalOrder.mesa = this.state.mesaSeleccionada;
    finalOrder.aclaracionGeneral = this.state.aclaraciones;
    finalOrder.fecha = new Date().toLocaleString();
    delete finalOrder.timesAdded;
    delete finalOrder.pedido;

    if (!this.state.medioDePagoSeleccionado) {
      alert("Por favor seleccionar medio de pago. ");
    } else if (!this.state.mesaSeleccionada) {
      alert("Por favor seleccionar número de mesa. ");
    } else {
      try {
        await firebase.db.collection("pedidos").add(finalOrder);
        this.props.navigation.navigate("PantallaComensal", {
          pedido: "finalizado",
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
  handleCancelOrder() {
    this.props.navigation.navigate("PantallaComensal", { pedido: "cancelado" });
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.form}>
            <View style={styles.articulosContainer}>
              {Object.values(
                this.props.route.params.currentOrder.cantidadesAclaraciones
              ).map((articulo) => {
                return (
                  <View key={articulo.articuloId}>
                    <View style={styles.articulo}>
                      <View style={styles.itemArticulo}>
                        <Text style={styles.articuloText}>
                          {articulo.nombreArticulo}
                        </Text>
                        <Text style={styles.articuloText}>
                          $ {articulo.valor}
                        </Text>
                      </View>
                      <View style={styles.quantityContainer}>
                        {/* <Text style={styles.quantity}>-</Text> */}
                        <Text style={styles.quantity}>{articulo.cantidad}</Text>
                        {/* <Text style={styles.quantity}>+</Text> */}
                      </View>
                      <Avatar
                        style={styles.itemArticulo}
                        source={{ uri: articulo.imagen }}
                        size="medium"
                      />
                    </View>
                    <Divider style={{ backgroundColor: "blue" }} />
                  </View>
                );
              })}
            </View>
            <Text style={styles.total}>
              Total: $ {this.props.route.params.currentOrder.subtotal}
            </Text>
            <Text style={styles.label}>Medio de Pago</Text>
            <ModalDropdown
              options={this.state.mediosDePago}
              defaultValue="Seleccionar..."
              isFullWidth
              style={styles.dropdown}
              dropdownStyle={styles.dropdownStyle}
              dropdownTextStyle={styles.dropdownText}
              textStyle={styles.dropdownText}
              onSelect={(index, value) => {
                this.handlePaymentMethod(value);
              }}
            />
            <Text style={styles.label}>Mesa Nro</Text>
            <ModalDropdown
              options={this.state.mesas}
              defaultValue="Seleccionar..."
              isFullWidth
              style={styles.dropdown}
              dropdownStyle={styles.dropdownStyle}
              dropdownTextStyle={styles.dropdownText}
              textStyle={styles.dropdownText}
              onSelect={(index, value) => {
                this.handleTableSelected(value);
              }}
            />
            <Text style={styles.label}>Aclaraciones</Text>
            <TextInput
              style={styles.input}
              value={this.state.aclaraciones}
              onChangeText={(value) => {
                this.handleDetails(value);
              }}
            />
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.checkout}
          onPress={() => this.handleFinishOrder()}
        >
          <Text style={styles.checkoutText}>Finalizar Pedido</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancel}
          onPress={() => this.handleCancelOrder()}
        >
          <Text style={styles.checkoutText}>Cancelar Pedido</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#d8d9de",
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
  total: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 20,
  },
  form: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
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
  quantityContainer: {
    backgroundColor: "#ccc",
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 25,
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
  listItemContent: {
    width: "100%",
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
  label: {
    marginBottom: 10,
    fontSize: 20,
  },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
    height: 40,
    width: 300,
    marginBottom: 20,
  },
  dropdown: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
    height: 40,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  dropdownText: {
    fontSize: 20,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  dropdownStyle: {
    fontSize: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    alignSelf: "center",
    borderRadius: 10,
    width: 200,
  },
});

export default PantallaArticulo;
