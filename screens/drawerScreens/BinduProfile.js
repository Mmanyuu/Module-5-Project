import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, ScrollView } from "react-native";

// All about our day to day activities in pictures

const BinduProfile = ({ route }) => {
  const navigate = useNavigation();
  const { message } = route.params || {
    message: "# My Learnings #",
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.heading}>{message}{"\n"}</Text>
        
        <Text style={styles.paragraph}>
          <Text style={styles.heading}>Understanding Index-Based Associations: </Text> Associating data elements
          based on their indices can lead to inconsistencies, especially when
          the dataset undergoes modifications such as additions or deletions.
          For instance, in a list of photos and captions, removing a photo
          shifts the indices of subsequent items, causing misalignment between
          photos and their corresponding captions. To maintain accurate
          associations, it's advisable to use unique identifiers for each
          element, ensuring that relationships remain consistent regardless of
          changes in the dataset. {"\n\n"}
          <Text style={styles.heading}>Utilizing AsyncStorage in React Native:  </Text>
          AsyncStorage is an asynchronous, unencrypted, persistent key-value
          storage system for React Native applications. It enables developers to
          store data persistently across app sessions, making it useful for
          saving user preferences, app settings, or caching data for offline
          use. Unlike synchronous storage solutions, AsyncStorage operates
          asynchronously, preventing blocking of the main thread and ensuring
          smooth user experiences.
        </Text>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
  scrollViewContent: {
    padding: 10, // Inner padding for the ScrollView content
  },
  heading: {
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default BinduProfile;
