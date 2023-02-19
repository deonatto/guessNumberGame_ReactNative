import { StyleSheet, View, Text } from "react-native";
import Colors from "../../constants/color";

const LogItem = ({ round, guess }) => {
  return (
    <View style={styles.listItem}>
      <Text>#{round}</Text>
      <Text>Opponent's Guess: {guess}</Text>
    </View>
  );
};

export default LogItem;

const styles = StyleSheet.create({
  listItem: {
    borderColor: Colors.primary800,
    borderWidth: 1,
    borderRadius: 10,
    padding: 30,
    marginVertical: 8,
    backgroundColor: Colors.accent500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowRadius: 3
  },
});
