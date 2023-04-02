
#include <WiFi.h>
#include <HTTPClient.h>

// Replace the next variables with your SSID/Password combination
const char *ssid = "TIGO-76EE";
const char *pass = "4D96B7603745";

// Your Domain name with URL path or IP address with path
String serverName = "http://192.168.1.10:5000/api/instrumentation";

// the following variables are unsigned longs because the time, measured in
// milliseconds, will quickly become a bigger number than can be stored in an int.
unsigned long lastTime = 0;
// Timer set to 10 minutes (600000)
// unsigned long timerDelay = 600000;
// Set timer to 5 seconds (5000)
unsigned long timerDelay = 30000;

void setup()
{
    Serial.begin(115200);

    setup_wifi();
    Serial.println("");
    Serial.print("Connected to WiFi network with IP Address: ");
    Serial.println(WiFi.localIP());

    Serial.println("Timer set to 5 seconds (timerDelay variable), it will take 5 seconds before publishing the first reading.");
}

void setup_wifi()
{
    delay(10);
    // We start by connecting to a WiFi network
    Serial.println();
    Serial.print("Connecting to ");
    Serial.println(ssid);

    WiFi.begin(ssid, pass);

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

void loop()
{
    // Send an HTTP POST request every 10 minutes
    if ((millis() - lastTime) > timerDelay)
    {
        // Check WiFi connection status
        if (WiFi.status() == WL_CONNECTED)
        {
            WiFiClient client;
            HTTPClient http;

            // Your Domain name with URL path or IP address with path
            http.begin(client, serverName);

            // If you need Node-RED/server authentication, insert user and password below
            // http.setAuthorization("REPLACE_WITH_SERVER_USERNAME", "REPLACE_WITH_SERVER_PASSWORD");

            // Specify content-type header
            http.addHeader("Content-Type", "application/json");
            // Data to send with HTTP POST
            String httpRequestData = "{\"topic\": \"iotUdeA/webPost\", \"author\":\"Fabian\", \"varname\":\"Humidity\", \"varvalue\":" + String(random(10000) / 100.0) + "}";
            // Send HTTP POST request
            int httpResponseCode = http.POST(httpRequestData);

            // If you need an HTTP request with a content type: application/json, use the following:
            // http.addHeader("Content-Type", "application/json");
            // int httpResponseCode = http.POST("{\"api_key\":\"tPmAT5Ab3j7F9\",\"sensor\":\"BME280\",\"value1\":\"24.25\",\"value2\":\"49.54\",\"value3\":\"1005.14\"}");

            // If you need an HTTP request with a content type: text/plain
            // http.addHeader("Content-Type", "text/plain");
            // int httpResponseCode = http.POST("Hello, World!");

            Serial.print("HTTP Response code: ");
            Serial.println(httpResponseCode);

            // Free resources
            http.end();
        }
        else
        {
            Serial.println("WiFi Disconnected");
        }
        lastTime = millis();
    }
}