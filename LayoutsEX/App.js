import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  SafeAreaView,
  Platform,
  Text,
  View,
} from "react-native";
import {
  useDimensions,
  useDeviceOrientation,
} from "@react-native-community/hooks";

export default function App() {
  console.log("Application");
  const { landscape } = useDeviceOrientation();

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: "dodgerblue",
          width: 100,
          /*height: landscape ? 100 : "30%",*/
          height: 100,
          // flexBasis: 100, // width or height
          // flexGrow: 2, // flex
          flexShrink: 1,
        }}
      ></View>
      <View
        style={{
          backgroundColor: "gold",
          width: 100,
          height: 200,
          top: 100,
          right: 20,
          position: "relative",
        }}
      />
      <View
        style={{
          backgroundColor: "tomato",
          width: 100,
          height: 300,
        }}
      />
      <View
        style={{
          backgroundColor: "grey",
          width: 100,
          height: 200,
        }}
      />
      <View
        style={{
          backgroundColor: "greenyellow",
          width: 100,
          height: 100,
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "center", // main
    alignItems: "center", // secondary
    alignContent: "center",
    flexWrap: "wrap",
  },
});
