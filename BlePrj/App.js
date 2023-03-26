import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { BleManager, Device, LogLevel } from "react-native-ble-plx";
import { Colors } from "react-native/Libraries/NewAppScreen";

const manager = new BleManager();

export default function App() {
  console.log("App Running");

  const [scannedDevices, dispatch] = [];
  let isLoading = false;
  const scanDevices = () => {
    console.log("Button pressed");
    isLoading = true;

    manager.startDeviceScan(null, null, (error, scannedDevice) => {
      if (error) {
        console.warn(error);
      }
      if (scannedDevice) {
        //dispatch({ type: "ADD_DEVICE", payload: scannedDevice });
        console.log(scannedDevice);
      }
    });

    setTimeout(() => {
      manager.stopDeviceScan();
      isLoading = false;
    }, 5000);

    console.log("Scan finished");
  };

  return (
    <SafeAreaView>
      <View style={styles.body}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Step One</Text>
        </View>
      </View>
      <FlatList
        keyExtractor={(item) => item.id}
        data={scannedDevices}
        renderItem={({ item }) => <DeviceCard device={item} />}
        contentContainerStyle={styles.content}
      />

      {isLoading ? (
        <ActivityIndicator color={"teal"} size={25} />
      ) : (
        <Button title="Scan Devices" onPress={scanDevices} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    //flex: 1,
    backgroundColor: "#fff",
    //alignItems: "center",
    //justifyContent: "center",
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.black,
  },
});
