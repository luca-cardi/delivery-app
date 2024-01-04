
export type DeliveryType = {
  id: number;
  documentId: string;
  details: string;
  pickupDateUtc: string;
  returnDistance: number;
  returnDuration: number;
  shipments: ShipmentType[];
};

export type ShipmentType = {
  id: number;
  documentId: string;
  status: string;
  destinationAddress: {
    name: string;
    att: string;
    line1: string;
    line2: string;
    city: string;
    state: string;
    postal: string;
    countryCode: string;
    email: string;
    gln: string;
    phone: string;
    countryName: string;
  };
  date: string;
  codValue: number;
  deliveryInstructions: string;
  driverNotes: string;
  pickupPosition: number;
  pickupDuration: number;
  pickupDistance: number;
  items: {
    id: number;
    item: {
      id: string;
      sku: string;
      title: string;
      brand: string;
      category: string;
      department: string;
      inventoryModel: string;
      inventoryProfile: string;
    };
    identifiers: string[];
    itemDescription: string;
    qtyPacked: number;
    qtyValidated: number;
    packNumber: number;
    packSerial: string;
    packSSCC: string;
    palletSerial: string;
    palletSSCC: string;
    packedWeight: number;
  }[];
};
