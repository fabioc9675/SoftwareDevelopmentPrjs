import React from "react";
import { View, Text, FlatList } from "react-native";

import Layout from "../components/bluetoothListLayout";
import Empty from "../components/empty";
import Toggle from "../components/toggle";
import Subtitle from "../components/subtitle";
import Device from "../components/device";
// import BluetoothSerial from "react-native-bluetooth-serial-next";
import { BleManager } from "react-native-ble-plx";

// export const manager = new BleManager();

function BluetoothList(props) {
  const list = [
    { name: "Cristhian", key: "1" },
    { name: "Laras", key: "2" },
  ];

  // const manager = new BleManager();

  console.log("Hola Mundo");

  const renderEmpty = () => <Empty text="No hay dispositivos" />;
  const renderItem = ({ item }) => {
    return (
      <Device
        {...item}
        iconLeft={require("../../../assets/favicon.png")}
        iconRight={require("../../../assets/icon.png")}
      />
    );
  };

  return (
    <Layout title="Bluetooth">
      <Toggle />
      <Subtitle title="Lista de dispositivos" />
      <FlatList
        data={list}
        ListEmptyComponent={renderEmpty}
        renderItem={renderItem}
      />
    </Layout>
  );
}

export default BluetoothList;
