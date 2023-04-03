/*********
  Rui Santos
  Complete project details at https://randomnerdtutorials.com
*********/

#include <WiFi.h>
#include <PubSubClient.h>

// Replace the next variables with your SSID/Password combination
const char *ssid = "TIGO-76EE";
const char *password = "4D96B7603745";

// Add your MQTT Broker IP address, example:
// const char* mqtt_server = "192.168.1.144";
const char *mqtt_server = "broker.emqx.io";

WiFiClient espClient;
PubSubClient client(espClient);
long lastMsg = 0;
char msg[50];
int value = 0;

float temperature = 0;
float humidity = 0;

// uncomment the following lines if you're using SPI
/*#include <SPI.h>
#define BME_SCK 18
#define BME_MISO 19
#define BME_MOSI 23
#define BME_CS 5*/

// LED Pin
const int ledPin = 4;

void setup()
{
    Serial.begin(115200);
    // default settings
    // (you can also pass in a Wire library object like &Wire2)
    // status = bme.begin();
    setup_wifi();
    client.setServer(mqtt_server, 1883);
    client.setCallback(callback);

    pinMode(ledPin, OUTPUT);
}

void setup_wifi()
{
    delay(10);
    // We start by connecting to a WiFi network
    Serial.println();
    Serial.print("Connecting to ");
    Serial.println(ssid);

    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }

    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
}

void callback(char *topic, byte *message, unsigned int length)
{
    Serial.print("Message arrived on topic: ");
    Serial.print(topic);
    Serial.print(". Message: ");
    String messageTemp;

    for (int i = 0; i < length; i++)
    {
        Serial.print((char)message[i]);
        messageTemp += (char)message[i];
    }
    Serial.println();

    // Feel free to add more if statements to control more GPIOs with MQTT

    // If a message is received on the topic esp32/output, you check if the message is either "on" or "off".
    // Changes the output state according to the message
    if (String(topic) == "esp32/output")
    {
        Serial.print("Changing output to ");
        if (messageTemp == "on")
        {
            Serial.println("on");
            digitalWrite(ledPin, HIGH);
        }
        else if (messageTemp == "off")
        {
            Serial.println("off");
            digitalWrite(ledPin, LOW);
        }
    }
}

void reconnect()
{
    // Loop until we're reconnected
    while (!client.connected())
    {
        Serial.print("Attempting MQTT connection...");
        // Attempt to connect
        if (client.connect("ESP8266Client", "testuser", "testpass"))
        {
            Serial.println("connected");
            // Subscribe
            client.subscribe("esp32/output");
        }
        else
        {
            Serial.print("failed, rc=");
            Serial.print(client.state());
            Serial.println(" try again in 5 seconds");
            // Wait 5 seconds before retrying
            delay(5000);
        }
    }
}
void loop()
{
    if (!client.connected())
    {
        reconnect();
    }
    client.loop();

    long now = millis();
    if (now - lastMsg > 15000)
    {
        lastMsg = now;

        // Temperature in Celsius
        temperature = random(4000) / 100.0;
        // Uncomment the next line to set temperature in Fahrenheit
        // (and comment the previous temperature line)
        // temperature = 1.8 * bme.readTemperature() + 32; // Temperature in Fahrenheit

        // Convert the value to a char array
        char tempString[8];
        dtostrf(temperature, 1, 2, tempString);
        Serial.print("Temperature: ");
        Serial.println(tempString);
        String payload = "{\"author\":\"Margarita\", \"varname\":\"Temperature\", \"varvalue\":" + String(tempString) + "}";
        client.publish("iotUdeA/pipeline", (char *)payload.c_str());

        // humidity = 100 * esp_random();

        // // Convert the value to a char array
        // char humString[8];
        // dtostrf(humidity, 1, 2, humString);
        // Serial.print("Humidity: ");
        // Serial.println(humString);
        // client.publish("esp32/humidity", humString);
    }
}