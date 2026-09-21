import { View, StyleSheet, Text, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

import { playSound } from "../services/soundHandler";
import { COLORS } from "../constants";

const Item = ({ item, onDelete }) => {
  const navigation = useNavigation();

  function openEditWord() {
    navigation.navigate("EditWord", {
      wordData: item,
    });
  }

  return (
    <View style={styles.item}>
      <Pressable
        disabled={!item.audio}
        onPress={() => playSound(item.audio)}
      >
        <View style={styles.iconContainer}>
          <Ionicons
            name="play-outline"
            size={28}
            style={
              !item.audio
                ? { color: COLORS.grey300 }
                : { color: COLORS.primary900 }
            }
          />
        </View>
      </Pressable>

      <Pressable
        style={styles.textContainer}
        onPress={openEditWord}
      >
        <Text style={styles.title}>{item.word}</Text>

        <Text style={styles.definition}>
          {item.meaning}
        </Text>
      </Pressable>

      <Pressable
        style={styles.iconContainer}
        onPress={() => onDelete(item.word)}
      >
        <Ionicons
          name="trash-outline"
          size={22}
          color={COLORS.secondary800}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  iconContainer: {
    width: 45,
    alignItems: "center",
    justifyContent: "center",
  },

  textContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.white,
  },

  definition: {
    fontSize: 16,
    color: COLORS.grey600,
    marginTop: 4,
  },
});

export default Item;