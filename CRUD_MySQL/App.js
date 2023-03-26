import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios"; // npm install axios, db connector

// componentes personalizados
import ItemDato from "./components/ItemDato";
import Input from "./components/Input";

export default function App() {
  const [listaDatos, setListaDatos] = useState([]);
  const [USUARIO, setUsuario] = useState("");
  const [TOPIC, setTopico] = useState("");
  const [DATO, setDato] = useState("");
  const [ID, setId] = useState("");
  const [bandera, setBandera] = useState(false);

  console.log("MySQL App Running");

  useEffect(() => {
    getDatos();
  }, []);

  const getDatos = async () => {
    const respuesta = await axios.get("http://192.168.1.157/apiDatos/");
    setListaDatos(respuesta.data);
  };

  const addDato = async () => {
    const obj = { TOPIC, USUARIO, DATO };
    console.log(obj);
    const respuesta = await axios.post("http://192.168.1.157/apiDatos/", obj);
    alert(respuesta.data.msg);
    getDatos();
    setUsuario("");
    setTopico("");
    setDato("");
  };

  const deleteDato = async (props) => {
    const id = props.ID;
    const respuesta = await axios.delete(
      "http://192.168.1.157/apiDatos/?ID=" + id
    );
    alert(respuesta.data.msg);
    getDatos();
  };

  const getDato = async (props) => {
    const id = props.ID;
    const respuesta = await axios.get(
      "http://192.168.1.157/apiDatos/?ID=" + id
    );
    setId(respuesta.data.ID);
    setUsuario(respuesta.data.USUARIO);
    setTopico(respuesta.data.TOPIC);
    setDato(respuesta.data.DATO);
    setBandera(!bandera);
  };

  const updateDato = async () => {
    const obj = { ID, TOPIC, USUARIO, DATO };
    const respuesta = await axios.put("http://192.168.1.157/apiDatos/", obj);
    alert(respuesta.data.msg);
    setId("");
    setUsuario("");
    setTopico("");
    setDato("");
    setBandera(false);
    getDatos();
  };

  const addOrUpdate = () => {
    {
      bandera ? updateDato() : addDato();
    }
  };

  const renderItem = ({ item }) => (
    <ItemDato
      ID={item.ID}
      getDato={getDato}
      USUARIO={item.USUARIO}
      TOPIC={item.TOPIC}
      DATO={item.DATO}
      mypress={deleteDato}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Hola Fabian!</Text>

      <View style={{ flex: 0.1, marginTop: 20, marginBottom: 25 }}>
        <Text style={{ fontWeight: "bold", color: "#0E69E5", fontSize: 20 }}>
          CRUD REACT NATIVE PHP Y MYSQL
        </Text>
      </View>
      <Input texto={"Usuario"} valor={USUARIO} campo={(e) => setUsuario(e)} />
      <Input texto={"Topico"} valor={TOPIC} campo={(e) => setTopico(e)} />
      <Input texto={"Dato"} valor={DATO} campo={(e) => setDato(e)} />
      <TouchableOpacity
        style={{
          backgroundColor: "#0E69E5",
          padding: 15,
          borderRadius: 12,
          width: 100,
          alignItems: "center",
        }}
        onPress={addOrUpdate}
      >
        <Text style={{ color: "#fff" }}>{bandera ? "Edit" : "Add"}</Text>
      </TouchableOpacity>

      <FlatList
        style={{
          marginTop: 15,
          width: 250,
          marginHorizontal: 20,
        }}
        data={listaDatos}
        renderItem={renderItem}
        keyExtractor={(item) => item.ID}
      />

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    marginTop: 20,
  },
});
