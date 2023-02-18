import { StyleSheet, ImageBackground, SafeAreaView} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/color";
import { useState } from "react";

export default function App() {
  const [userNumber, setUserNumber] = useState();

  const pickNumberHandler = (pickedNumber) =>{
    setUserNumber(pickedNumber);
  }

  return (
    <LinearGradient colors={[Colors.primary700, Colors.accent500]} style={styles.rootScreen}>
      <ImageBackground
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>
          {userNumber ? <GameScreen userNumber={userNumber}/> : <StartGameScreen onPickNumber={pickNumberHandler}/>}
        </SafeAreaView>
        
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage:{
    opacity: 0.2
  }
});
