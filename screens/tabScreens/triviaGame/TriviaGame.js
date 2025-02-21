import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Accelerometer } from "expo-sensors";
import { questions } from "./questions";
import Heart from "../../../assets/Heart.svg";
import * as Font from "expo-font";

// Set screen size
const { width: screenWidth, height: screenHeight } =
  Dimensions.get("window");

// Shuffle and pick 20 random questions
const getRandomQuestions = (questions, limit = 20) => {
  return [...questions]
    .sort(() => Math.random() - 0.5)
    .slice(0, limit);
};

const TriviaGame = ({ navigation }) => {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [tiltBackground, setTiltBackground] = useState(null);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [isProcessingAnswer, setIsProcessingAnswer] = useState(false);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [needsReset, setNeedsReset] = useState(false);
  const [lastTiltDirection, setLastTiltDirection] = useState(null);
  const [fontLoaded, setFontLoaded] = useState(false);

  // Turn Drawer Header Color To Component Background Color
  useFocusEffect(
    React.useCallback(() => {
      // When screen is focused, set the header color
      const parent = navigation.getParent();
      if (parent) {
        parent.setOptions({
          headerStyle: {
            backgroundColor: "#b2b2b2",
            elevation: 0,
            shadowOpacity: 0,
          },
        });
      }

      // When screen loses focus, reset the header color
      return () => {
        const parent = navigation.getParent();
        if (parent) {
          parent.setOptions({
            headerStyle: { backgroundColor: "#ffffff" },
          });
        }
      };
    }, [navigation])
  );

  // Load the custom font
  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        Orbitron: require("../../../assets/fonts/Orbitron-Medium.ttf"),
        ChakraPetchMedium: require("../../../assets/fonts/ChakraPetch-Medium.ttf"),
      });
      setFontLoaded(true);
    }

    loadFont();
  }, []);

  // Pick the randomized questions once component loads
  useEffect(() => {
    setShuffledQuestions(getRandomQuestions(questions));
  }, []);

  // Clean up accelerometer when component unmounts
  useEffect(() => {
    return () => {
      Accelerometer.removeAllListeners();
    };
  }, []);

  // Exit if there is no question or game is over
  useFocusEffect(
    React.useCallback(() => {
      if (shuffledQuestions.length === 0) return;

      if (gameOver) {
        Accelerometer.removeAllListeners(); // Stop accelerometer when game is over
        return;
      }

      // Set up listener for accelerometer data and manage all different tilt positions / states
      const subscription = Accelerometer.addListener(({ x }) => {
        // When device is in neutral position and we need to reset
        if (Math.abs(x) < 0.2 && needsReset) {
          setNeedsReset(false);
          setTiltBackground(null);

          // Only advance to next question when device returns to neutral
          if (currentQuestionIndex < shuffledQuestions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
          } else {
            setGameOver(true);
          }

          setFeedback(null);
          setIsProcessingAnswer(false);
          setLastTiltDirection(null);
        }
        // When not processing an answer nor waiting for the device to return to neutral, detect new tilts
        else if (!isProcessingAnswer && !needsReset) {
          if (x > 0.4 && lastTiltDirection !== "right") {
            setTiltBackground("#BD6FF5");
            checkAnswer("B");
            setLastTiltDirection("right");
          } else if (x < -0.4 && lastTiltDirection !== "left") {
            setTiltBackground("#F34D4D");
            checkAnswer("A");
            setLastTiltDirection("left");
          }
        }
      });

      // Update frequency set to 400ms to balance responsiveness and performance
      Accelerometer.setUpdateInterval(400);
      return () => {
        subscription.remove();
        Accelerometer.removeAllListeners();
      };
    }, [
      currentQuestionIndex,
      shuffledQuestions,
      isProcessingAnswer,
      needsReset,
      lastTiltDirection,
      // gameOver,
    ])
  );

  // Play game, update scores and attempts
  const checkAnswer = (selectedAnswer) => {
    if (shuffledQuestions.length === 0 || isProcessingAnswer) return;
    // Prevents multiple answers from being processed at the same time by disabling input temporarily.
    setIsProcessingAnswer(true);

    const currentQuestion = shuffledQuestions[currentQuestionIndex];

    // Increment total attempts
    setTotalAttempts((prevAttempts) => prevAttempts + 1);

    // Update score if the answer is correct
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
      setFeedback("[  correct  ]");
    } else {
      setLives((prev) => prev - 1);
      setFeedback("[  nope  ]");
    }

    // Wait for device to return to neutral before next cycle
    setNeedsReset(true);
  };

  // Display heart SVG based on remaining lives
  const renderLives = () => {
    let hearts = [];
    for (let i = 0; i < lives; i++) {
      hearts.push(<Heart key={i} width={24} height={24} />);
    }
    return <View style={styles.heartsContainer}>{hearts}</View>;
  };

  useEffect(() => {
    if (lives === 0) setGameOver(true);
  }, [lives]);

  const resetGame = () => {
    setScore(0);
    setTotalAttempts(0);
    setLives(5);
    setCurrentQuestionIndex(0);
    setGameOver(false);
    setTiltBackground(null);
    setFeedback(null);
    setNeedsReset(false);
    setLastTiltDirection(null);
    setShuffledQuestions(getRandomQuestions(questions)); // Get new 20 random questions
  };

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
      style={[
        styles.container,
        { backgroundColor: tiltBackground || "#B2B2B2" },
      ]}
    >
      {/* HEADER with Safe Area Padding */}
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Score: {score} / {totalAttempts}
        </Text>
        <Text style={styles.headerHeart}>{renderLives()}</Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Compile & Conquer</Text>
      </View>

      {/* Q & A COMPONENTS */}
      <View style={styles.questionContainer}>
        {shuffledQuestions.length > 0 ? (
          <>
            <Text style={styles.questionText}>
              {shuffledQuestions[currentQuestionIndex]?.question}
            </Text>

            <View style={styles.answersContainer}>
              <View
                style={[
                  styles.answerBox,
                  tiltBackground && {
                    backgroundColor: tiltBackground,
                  },
                ]}
              >
                <Text style={styles.answerText}>
                  {shuffledQuestions[currentQuestionIndex]?.answerA}
                </Text>
              </View>

              <View
                style={[
                  styles.answerBox,
                  tiltBackground && {
                    backgroundColor: tiltBackground,
                  },
                ]}
              >
                <Text style={styles.answerText}>
                  {shuffledQuestions[currentQuestionIndex]?.answerB}
                </Text>
              </View>
            </View>
          </>
        ) : (
          <Text>Loading questions...</Text>
        )}
      </View>

      {/* SUMMARY MODAL */}
      <Modal transparent={true} visible={gameOver}>
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent]}>
            {score === 20 ? (
              <View>
                <Text style={[styles.modalTitle]}>
                  Trivia God Mode Activated!
                </Text>
                <Text style={styles.modalText}>
                  "Google called. They want you to answer their
                  questions now."
                </Text>
                <Text style={styles.modalText}>
                  Final Score: 20/20
                </Text>
              </View>
            ) : score >= 16 ? (
              <View>
                <Text style={[styles.modalTitle]}>
                  So close, yet so far!
                </Text>
                <Text style={styles.modalText}>
                  "You almost reached greatness… but almost doesn't
                  cut it, does it?"
                </Text>
                <Text style={styles.modalText}>
                  Final Score: {score}/20
                </Text>
              </View>
            ) : score >= 11 ? (
              <View>
                <Text style={[styles.modalTitle]}>
                  If trivia had a 'middle-class,' you'd be it.
                </Text>
                <Text style={styles.modalText}>
                  "You have some knowledge, but let's not get ahead of
                  ourselves."
                </Text>
                <Text style={styles.modalText}>
                  Final Score: {score}/20
                </Text>
              </View>
            ) : score >= 6 ? (
              <View>
                <Text style={[styles.modalTitle]}>
                  Hey, at least you got some!
                </Text>
                <Text style={styles.modalText}>
                  "You're in the 'participation trophy' zone.
                  Congrats?"
                </Text>
                <Text style={styles.modalText}>
                  Final Score: {score}/20
                </Text>
              </View>
            ) : score >= 1 ? (
              <View>
                <Text style={[styles.modalTitle]}>
                  Well... at least you showed up!
                </Text>
                <Text style={styles.modalText}>
                  "This quiz wasn't an open-book test, but even if it
                  was, would it have helped?"
                </Text>
                <Text style={styles.modalText}>
                  Final Score: {score}/20
                </Text>
              </View>
            ) : (
              <View>
                <Text style={[styles.modalTitle]}>Zero? Ouch.</Text>
                <Text style={styles.modalText}>
                  "I've seen better trivia answers from people who
                  didn't even take the quiz."
                </Text>
                <Text style={styles.modalText}>
                  Final Score: 0/20
                </Text>
              </View>
            )}
            <TouchableOpacity
              style={[styles.restartButton]}
              onPress={resetGame}
            >
              <Text style={styles.buttonText}>Play Again</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {feedback && (
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackText}>{feedback}</Text>
        </View>
      )}

      {/* FOOTER */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={resetGame}
        >
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>
          Tilt left or right to answer
        </Text>
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
  // HEADER //
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    margin: 20,
    borderTopWidth: 1,
    borderTopColor: "#000000",
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
  },
  headerText: {
    fontFamily: "ChakraPetchMedium",
    fontSize: 14,
    padding: 14,
    color: "#333",
  },
  heartsContainer: {
    flexDirection: "row",
    padding: 11,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Orbitron",
    fontSize: 18,
    color: "#333",
  },
  // Q & A COMPONENTS
  questionContainer: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 180,
  },
  questionText: {
    fontFamily: "ChakraPetchMedium",
    fontSize: 17,
    fontWeight: "500",
    textAlign: "center",
    margin: 20,
    marginTop: 10,
    marginBottom: 20,
    color: "#333",
  },
  answersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  answerBox: {
    width: "40%",
    margin: 20,
    padding: 10,
    backgroundColor: "#B2B2B2",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    // Shadow for Android
    elevation: 4,
  },
  answerText: {
    fontFamily: "ChakraPetchMedium",
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
  },
  // SUMMARY MODAL //
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#A0A0A0",
    borderColor: "#FFFFFF",
    borderWidth: 2,
    padding: 30,
    borderRadius: 15,
    alignItems: "center",
    width: "80%",
    opacity: 0.9,
  },
  modalTitle: {
    fontFamily: "ChakraPetchMedium",
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  modalText: {
    fontFamily: "ChakraPetchMedium",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 20,
  },
  restartButton: {
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 50,
  },
  buttonText: {
    fontFamily: "ChakraPetchMedium",
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  // FEEDBACK TEXT //
  feedbackContainer: {
    position: "absolute",
    bottom: 250,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 1,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    // Shadow for Android
    elevation: 4,
  },
  feedbackText: {
    fontFamily: "ChakraPetchMedium",
    fontSize: 24,
    color: "#FFFFFF",
  },
  // FOOTER //
  bottomContainer: {
    alignItems: "center",
    marginBottom: 60,
  },
  resetButton: {
    backgroundColor: "#",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 50,
  },
  resetButtonText: {
    fontFamily: "ChakraPetchMedium",
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  footerText: {
    fontFamily: "ChakraPetchMedium",
    color: "#595959",
    fontSize: 12,
  },
});

export default TriviaGame;
