import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/UI/PrimatyButton";
import Title from "../components/UI/Title";


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

const GameScreen = ({ userNumber, onGameOver}) => {
  const initialGuess = generateRandomNumber(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  //check if game is over every time user changes guessed value
  useEffect(()=>{
    if(currentGuess === Number(userNumber)){
      onGameOver();
    }
  }, [currentGuess, userNumber, onGameOver]);

  const checkIfUserisLying = (direction) =>{
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Don´t lie!", "You know that this is wrong", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return true;
    }
  }
  const nextGuessHandler = (direction) => {
    const isLying = checkIfUserisLying(direction);
    if(isLying){
      return
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
  };

  return (
    <View style={styles.screen}>
      <Title> Opponent's Guess </Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Text>Higher or lower ?</Text>
        <View>
          <PrimaryButton onPress={() => nextGuessHandler("lower")}>
            -
          </PrimaryButton>
          <PrimaryButton onPress={() => nextGuessHandler("greater")}>
            +
          </PrimaryButton>
        </View>
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
  },
});
