import { View, Text } from "react-native";
import { StyleSheet } from "react-native";

const ManyuProfile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Text style={styles.name}>My Learnings</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Using Magnetometer:</Text>
        <Text style={styles.infoValue}>
          Creating compass require me to use magnetometer which is a sensor that
          measures strength and direction of magnetic field. To use
          magnetometer, need to import magnetometer from expo-sensors and set up
          subscription to access this sensor whenever you need and off whenever
          you don't need.
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Rotate Animation:</Text>
        <Text style={styles.infoValue}>
          Learn that React Native provides Animated API that allows me to create
          smooth animations for components. For mine i created a rotating needle
          using Animated. And setting its value to what magnetometer had
          received, creating a rotation animation.
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Conversion from Axis to Angle:</Text>
        <Text style={styles.infoValue}>
          One lesson or rather challenges was the need to learn about converting
          the x,y value gotten from magnetometer to angle.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  infoContainer: {
    marginTop: 20,
  },
  infoLabel: {
    fontWeight: "bold",
  },
  infoValue: {
    marginTop: 5,
  },
});

export default ManyuProfile;
