import { View, Text } from "react-native";
import { StyleSheet } from "react-native";

const JosephProfile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Text style={styles.name}>My Learnings</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>On Press && Scroll-View</Text>
        <Text style={styles.infoValue}>
          On Press : Adding the list when u have sth to do. Scroll
          View: Allowing us to scroll when the list added is more than
          a Page
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>
          Putting styling and javascript in 1 file
        </Text>
        <Text style={styles.infoValue}>
          This will make the file to be more organize and better to be
          view when wants to be read.
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Map</Text>
        <Text style={styles.infoValue}>
          Using mapping so that when the task is completed it will be
          added to the map as 1 component
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
    marginBottom: 20,
  },
  infoContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  infoLabel: {
    fontWeight: "bold",
  },
  infoValue: {
    marginTop: 5,
  },
});

export default JosephProfile;
