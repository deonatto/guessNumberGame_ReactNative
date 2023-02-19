import { StyleSheet, Text } from "react-native";
import Colors from "../../constants/color";

const IntructionText = ({ text }) => {
  return <Text style={styles.intructionText}>{text}</Text>;
};

export default IntructionText;

const styles = StyleSheet.create({
  intructionText: {
    color: Colors.accent500,
    fontSize: 24,
  },
});
