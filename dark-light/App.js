import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import darkMode from "./darkmode";
import lightMode from "./lightmode";

export default function App() {
    const colorScheme = useColorScheme();

    const styles = colorScheme === "dark" ? darkMode : lightMode;

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Open up App.js to start working on your app {colorScheme}!
            </Text>
            <StatusBar style="auto" />
        </View>
    );
}
