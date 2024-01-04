import { StyleSheet, Text, View } from "react-native";
import { ShipmentType } from "../source/types/types";
import { Entypo } from "@expo/vector-icons";

export const ShipmentItem = ({ shipment }: { shipment: ShipmentType }) => {
  const renderWithComma = (value: string) => (value ? `${value}, ` : "");

  return (
    <View style={styles.shipmentContainer}>
      <View style={styles.statusContainer}>
        <Text style={styles.label}>{shipment.documentId}</Text>
        <Text style={[styles.statusLabel, getStatusStyle(shipment.status)]}>
          {shipment.status}
        </Text>
      </View>
      <View style={styles.destinationContainer}>
        <Entypo name="location-pin" size={24} color="green" />
        <View style={styles.addressTextContainer}>
          <Text>
            {renderWithComma(shipment.destinationAddress.line1)}
            {renderWithComma(shipment.destinationAddress.line2)}
            {renderWithComma(shipment.destinationAddress.postal)}
            {shipment.destinationAddress.city}
            {/*  {shipment.destinationAddress.countryName} */}
          </Text>
        </View>
      </View>
      <Text>
        <Text style={styles.label}>Date: </Text>
        {shipment.date.split("T")[0]}
      </Text>
      <View style={styles.itemQuantity}>
        <Text>
          {shipment.items.length} item{shipment.items.length > 1 && "s"}
        </Text>
      </View>
      {/*       {shipment.items.map((item: any) => (
        <View key={item.id} style={styles.itemContainer}>
          <Text>
            <Text style={styles.label}>Item ID:</Text> {item.id}
          </Text>
          <Text>
            <Text style={styles.label}>SKU:</Text> {item.item.sku}
          </Text>
          <Text>
            <Text style={styles.label}>Title:</Text> {item.item.title}
          </Text>
        </View>
      ))} */}
    </View>
  );
};
const getStatusStyle = (status: string) => {
  switch (status) {
    case "IN TRANSIT":
      return styles.inTransit;
    case "DELIVERED":
      return styles.delivered;
    case "DRAFT":
      return styles.draft;
    default:
      return styles.defaultStatus;
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  destinationContainer: {
    flexDirection: "row",
    gap: 4,
    maxWidth: 500,
    alignItems: "center",
  },
  label: {
    fontWeight: "bold",
    marginRight: 5,
  },
  addressTextContainer: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
  },
  shipmentContainer: {
    backgroundColor: "white",
    margin: 10,
    padding: 10,
    borderRadius: 8,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  itemContainer: {
    marginVertical: 5,
  },
  itemQuantity: {
    marginTop: 10,
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: "#d8d8d8",
    color: "#d8d8d8",
  },
  statusLabel: {
    color: "white",
    padding: 3,
    borderRadius: 5,
    overflow: "hidden",
  },
  inTransit: {
    backgroundColor: "orange",
  },
  draft: {
    backgroundColor: "red",
  },
  delivered: {
    backgroundColor: "green",
  },
  defaultStatus: {
    backgroundColor: "gray",
  },
});
