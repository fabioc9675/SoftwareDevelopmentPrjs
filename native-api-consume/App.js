import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default class App extends React.Component {
  state = {
    institution: "Loading... ",
    temperature: "",
    humidity: "",
    counter: 0,
  };

  getJsonData = (counter) => {
    let count = counter;
    if (count > 15) {
      count = 0;
    }
    fetch(
      "http://greenhouse-jfk.herokuapp.com/api/greenhouse/inst/UdeA/date/2022-06-22/2022-06-23T10:00:00Z",
      { method: "GET" }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          institution: responseJson[count].institution,
          temperature: responseJson[count].temp_env,
          humidity: responseJson[count].mois_env,
          counter: count + 1,
        });
        console.log("Hola Fabian");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  componentDidMount = () => {
    this.getJsonData(this.state.counter);
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={{ margin: 10, fontSize: 16 }}>Suggestion:</Text>
          <Text style={{ margin: 10, fontSize: 22 }} selectable={true}>
            {this.state.institution}
          </Text>
          <Text style={{ margin: 10, fontSize: 16 }}>
            {"Humedad: " + this.state.humidity}
          </Text>
          <Text style={{ margin: 10, fontSize: 16 }}>
            {"Temperatura: " + this.state.temperature}
          </Text>
          <StatusBar style="auto" />
        </View>

        <View style={{ position: "absolute", bottom: 20, width: "100%" }}>
          <Button
            onPress={() => this.getJsonData(this.state.counter)}
            title="Press me!"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
