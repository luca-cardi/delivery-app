import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";

import { useColorScheme } from "react-native";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Homepage } from "./components/Homepage";
import QRCodeScanner from "react-native-qrcode-scanner";
import { QrScanner } from "./components/QrScanner";
import { Shipments } from "./components/Shipments";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  const [loaded, error] = useFonts({
    SpaceMono: require("./assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return <RootLayoutNav />;
}
function RootLayoutNav() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check for token in AsyncStorage on app start
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem("userToken");
      if (storedToken) {
        setToken(storedToken);
      }
    };

    loadToken();
  }, []);

  const handleScan = async (scannedToken: any) => {
    // Save token to AsyncStorage and state
    console.log(scannedToken.data, 'here')
/*     await AsyncStorage.setItem("userToken", scannedToken);
    setToken(scannedToken); */
  };

  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <NavigationContainer>
        <Stack.Navigator>
          {!token ? (
            // Show QR Scanner Page if no token
            <Stack.Screen name="QRScanner"   options={{ headerTitle: 'Scan QR Code' }}>
              {(props) => <QrScanner {...props} onScan={handleScan} />}
            </Stack.Screen>
          ) : (
            // Show Home Page and Shipments Page if token exists
            <>
              <Stack.Screen name="Home" component={Homepage} />
              <Stack.Screen name="Shipments" component={Shipments} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
