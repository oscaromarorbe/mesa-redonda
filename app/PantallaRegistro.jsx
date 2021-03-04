import React from "react";
import { ScrollView } from "react-native-gesture-handler";
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

class PantallaRegistro extends React.Component {
  state = {
    user: "",
    password1: "",
    password2: "",
    name: "",
    lastName: "",
    email: "",
    phone: "",
    loading: false,
  };
  handleUser(value) {
    this.setState({ user: value });
  }
  handlePassword1(value) {
    this.setState({ password1: value });
  }
  handlePassword2(value) {
    this.setState({ password2: value });
  }
  handleName(value) {
    this.setState({ name: value });
  }
  handleLastName(value) {
    this.setState({ lastName: value });
  }
  handleEmail(value) {
    this.setState({ email: value });
  }
  handlePhone(value) {
    this.setState({ phone: value });
  }
  async handleEnter() {
    let set = {};
    if (
      !this.state.user ||
      !this.state.password1 ||
      !this.state.password2 ||
      !this.state.name ||
      !this.state.lastName ||
      !this.state.email ||
      !this.state.phone
    ) {
      alert("Por favor ingrese datos en los campos faltantes");
    } else if (this.state.password1 !== this.state.password2) {
      alert("Las contraseñas tienen que coincidir");
    } else {
      this.setState({ loading: true });
      set = {
        contraseña: this.state.password2,
        nombre: this.state.name,
        apellido: this.state.lastName,
        email: this.state.email,
        telefono: this.state.phone,
        tipo: "comensal",
      };
      try {
        await firebase.db.collection("usuarios").doc(this.state.user.toLowerCase()).set(set);
        alert("Usuario registrado");
        this.props.navigation.navigate("PantallaInicio");
      } catch (error) {
        console.log(error);
      }
      this.setState({
        user: "",
        password1: "",
        password2: "",
        name: "",
        lastName: "",
        email: "",
        phone: "",
        loading: false,
      });
    }
  }
  render() {
    return this.state.loading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    ) : (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            value={this.state.name}
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => this.secondTextInput.focus()}
            onChangeText={(value) => {
              this.handleName(value);
            }}
          />
          <Text style={styles.label}>Apellido</Text>
          <TextInput
            style={styles.input}
            value={this.state.lastName}
            returnKeyType="next"
            blurOnSubmit={false}
            ref={(input) => (this.secondTextInput = input)}
            onSubmitEditing={() => this.thirdTextInput.focus()}
            onChangeText={(value) => {
              this.handleLastName(value);
            }}
          />
          <Text style={styles.label}>email</Text>
          <TextInput
            style={styles.input}
            value={this.state.email}
            returnKeyType="next"
            blurOnSubmit={false}
            keyboardType="email-address"
            ref={(input) => (this.thirdTextInput = input)}
            onSubmitEditing={() => this.fourthTextInput.focus()}
            onChangeText={(value) => {
              this.handleEmail(value);
            }}
          />
          <Text style={styles.label}>Teléfono</Text>
          <TextInput
            style={styles.input}
            value={this.state.phone}
            returnKeyType="next"
            blurOnSubmit={false}
            keyboardType="phone-pad"
            ref={(input) => (this.fourthTextInput = input)}
            onSubmitEditing={() => this.fifthTextInput.focus()}
            onChangeText={(value) => {
              this.handlePhone(value);
            }}
          />
          <Text style={styles.label}>Usuario</Text>
          <TextInput
            style={styles.input}
            value={this.state.user}
            returnKeyType="next"
            blurOnSubmit={false}
            ref={(input) => (this.fifthTextInput = input)}
            onSubmitEditing={() => this.sixthTextInput.focus()}
            onChangeText={(value) => {
              this.handleUser(value);
            }}
          />
          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            value={this.state.password1}
            returnKeyType="next"
            blurOnSubmit={false}
            ref={(input) => (this.sixthTextInput = input)}
            onSubmitEditing={() => this.seventhTextInput.focus()}
            secureTextEntry
            onChangeText={(value) => {
              this.handlePassword1(value);
            }}
          />
          <Text style={styles.label}>Repita Contraseña</Text>
          <TextInput
            style={styles.input}
            value={this.state.password2}
            returnKeyType="go"
            ref={(input) => (this.seventhTextInput = input)}
            onSubmitEditing={() => this.handleEnter()}
            secureTextEntry
            onChangeText={(value) => {
              this.handlePassword2(value);
            }}
          />
          <Button
            title="Enviar"
            style={styles.button}
            onPress={() => this.handleEnter()}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
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

export default PantallaRegistro;
