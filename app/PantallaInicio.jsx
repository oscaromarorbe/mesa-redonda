import React from "react";
import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from "react-native";
import firebase from "../database/firebase";

class PantallaInicio extends React.Component {
  state = {
    user: "",
    password: "",
    loading: false,
  };
  handleUser(value) {
    this.setState({ user: value });
  }
  handlePassword(value) {
    this.setState({ password: value });
  }
  async handleEnter() {
    let doc = "";
    if (!this.state.user || !this.state.password) {
      alert("Por favor ingrese datos en los campos faltantes");
    } else {
      this.setState({ loading: true });
      doc = await firebase.db
        .collection("usuarios")
        .doc(this.state.user.toLowerCase())
        .get();
      if (doc) {
        if (doc.exists) {
          const data = doc.data();
          if (data.contraseña === this.state.password) {
            this.setState({ user: "", password: "" });
            this.props.navigation.navigate("PantallaComensal", {
              userId: doc.id,
              apellido: data.apellido,
              email: data.email,
              nombre: data.nombre,
              telefono: data.telefono,
              tipo: data.tipo,
            });
          } else {
            alert("Usuario o contraseña incorrectos. ");
          }
        } else {
          alert("Usuario o contraseña incorrectos. ");
        }
      }
      this.setState({ loading: false });
    }
  }
  render() {
    return this.state.loading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    ) : (
      <View style={styles.container}>
        {/* <View style={styles.employee}>
          <Text
            style={styles.employeeText}
            onPress={() => this.props.navigation.navigate("PantallaEmpleado")}
          >
            Iniciar como empleado
          </Text>
        </View> */}
        <Text style={styles.label}>Usuario</Text>
        <TextInput
          style={styles.input}
          value={this.state.user}
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={()=>this.secondTextInput.focus()}
          onChangeText={(value) => {
            this.handleUser(value);
          }}
        />
        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          value={this.state.password}
          returnKeyType="go"
          ref={(input)=>this.secondTextInput = input}
          onSubmitEditing={() => this.handleEnter()}
          secureTextEntry
          onChangeText={(value) => {
            this.handlePassword(value);
          }}
        />
        <Button
          title="Ingresar"
          style={styles.button}
          onPress={() => this.handleEnter()}
        />
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
  employee: {
    marginTop: 20,
    marginRight: 20,
    position: "absolute",
    top: 0,
    right: 0,
  },
  employeeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#7711cc",
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
  button: {
    color: "#ee5500",
    width: 70,
  },
});

export default PantallaInicio;
