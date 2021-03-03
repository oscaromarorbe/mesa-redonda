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
    cantidadesAclaraciones: {},
    cantidadesAclaracionesOriginales: {},
    currentOrder: {},
    save: false,
    rating: 0,
    stars: [1, 2, 3, 4, 5],
  };
  componentDidMount() {
    this.setState({
      cantidadesAclaraciones: this.props.route.params.cantidadesAclaraciones,
      cantidadesAclaracionesOriginales: this.props.route.params
        .cantidadesAclaraciones,
      currentOrder: this.props.route.params,
    });
  }
  async handleSendToCook() {
    const order = this.state.currentOrder;
    order.estado = "En preparación";
    order.camarero = this.props.route.params.currentUser;
    try {
      await firebase.db
        .collection("pedidos")
        .doc(this.state.currentOrder.pedidoId)
        .set(order);
      this.props.navigation.navigate("PantallaComensal");
    } catch (error) {
      console.log(error);
    }
  }
  async handleServe() {
    const order = this.state.currentOrder;
    order.estado = "Entregado";
    order.cocina = this.props.route.params.currentUser;
    try {
      await firebase.db
        .collection("pedidos")
        .doc(this.state.currentOrder.pedidoId)
        .set(order);
      this.props.navigation.navigate("PantallaComensal");
    } catch (error) {
      console.log(error);
    }
  }
  async handleReady() {
    const order = this.state.currentOrder;
    order.estado = "Listo para servir";
    try {
      await firebase.db
        .collection("pedidos")
        .doc(this.state.currentOrder.pedidoId)
        .set(order);
      this.props.navigation.navigate("PantallaComensal");
    } catch (error) {
      console.log(error);
    }
  }
  async handlePay() {
    const order = this.state.currentOrder;
    order.abonado = true;
    order.caja = this.props.route.params.currentUser;
    try {
      await firebase.db
        .collection("pedidos")
        .doc(this.state.currentOrder.pedidoId)
        .set(order);
      this.props.navigation.navigate("PantallaComensal");
    } catch (error) {
      console.log(error);
    }
  }
  async handleCancelOrder() {
    const order = this.state.currentOrder;
    order.estado = "Cancelado";
    order.comentarios = "Cancelado por " + this.props.route.params.currentUser;
    try {
      await firebase.db
        .collection("pedidos")
        .doc(this.state.currentOrder.pedidoId)
        .set(order);
      this.props.navigation.navigate("PantallaComensal");
    } catch (error) {
      console.log(error);
    }
  }
  async sendRating() {
    const order = this.state.currentOrder;
    order.puntuacion = this.state.rating;
    try {
      await firebase.db
        .collection("pedidos")
        .doc(this.state.currentOrder.pedidoId)
        .set(order);
      this.props.navigation.navigate("PantallaComensal");
    } catch (error) {
      console.log(error);
    }
  }
  handleRating(value) {
    this.setState({ rating: value });
  }
  handleChangeQuantity(value, articuloId) {
    let cantidadesAclaraciones = this.state.cantidadesAclaraciones;
    cantidadesAclaraciones[articuloId].cantidad =
      value === "plus"
        ? cantidadesAclaraciones[articuloId].cantidad + 1
        : cantidadesAclaraciones[articuloId].cantidad - 1;
    let save = true;
    this.setState({ cantidadesAclaraciones, save });
  }
  async onSaveChanges() {
    const order = this.state.currentOrder;
    order.cantidadesAclaraciones = this.state.cantidadesAclaraciones;
    Object.values(order.cantidadesAclaraciones).forEach((articulo) => {
      if (articulo.cantidad < 1) {
        delete order[articulo.articuloId];
      }
    });
    try {
      await firebase.db
        .collection("pedidos")
        .doc(this.state.currentOrder.pedidoId)
        .set(order);
      this.setState({ save: false });
      this.props.navigation.navigate("PantallaComensal");
    } catch (error) {
      console.log(error);
    }
  }
  onDiscardChanges() {
    let cantidadesAclaraciones = this.state.cantidadesAclaracionesOriginales;
    Object.values(cantidadesAclaraciones).forEach((articulo) => {
      cantidadesAclaraciones.cantidad = this.state.cantidadesAclaracionesOriginales[
        articulo.articuloId
      ].cantidad;
    });
    this.setState({
      cantidadesAclaraciones,
      save: false,
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {Object.values(this.state.cantidadesAclaraciones).map((articulo) => {
            if (articulo.cantidad > 0) {
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
                      {this.state.currentOrder.estado === "Pendiente" && (
                        <TouchableOpacity
                        /* onPress={() =>
                            this.handleChangeQuantity(
                              "minus",
                              articulo.articuloId
                            )
                          } */
                        >
                          <Text style={styles.quantity}>-</Text>
                        </TouchableOpacity>
                      )}
                      <Text style={styles.quantity}>{articulo.cantidad}</Text>
                      {this.state.currentOrder.estado === "Pendiente" && (
                        <TouchableOpacity
                        /* onPress={() =>
                            this.handleChangeQuantity(
                              "plus",
                              articulo.articuloId
                            )
                          } */
                        >
                          <Text style={styles.quantity}>+</Text>
                        </TouchableOpacity>
                      )}
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
            }
          })}
          <View>
            {/* estado */}
            <View style={styles.articulo}>
              <View style={styles.itemArticulo}>
                <Text style={styles.articuloText}>Estado</Text>
              </View>
              <View style={styles.itemArticulo}>
                <Text style={styles.articuloText}>
                  {this.state.currentOrder.estado}
                </Text>
              </View>
            </View>
            <Divider style={{ backgroundColor: "blue" }} />
            {/* mesa */}
            <View style={styles.articulo}>
              <View style={styles.itemArticulo}>
                <Text style={styles.articuloText}>Mesa Nro</Text>
              </View>
              <View style={styles.itemArticulo}>
                <Text style={styles.articuloText}>
                  {this.state.currentOrder.mesa}
                </Text>
              </View>
            </View>
            <Divider style={{ backgroundColor: "blue" }} />
            {/* mesa */}
            <View style={styles.articulo}>
              <View style={styles.itemArticulo}>
                <Text style={styles.articuloText}>Aclaraciones</Text>
              </View>
              <View style={styles.itemArticulo}>
                <Text style={styles.articuloText}>
                  {this.state.currentOrder.aclaracionGeneral
                    ? this.state.currentOrder.aclaracionGeneral
                    : "Ninguna"}
                </Text>
              </View>
            </View>
            <Divider style={{ backgroundColor: "blue" }} />
            {/* medio de pago */}
            <View style={styles.articulo}>
              <View style={styles.itemArticulo}>
                <Text style={styles.articuloText}>Medio de pago</Text>
              </View>
              <View style={styles.itemArticulo}>
                <Text style={styles.articuloText}>
                  {this.state.currentOrder.medioDePago}
                </Text>
              </View>
            </View>
            <Divider style={{ backgroundColor: "blue" }} />
            {/* subtotal */}
            <View style={styles.articulo}>
              <View style={styles.itemArticulo}>
                <Text style={styles.articuloText}>Subtotal</Text>
              </View>
              <View style={styles.itemArticulo}>
                <Text style={styles.articuloText}>
                  {this.state.currentOrder.subtotal}
                </Text>
              </View>
            </View>
            <Divider style={{ backgroundColor: "blue" }} />
            {/* abonado */}
            <View style={styles.articulo}>
              <View style={styles.itemArticulo}>
                <Text style={styles.articuloText}>Abonado</Text>
              </View>
              <View style={styles.itemArticulo}>
                <Text style={styles.articuloText}>
                  {this.state.currentOrder.abonado ? "Sí" : "No"}
                </Text>
              </View>
            </View>
            <Divider style={{ backgroundColor: "blue" }} />
            {/* puntuacion */}
            <View style={styles.articulo}>
              <View style={styles.itemArticulo}>
                <Text style={styles.articuloText}>Puntuación</Text>
              </View>
              <View style={styles.itemArticulo}>
                <Text style={styles.articuloText}>
                  {this.state.currentOrder.puntuacion
                    ? this.state.currentOrder.puntuacion
                    : "Puntuación no brindada aún"}
                </Text>
              </View>
            </View>
            <Divider style={{ backgroundColor: "blue" }} />
          </View>
        </ScrollView>
        {this.state.currentOrder.estado === "Pendiente" &&
          this.state.save &&
          (this.props.route.params.userType === "comensal" ||
            this.props.route.params.userType === "camarero") && (
            <TouchableOpacity
              style={styles.checkout}
              onPress={() => this.onSaveChanges()}
            >
              <Text style={styles.checkoutText}>Guardar cambios</Text>
            </TouchableOpacity>
          )}
        {this.state.currentOrder.estado === "Pendiente" &&
          this.state.save &&
          (this.props.route.params.userType === "comensal" ||
            this.props.route.params.userType === "camarero") && (
            <TouchableOpacity
              style={styles.cancel}
              onPress={() => this.onDiscardChanges()}
            >
              <Text style={styles.checkoutText}>Descartar cambios</Text>
            </TouchableOpacity>
          )}
        {this.state.currentOrder.estado === "Pendiente" &&
          !this.state.save &&
          this.props.route.params.userType === "camarero" && (
            <TouchableOpacity
              style={styles.checkout}
              onPress={() => this.handleSendToCook()}
            >
              <Text style={styles.checkoutText}>Enviar a cocina</Text>
            </TouchableOpacity>
          )}
        {this.state.currentOrder.estado === "Listo para servir" &&
          this.props.route.params.userType === "camarero" && (
            <TouchableOpacity
              style={styles.checkout}
              onPress={() => this.handleServe()}
            >
              <Text style={styles.checkoutText}>Marcar entregado</Text>
            </TouchableOpacity>
          )}
        {this.state.currentOrder.estado === "En preparación" &&
          this.props.route.params.userType === "cocina" && (
            <TouchableOpacity
              style={styles.checkout}
              onPress={() => this.handleReady()}
            >
              <Text style={styles.checkoutText}>Marcar listo</Text>
            </TouchableOpacity>
          )}
        {this.state.currentOrder.estado !== "Cancelado" &&
          this.state.currentOrder.estado !== "Pendiente" &&
          this.props.route.params.userType === "caja" && (
            <TouchableOpacity
              style={styles.checkout}
              onPress={() => this.handlePay()}
            >
              <Text style={styles.checkoutText}>Marcar abonado</Text>
            </TouchableOpacity>
          )}
        {((this.state.currentOrder.estado === "Pendiente" &&
          this.props.route.params.userType === "comensal") ||
          (this.state.currentOrder.estado !== "Entregado" &&
            this.state.currentOrder.estado !== "Cancelado" &&
            this.props.route.params.userType === "camarero") ||
          (this.state.currentOrder.estado === "En preparación" &&
            this.props.route.params.userType === "cocina")) &&
          !this.state.save && (
            <TouchableOpacity
              style={styles.cancel}
              onPress={() => this.handleCancelOrder()}
            >
              <Text style={styles.checkoutText}>Cancelar Pedido</Text>
            </TouchableOpacity>
          )}
        {this.state.currentOrder.estado === "Entregado" &&
          this.props.route.params.userType === "comensal" &&
          (this.state.currentOrder.puntuacion < 1 ||
            !this.state.currentOrder.puntuacion) && (
            <View style={styles.rating}>
              <Text style={styles.label}>Puntuación</Text>
              <ModalDropdown
                options={this.state.stars}
                defaultValue="Seleccionar..."
                isFullWidth
                style={styles.dropdown}
                dropdownStyle={styles.dropdownStyle}
                dropdownTextStyle={styles.dropdownText}
                textStyle={styles.dropdownText}
                onSelect={(index, value) => {
                  this.handleRating(value);
                }}
              />
              <TouchableOpacity
                style={styles.checkout}
                onPress={() => this.sendRating()}
              >
                <Text style={styles.checkoutText}>Enviar</Text>
              </TouchableOpacity>
            </View>
          )}
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
    padding: 30,
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
  rating: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 15,
    backgroundColor: "#c8c9ce",
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
