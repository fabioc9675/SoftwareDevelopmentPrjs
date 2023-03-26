import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Button,
  Alert,
  Platform,
  SafeAreaView,
} from "react-native";

// View -> UIView
export default function App() {
  console.log("App executed");

  const handlePress = () => console.log("Text clicked");

  return (
    <SafeAreaView style={styles.container}>
      <Text numberOfLines={2} onPress={handlePress}>
        Hello React Native!!
      </Text>
      {/*<Image source={require("./assets/icon.png")}/>*/}
      <TouchableOpacity onPress={() => console.log("Image touched")}>
        <Image
          blurRadius={10}
          fadeDuration={1000}
          source={{
            width: 200,
            height: 300,
            uri: "https://picsum.photos/200/300",
          }}
        />
      </TouchableOpacity>
      <TouchableHighlight onPress={() => console.log("View touched")}>
        <View
          style={{ width: 200, height: 70, backgroundColor: "#CCC" }}
        ></View>
      </TouchableHighlight>
      <Button
        title="Click Me"
        onPress={() =>
          Alert.alert("My title", "Button tapped", [
            { text: "Yes", onPress: () => console.log("Yes") },
            { text: "No", onPress: () => console.log("No") },
          ])
        }
      ></Button>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: Platform.OS === "android" ? 20 : 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
