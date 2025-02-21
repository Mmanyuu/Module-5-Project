import { Magnetometer } from "expo-sensors"; // Alloq access to device magnetometer to het magnetic field data
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import compassBg from "../../assets/compass_bg.png"; //Compass background image
import needle from "../../assets/needle.png"; //Needle image
import * as Location from "expo-location"; //Expo location module to get location of phone

function CompassScreen() {

  const [{ x, y }, setData] = useState({ x: 0, y: 0 }); //Storing magnetometer data in x adn y here.
  const [magnetometerSubscription, setMagnetometerSubscription] = useState(null); //keeps track of magnetometer subcription (whether its active or not)
  const [angle, setAngle] = useState(0); //Storing the current angle of the compass
  const rotateAnim = useRef(new Animated.Value(0)).current; //rotateAnim is a reference to an animated value used for rotating the needle.
  const [buttonColor, setButtonColor] = useState("#333");

  //Defining function to set the update interval for the magnetometer
  const slowUpdate = () => Magnetometer.setUpdateInterval(1000); //1000ms
  const fastUpdate = () => Magnetometer.setUpdateInterval(16); //16

  //Need to on the magnetometer (i.e. subscribe) and calculate the new angle based on teh x and y values. It will also animates the needle's rotation
  const subscribe = () => {
    //Adds a listener to the magnetometer to get the magnetic field data
    setMagnetometerSubscription(
      Magnetometer.addListener((result) => {
        setData(result); //Store the magnetometer data in x and y
        let newAngle = Math.atan2(result.y, result.x) * (180 / Math.PI);
        if (newAngle < 0) newAngle += 360;
        setAngle(newAngle % 720); //Set the angle to the new angle

        // Animate rotation smoothly  
        Animated.timing(rotateAnim, {
          toValue: newAngle,
          duration: 200,
          useNativeDriver: true,
        }).start();
      })
    );
  };

  const unsubscribe = () => {
    magnetometerSubscription?.remove();
    setMagnetometerSubscription(null);
  };

  useEffect(() => {
    subscribe();
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
      } else {
        subscribe();
      }
    };
    requestPermissions();
    return () => unsubscribe(); //Unsubscribe from the magnetometer when the component unmounts
  }, []);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 360, 720],
    outputRange: ["0deg", "360deg", "720deg"],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Compass</Text>

      {/* Compass Container */}
      <View style={styles.compassContainer}>
        <Image source={compassBg} style={styles.compassBackground} />
        <Animated.Image
          source={needle}
          style={[
            styles.needle,
            { transform: [{ rotate: rotateInterpolate }] },
          ]}
        />
      </View>

      <Text style={styles.angleText}>{angle.toFixed(2)}°</Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>

        <TouchableOpacity
          onPress={magnetometerSubscription ? unsubscribe : subscribe}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {magnetometerSubscription ? "Stop" : "Start"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={slowUpdate}
          style={[styles.button, styles.middleButton]}
        >
          <Text style={styles.buttonText}>Slow</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={fastUpdate} style={styles.button}>
          <Text style={styles.buttonText}>Fast</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  compassContainer: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  compassBackground: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  needle: {
    width: 50,
    height: 150,
    position: "absolute",
    resizeMode: "contain",
  },
  angleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4caf50",
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 30,
  },
  button: {
    flex: 1,
    padding: 12,
    backgroundColor: "#333",
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
  },
  middleButton: {
    backgroundColor: "#555",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default CompassScreen;