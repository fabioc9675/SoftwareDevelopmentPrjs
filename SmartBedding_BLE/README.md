# Bluetooth component project

## Tutorial link

Video: https://www.youtube.com/watch?v=-xzSubrE24o

## Component

To install the component in the project use `npm install --save react-native-bluetooth-serial-next`. To link the component to the aplication execute `npx react-native link react-native-bluetooth-serial-next`

# BLE APP iOS

## Tutorial

Follow the tutorial in the link: https://blog.bam.tech/developer-news/make-your-first-iot-react-native-application-with-the-bluetooth-low-energy

## React Native Environment installation

Link: https://blog.bam.tech/developer-news/make-a-react-native-app-from-scratch-to-the-stores-part-1-get-started

## Project creation

Initializate the project with the follow command `npx react-native init BleProject --template react-native-template-typescript`, in case cocoapods doesn't work then use `sudo xcode-select --switch /Applications/Xcode.app`and then `cd ./BleProject/ios && pod install`.

It is possible to use `expo init BluetoothApp` with typescript template and use `expo eject` inside the project folder to create android and iOS deployment folders, use names as `com.example.projectname` in both cases

BLE dependency is availble on `npm install --save react-native-ble-plx`, then go to ios folder and use `pod update`

follow the react-native-ble-plx instruction to activate the BLE component, in `/ìos/projectName/info.plist` add the follow lines to activate BLE component
`<key>NSBluetoothAlwaysUsageDescription</key>`
`<string>Our app uses bluetooth to find, connect and transfer data between different devices</string>`

https://github.com/dotintent/react-native-ble-plx

## Xcode configuration

Adding support for different operative sistem versions in Xcode `https://github.com/filsv/iPhoneOSDeviceSupport`

Installation of native-base:`npm install native-base styled-components styled-system`, `expo install expo-font`
Link: https://www.youtube.com/watch?v=91vhZKjguh4
