import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "@env";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import { DeliveryType } from "../source/types/types";
import { ShipmentItem } from "./ShipmentItem";

export const Shipments = () => {
  const [deliveries, setDeliveries] = useState<DeliveryType[]>();

  const getShipments = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/outbound/shp/carrier-documents?carrierId=1`
      );

      setDeliveries(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getShipments();
  }, []);

  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          {deliveries?.map((delivery) => (
            <View key={delivery.id} style={styles.deliveryContainer}>
              <View style={styles.firstContainer}>
                <View style={styles.line} />
                <Text style={styles.deliveryId}>{delivery.documentId}</Text>
              </View>
              {delivery.shipments.map((shipment) => (
                <ShipmentItem key={shipment.id} shipment={shipment} />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  deliveryContainer: {
    padding: 5,
    backgroundColor: "#ececec",
  },
  firstContainer: {
    position: "relative",
    alignItems: "center",
  },
  line: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#949494",
  },
  deliveryId: {
    zIndex: 2,
    width: 120,
    backgroundColor: "#ececec",
    fontSize: 18,
    textAlign: "center",
    color: "#1e1e1e",
  },
});
