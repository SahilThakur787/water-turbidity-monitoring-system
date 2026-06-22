#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "your wifi name";
const char* password = "password";

const char* serverName = "http://10.174.82.76:8000/sensor-data"; # ip address

const int sensorPin = 34;

void setup() {
  Serial.begin(115200);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nWiFi Connected!");
}

void loop() {

  int turbidity = analogRead(sensorPin);

  Serial.print("Sensor Value: ");
  Serial.println(turbidity);

  if (WiFi.status() == WL_CONNECTED) {

    HTTPClient http;

    http.begin(serverName);
    http.addHeader("Content-Type", "application/json");

    String jsonData =
      "{\"turbidity\":" + String(turbidity) + "}";

    int httpResponseCode = http.POST(jsonData);

    Serial.print("HTTP Response Code: ");
    Serial.println(httpResponseCode);

    http.end();
  }

  delay(5000);
}