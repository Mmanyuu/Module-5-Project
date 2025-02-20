import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const imageUrls = [
  "https://images.unsplash.com/photo-1508614999368-9260051292e5",
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
  "https://images.unsplash.com/photo-1527689368864-3a821dbccc34",
  "https://unsplash.com/photos/orange-flowers-IicyiaPYGGI",
  "https://unsplash.com/illustrations/three-white-daisies-on-a-pink-background-REY_1qlnzQE",
  "https://unsplash.com/photos/macro-photography-of-drop-of-water-on-top-of-green-plant-Kp9z6zcUfGw",
  "https://unsplash.it/800/600?random",
];

export default function CameraProfileScreen({ route }) {
  const [photos, setPhotos] = useState([]);
  const [captions, setCaptions] = useState([]);
  const [imageBackground, setImageBackground] = useState(null);
  const [imageKey, setImageKey] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null); // State for the selected image URI
  const [captionInput, setCaptionInput] = useState(""); // State for the caption input
  const { profilePic, name } = route.params;

  useEffect(() => {
    loadPhotos();
    generateRandomImage();
  }, []);

  const deletePhoto = async (index) => {
    try {
      const updatedPhotos = photos.filter((_, i) => i !== index);
      const updatedCaptions = captions.filter((_, i) => i !== index);

      setPhotos(updatedPhotos);
      setCaptions(updatedCaptions);

      await AsyncStorage.setItem("photos", JSON.stringify(updatedPhotos));
      await AsyncStorage.setItem("captions", JSON.stringify(updatedCaptions));
    } catch (error) {
      console.error("Error deleting photo:", error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      promptForCaption(result.assets[0].uri);
    }
  };

  const promptForCaption = (imageUri) => {
    Alert.prompt(
      "Add a Caption",
      "Enter a caption for the selected image:",
      [
        {
          text: "Cancel",
          onPress: () => setSelectedImage(null),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async (caption) => {
            if (caption) {
              const newPhotos = [...photos, imageUri];
              const newCaptions = [...captions, caption];

              setPhotos(newPhotos);
              setCaptions(newCaptions);
              setSelectedImage(null);

              await AsyncStorage.setItem("photos", JSON.stringify(newPhotos));
              await AsyncStorage.setItem(
                "captions",
                JSON.stringify(newCaptions)
              );
            } else {
              Alert.alert(" Enter a caption for the capture 😊.");
              promptForCaption(imageUri);
            }
          },
        },
      ],
      "plain-text"
    );
  };

  const loadPhotos = async () => {
    const storedPhotos = await AsyncStorage.getItem("photos");
    const storedCaptions = await AsyncStorage.getItem("captions");
    if (storedPhotos) setPhotos(JSON.parse(storedPhotos));
    if (storedCaptions) setCaptions(JSON.parse(storedCaptions));
  };

  const generateRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    setImageBackground(imageUrls[randomIndex]);
    setImageKey((prevKey) => prevKey + 1);
  };

  return (
    <ImageBackground
      key={imageKey}
      source={{ uri: imageBackground }}
      style={styles.background}
    >
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.headerContainer}>
            <Text style={styles.nameText}>
              {name + "'s captured moments for the day "}
            </Text>
            <Image source={{ uri: profilePic }} style={styles.image} />
          </View>
          {photos.map((photo, index) => (
            <View key={index} style={styles.photoContainer}>
              <Image source={{ uri: photo }} style={styles.photo} />
              <Text style={styles.captionText}>
                {captions[index] || "No caption"}
              </Text>
              <TouchableOpacity onPress={() => deletePhoto(index)}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity style={styles.addButton} onPress={pickImage}>
            <Text style={styles.addButtonText}> Add your collections📔🏞 </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  // background: {
  // position: "absolute",
  // width: "100%",
  // height: "100%",
  // resizeMode: "cover",
  // },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  photoContainer: {
    alignItems: "center",

    marginBottom: 20,
    padding: 10,
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  photo: {
    width: 250,
    height: 180,
    borderRadius: 10,
  },
  captionInput: {
    marginTop: 10,
    width: "90%",
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#aaa",
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: "#ff4444",
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    // color: "red",
    color: "red",
    fontSize: 14,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  photoButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  photoButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
  },
  headerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    // borderBlockColor: "#FFD700",
    borderColor: "red",
    borderWidth: 5,
    borderColor: "#800080",
  },
  nameText: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
