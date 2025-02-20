import { CameraView, useCameraPermissions } from "expo-camera";
import { View, Text, Button, StyleSheet,TouchableOpacity, } from "react-native";
// import { styles } from "../styles/styles";
import * as MediaLibrary from "expo-media-library";
import { useState, useRef } from "react";

export default function CameraScreen({ navigation }) {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button
          title="grant permission"
          onPress={() => {
            requestPermission();
          }}
        ></Button>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => {
      return current === "back" ? "front" : "back";
    });
  }

  async function takePhoto() {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({});
        await MediaLibrary.saveToLibraryAsync(photo.uri);
        alert("Photo saved to gallery!");
        navigation.navigate("CameraHome");
      } catch (error) {
        alert("Failed to take photo");
      }
    }
  }

  // cameraRef.style =
  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              toggleCameraFacing();
            }}
          >
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <View style={styles.photoButton}>
              <View style={styles.photoButtonInner}></View>
            </View>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 30,
    },
    buttonContainer: {
      alignItems: "stretch",
    },
    launchButton: {
      backgroundColor: "#2196F3",
      padding: 15,
      borderRadius: 10,
    },
    launchButtonText: {
      color: "black",
      fontSize: 18,
      textAlign: "center",
      fontWeight: "bold",
    },
    camera: {
      flex: 1,
    },
    button: {
      alignItems: "center",
      padding: 10,
    },
    text: {
      fontSize: 24,
      fontWeight: "bold",
      color: "white",
    },
    message: {
      textAlign: "center",
      paddingBottom: 10,
    },
    imageContainer: {
      marginTop: 30,
      alignItems: "center",
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
  });
  
