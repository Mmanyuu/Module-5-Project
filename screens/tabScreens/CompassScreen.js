import { Magnetometer } from "expo-sensors"; // Access magnetometer sensor
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import compassBg from "../../assets/compass_bg.png"; // Compass background image
import needle from "../../assets/needle.png"; // Needle image
import * as Location from "expo-location"; // Location module to get phone location

// Update intervals for the magnetometer
const UPDATE_INTERVAL_SLOW = 1000;
const UPDATE_INTERVAL_FAST = 16;

function CompassScreen() {
  const [{ x, y }, setData] = useState({ x: 0, y: 0 });
  const [magnetometerSubscription, setMagnetometerSubscription] = useState(null);
  const [angle, setAngle] = useState(0);
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const lastAngle = useRef(0); // Keep track of the last angle to avoid redundant updates

  // Set magnetometer update frequency
  const slowUpdate = () => Magnetometer.setUpdateInterval(UPDATE_INTERVAL_SLOW);
  const fastUpdate = () => Magnetometer.setUpdateInterval(UPDATE_INTERVAL_FAST);

  // Subscribe to magnetometer sensor
  const subscribe = () => {
    unsubscribe(); // Unsubscribe before subscribing again

    setMagnetometerSubscription(
      Magnetometer.addListener((result) => {
        setData(result);

        let newAngle = Math.atan2(result.y, result.x) * (180 / Math.PI);
        if (newAngle < 0) newAngle += 360; // Ensure angle is positive
        newAngle = newAngle % 360; // Normalize within 0-360

        // Only animate if angle change is significant (avoids jitter)
        if (Math.abs(newAngle - lastAngle.current) > 1) {
          lastAngle.current = newAngle; // Update last recorded angle

          rotateAnim.setValue(lastAngle.current); //Reset to prevent full rotation
          Animated.timing(rotateAnim, {
            toValue: newAngle,
            duration: 200,
            useNativeDriver: true,
          }).start(() => setAngle(newAngle)); // Set angle after animation
        }
      })
    );
  };

  // Unsubscribe from magnetometer sensor
  const unsubscribe = () => {
    if (magnetometerSubscription) {
      magnetometerSubscription.remove();
      setMagnetometerSubscription(null);
    }
  };

  // Request location permission once when the component mounts
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

    return () => unsubscribe();
  }, []);

  // Smooth rotation animation
  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Compass</Text>

      {/* Compass Dial & Needle */}
      <View style={styles.compassContainer}>
        <Image source={compassBg} style={styles.compassBackground} />
        <Animated.Image
          source={needle}
          style={[styles.needle, { transform: [{ rotate: rotateInterpolate }] }]}
        />
      </View>

      {/* Angle Display */}
      <Text style={styles.angleText}>{angle.toFixed(2)}°</Text>

      {/* Control Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            if (magnetometerSubscription) {
              unsubscribe();
            } else {
              subscribe();
            }
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {magnetometerSubscription ? "Stop" : "Start"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={slowUpdate} style={[styles.button, styles.middleButton]}>
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