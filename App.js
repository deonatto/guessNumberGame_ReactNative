import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/color";
import { useState } from "react";
import GameOverScren from "./screens/GameOverScreen";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [rounds, setRounds] = useState(0);
  const [gameIsOver, setGameIsOver] = useState(false);

  const pickNumberHandler = (pickedNumber) => {
    setUserNumber(pickedNumber);
  };

  const gameOverHandler = (rounds) => {
    setGameIsOver(true);
    setRounds(rounds);
  };

  const startNewGameHandler = () => {
    setUserNumber(null);
    setGameIsOver(false);
    setRounds(0);
  };

  const screensHandler = () => {
    return userNumber ? (
      gameIsOver ? (
        <GameOverScren
          userNumber={userNumber}
          rounds={rounds}
          onStartNewGame={startNewGameHandler}
        />
      ) : (
        <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
      )
    ) : (
      <StartGameScreen onPickNumber={pickNumberHandler} />
    );
  };
  return (
    <React.Fragment>
      <StatusBar style="light" />
      <LinearGradient
        colors={[Colors.primary700, Colors.accent500]}
        style={styles.rootScreen}
      >
        <ImageBackground
          source={require("./assets/images/background.png")}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaView style={styles.rootScreen}>
            {screensHandler()}
          </SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.2,
  },
});
