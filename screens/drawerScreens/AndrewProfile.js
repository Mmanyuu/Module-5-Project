import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { useEffect, useState } from "react";
import React from "react";
import * as Font from "expo-font";

// Set screen size
const { width: screenWidth, height: screenHeight } =
  Dimensions.get("window");

const AndrewProfile = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  // Load the custom font
  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        Orbitron: require("../../assets/fonts/Orbitron-Medium.ttf"),
        ChakraPetchMedium: require("../../assets/fonts/ChakraPetch-Medium.ttf"),
        ChakraPetchBold: require("../../assets/fonts/ChakraPetch-Bold.ttf"),
      });
      setFontLoaded(true);
    }

    loadFont();
  }, []);

  // Show loading screen until font is loaded
  if (!fontLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: "#B2B2B2" }]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>What have I learned?</Text>
      </View>

      <View style={styles.profileContainer}>
        <Text style={styles.textTitle}>// UX is everything!</Text>
        <Text style={styles.textBody}>
          Unlike web development, mobile development takes into
          consideration of all sensors available on mobile devices
          with considerable more ways of input format, things could
          happen with one wrong "move".
        </Text>
      </View>

      <View style={styles.profileContainer}>
        <Text style={styles.textTitle}>
          // Challenging to build app for all devices
        </Text>
        <Text style={styles.textBody}>
          It is challenging to design an app that looks and feel
          consistent across different platform, especially for Android
          devices as there are many different hardware makers with all
          sorts of screen sizes.
        </Text>
      </View>

      <View style={styles.profileContainer}>
        <Text style={styles.textTitle}>
          // Not all "SafeAreaView" are the same
        </Text>
        <Text style={styles.textBody}>
          SafeAreaView from React Native only works on iOS while
          SafeAreaView from "react-native-safe-area-context"
          dependency works with both ios and Android devices.
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>A.</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignContent: "center",
    margin: 20,
    borderTopWidth: 1,
    borderTopColor: "#000000",
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
  },
  headerText: {
    fontFamily: "ChakraPetchBold",
    fontSize: 18,
    padding: 14,
  },
  profileContainer: {
    backgroundColor: "#B2B2B2",
    margin: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
  textTitle: {
    fontFamily: "ChakraPetchBold",
    fontSize: 17,
    marginBottom: 10,
    padding: 5,
  },
  textBody: {
    fontFamily: "ChakraPetchMedium",
    fontSize: 16,
    color: "#666",
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingVertical: 15,
    bottom: 10,
  },
  footerText: {
    fontFamily: "Orbitron",
    fontSize: 14,
    color: "#000000",
  },
});

export default AndrewProfile;
