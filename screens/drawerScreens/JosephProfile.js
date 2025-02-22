import { useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";

// SAMPLE DRAWER SCREEN COMPONENTS

const JosephProfile = ({ route }) => {
  const navigate = useNavigation();
  const { message } = route.params || {
    message: "This is my profile and what I have learned.",
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{message}</Text>
    </View>
  );
};

export default JosephProfile;