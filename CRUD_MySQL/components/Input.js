import React from "react";
import { StyleSheet, TextInput } from "react-native";

const Input = (props) => (
  <TextInput
    placeholder={props.texto}
    style={styles.input}
    onChangeText={props.campo}
    value={props.valor}
  ></TextInput>
);

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    borderBottomWidth: 1,
    width: 240,
    height: 20,
    marginVertical: 10,
  },
});

export default Input;
