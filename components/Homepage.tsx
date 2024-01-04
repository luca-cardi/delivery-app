import { Text, View } from "./Themed";
import { Button } from "react-native";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const Homepage = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <View>
      <View>
        <Text lightColor="rgba(0,0,0,0.8)" darkColor="rgba(255,255,255,0.8)">
          Homepage
        </Text>
        <Button
          title="Go to Shipments"
          onPress={() => navigation.navigate("Shipments")}
        />
      </View>
    </View>
  );
};
