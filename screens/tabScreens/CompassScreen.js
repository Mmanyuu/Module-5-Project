import { Magnetometer } from "expo-sensors";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import compassBg from "../../assets/compass_bg.png";
import needle from "../../assets/needle.png";
import * as Location from "expo-location";

function CompassScreen() {
  const [{ x, y }, setData] = useState({ x: 0, y: 0 });
  const [subscription, setSubscription] = useState(null);
  const [angle, setAngle] = useState(0);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const _slow = () => Magnetometer.setUpdateInterval(1000);
  const _fast = () => Magnetometer.setUpdateInterval(16);

  const _subscribe = () => {
    setSubscription(
      Magnetometer.addListener((result) => {
        setData(result);
        let newAngle = Math.atan2(result.y, result.x) * (180 / Math.PI);
        if (newAngle < 0) newAngle += 360;
        setAngle(newAngle % 720);

        // Animate rotation smoothly
        Animated.timing(rotateAnim, {
          toValue: newAngle,
          duration: 200,
          useNativeDriver: true,
        }).start();
      })
    );
  };

  const _unsubscribe = () => {
    subscription?.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
      } else {
        _subscribe();
      }
    };
    requestPermissions();
    return () => _unsubscribe();
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
          onPress={subscription ? _unsubscribe : _subscribe}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {subscription ? "Stop" : "Start"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={_slow}
          style={[styles.button, styles.middleButton]}
        >
          <Text style={styles.buttonText}>Slow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_fast} style={styles.button}>
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
