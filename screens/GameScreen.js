import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  FlatList,
  useWindowDimensions,
} from "react-native";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/UI/PrimatyButton";
import Title from "../components/UI/Title";
import Card from "../components/UI/Card";
import IntructionText from "../components/UI/IntructionText";
import LogItem from "../components/game/LogItem";
import { Ionicons } from "@expo/vector-icons";

let minBoundary = 1;
let maxBoundary = 100;
// function to generate random number between min and max values
const generateRandomNumber = (min, max, exclude) => {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomNumber(min, max, exclude);
  } else {
    return rndNum;
  }
};

const GameScreen = ({ userNumber, onGameOver }) => {
  const initialGuess = generateRandomNumber(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);
  const { width } = useWindowDimensions();

  //check if game is over every time user changes guessed value
  useEffect(() => {
    if (currentGuess === Number(userNumber)) {
      onGameOver(guessRounds.length);
      minBoundary = 1;
      maxBoundary = 100;
    }
  }, [currentGuess, userNumber, onGameOver]);

  const checkIfUserisLying = (direction) => {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Don´t lie!", "You know that this is wrong", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return true;
    }
  };
  const nextGuessHandler = (direction) => {
    const isLying = checkIfUserisLying(direction);
    if (isLying) {
      return;
    }
    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRndNumber = generateRandomNumber(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
    setGuessRounds((prevState) => [newRndNumber, ...prevState]);
  };

  let content = (
    <React.Fragment>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <IntructionText text="Higher or lower?" />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler("lower")}>
              <Ionicons name="md-remove" size={24} />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler("greater")}>
              <Ionicons name="md-add" size={24} />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </React.Fragment>
  );

  if (width > 500) {
    content = (
      <React.Fragment>
        <IntructionText text="Higher or lower?" />
        <View style={styles.buttonsContainerWide}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler("lower")}>
              <Ionicons name="md-remove" size={24} />
            </PrimaryButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler("greater")}>
              <Ionicons name="md-add" size={24} />
            </PrimaryButton>
          </View>
        </View>
      </React.Fragment>
    );
  }

  return (
    <View style={styles.screen}>
      <Title> Opponent's Guess </Title>
      {content}
      <View style={styles.flatListContainer}>
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <LogItem
              round={guessRounds.length - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 35,
    alignItems: "center",
  },
  buttonsContainerWide: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  flatListContainer: {
    flex: 1,
    padding: 10,
  },
});
