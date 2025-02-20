import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, ScrollView } from "react-native";

// All about our day to day activities in pictures

const Moments = ({ route }) => {
  const navigate = useNavigation();
  const { message } = route.params || {
    message: "Bindu's Learnings .",
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.heading}>{message}</Text>
        <Text style={styles.paragraph}>
          {"\n"} The <Text style={styles.heading}>"Moments" </Text> app enables
          users to create a daily photo feed by uploading multiple memorable
          photos from various moments of each day. This feature allows users
          to document and reflect on their memories over time, building a
          personal collection of cherished moments.{"\n\n"}
          <Text style={styles.heading}>Permission Handling:</Text> Before
          accessing the media library, the app requests the necessary
          permissions, adhering to best practices for user privacy and security.
          {"\n\n"}
          <Text style={styles.heading}>Handling Image Selection: </Text> The app
          uses the expo-image-picker library to allow users to select images
          from their device’s gallery.
          {"\n\n"}
          <Text style={styles.heading}>Asynchronous Storage:</Text> Selected
          profile images are stored persistently using
          @react-native-async-storage/async-storage. This ensures that user data
          remains available across app sessions.
          {"\n\n"}
          <Text style={styles.heading}>Dynamic Backgrounds:</Text> Upon each
          launch, the app sets a random background image from a predefined list,
          enhancing visual appeal.
          {"\n\n"}
          <Text style={styles.heading}>
            Error Handling and User Feedback:
          </Text>{" "}
          The app provides feedback through alerts if permissions are denied or
          if the user attempts to upload a profile picture without entering a
          name, ensuring a smooth user experience.
          {"\n\n"}
          <Text style={styles.heading}>State Management: </Text>The app manages
          various states like photos, captions, selectedImage, and others to
          control the UI and logic. The state updates are triggered whenever a
          new image is added or an image is deleted.
          {"\n\n"}
          <Text style={styles.heading}>User Interactions:</Text> Users can
          delete photos with captions through a delete button, which updates the
          photos and captions states accordingly. Users are prompted to enter
          captions for images when they select an image. If no caption is
          entered, the app will prompt the user again.
          {"\n\n"}
          <Text style={styles.heading}>UI Design:</Text>The UI is styled to
          create a pleasant user experience, with a scrollable view of images,
          captions, and a background image. Each image is displayed within a
          styled container, and the buttons are visually distinct to improve
          interaction clarity.
        </Text>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFDD0",
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

export default Moments;
