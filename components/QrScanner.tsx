import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Dimensions } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

const { width, height } = Dimensions.get("window");
const scannerSquareSize = 300; // Size of the scanner square

export const QrScanner = ({ onScan }: any) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return (
      <View style={{ flex: 1 }}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={{ flex: 1 }}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.scannerContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={styles.overlayTop} />
        <View style={styles.overlayLeft} />
        <View style={styles.overlayRight} />
        <View style={styles.overlayBottom} />
        <View style={[styles.scannerSquare, styles.scannerBorder]} />
        <Text style={styles.bottomText}>Scan QR code to access the app</Text>
      </View>
    </View>
  );
};

const overlayWidth = (width - scannerSquareSize) / 2;
const overlayHeight = (height  - scannerSquareSize  )  /2 ;
const backgroundColor = "rgba(0,0,0,0.4)"
console.log(height)

const styles = StyleSheet.create({
  scannerContainer: {
    flex: 1,
    
  },
  overlayTop: {
    position: "absolute",
    backgroundColor,
    top: 0,
    height: overlayHeight,
    left: 0,
    right: 0,
  },
  overlayBottom: {
    position: "absolute",
    backgroundColor,
    top: overlayHeight + scannerSquareSize - 2,
    height: overlayHeight ,
    left: 0,
    right: 0,
  },
  overlayLeft: {
    position: "absolute",
    backgroundColor,
    height: scannerSquareSize - 2,
    top: overlayHeight  ,
    bottom: overlayHeight,
    left: 0,
    width: overlayWidth,
  },
  overlayRight: {
    position: "absolute",
    backgroundColor,
    height: scannerSquareSize - 2,
    top: overlayHeight,
    bottom: overlayHeight,
    right: 0,
    width: overlayWidth,
  },
  scannerSquare: {
    position: "absolute",
    width: scannerSquareSize,
    height: scannerSquareSize,
    left: overlayWidth,
    top: overlayHeight,
    bottom: overlayHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerBorder: {
    borderWidth: 2,
    borderColor: "blue",
    backgroundColor: "transparent",
    width: scannerSquareSize,
    height: scannerSquareSize,
  },
  bottomText: {
    position: 'absolute',
    width: '100%', // Make the text container full width
    textAlign: 'center', // Center text within the container
    fontSize: 20,
    color: "white",
    bottom: 80, // Position 50 pixels up from the bottom
  },
});
