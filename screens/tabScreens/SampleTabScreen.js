import { useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";

// SAMPLE TAB SCREEN COMPONENTS

const SampleTabScreen = () => {
  const navigate = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Replace this with your application</Text>
    </View>
  );
};

export default SampleTabScreen;
