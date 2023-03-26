import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ItemDato = (props) => (
  <View style={styles.cardView}>
    <Text style={{ textTransform: "uppercase", fontWeight: "bold" }}>
      {props.USUARIO}
    </Text>
    <Text style={{ textTransform: "uppercase", color: "green" }}>
      {props.TOPIC}
    </Text>
    <Text style={{ textTransform: "uppercase", color: "blue" }}>
      {props.DATO}
    </Text>
    <View style={{ flexDirection: "row-reverse" }}>
      <TouchableOpacity
        style={{ marginHorizontal: 10 }}
        onPress={props.getDato.bind(this, props)}
      >
        <Ionicons name="md-create" size={36} color="#07C71F" />
      </TouchableOpacity>
      <TouchableOpacity onPress={props.mypress.bind(this, props)}>
        <Ionicons name="md-trash" size={36} color="#F1113D" />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  cardView: {
    backgroundColor: "white",
    borderRadius: 20,
    marginVertical: 5,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default ItemDato;
