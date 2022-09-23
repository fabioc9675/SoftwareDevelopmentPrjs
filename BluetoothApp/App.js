import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

import BluetoothList from "./app/bluetooth/containers/BluetoothList";

export default function App() {
  return (
    <SafeAreaView>
      <BluetoothList />
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
});
