import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Image,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";
import { getWordInfo } from "../services/wordsHandler";
import Ionicons from "@expo/vector-icons/Ionicons";
import { playSound } from "../services/soundHandler";
import { COLORS } from "../constants";

function AddWord({ navigation }) {
  const [text, setText] = useState("");
  const [wordData, setWordData] = useState();

  // Початковий заголовок
  useEffect(() => {
    navigation.setOptions({
      title: "Adding word",
    });
  }, [navigation]);

  // Пошук слова після введення
  useEffect(() => {
    if (!text) {
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      const wordDataReceived = await getWordInfo(text);

      setWordData(wordDataReceived);

      if (wordDataReceived?.word) {
        navigation.setOptions({
          title: `Adding word "${wordDataReceived.word}"`,
        });
      } else {
        navigation.setOptions({
          title: "Adding word",
        });
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [text, navigation]);

  function onChangeText(value) {
    setText(value);
    setWordData(undefined);

    // Якщо поле очищено — одразу повертаємо
    // стандартний заголовок
    if (!value) {
      navigation.setOptions({
        title: "Adding word",
      });
    }
  }

  function onAdd() {
    if (!wordData?.word) {
      return;
    }

    navigation.navigate("AllWords", {
      wordData,
    });
  }

  return (
    <>
      <Image
        style={styles.image}
        source={require("../assets/add.png")}
      />

      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          Your word to search:
        </Text>

        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="type here.."
          placeholderTextColor={COLORS.grey600}
        />
      </View>

      {wordData && wordData.word && (
        <View style={styles.receivedInfoContainer}>
          <View style={styles.wordRow}>
            <Text style={styles.word}>
              {wordData.word}
            </Text>

            {wordData.audio && (
              <Pressable
                style={styles.playPressable}
                onPress={() => playSound(wordData.audio)}
              >
                <Ionicons
                  name="volume-medium-outline"
                  size={28}
                  color={COLORS.primary900}
                />
              </Pressable>
            )}

            <Text style={styles.phonetics}>
              {wordData.phonetics || wordData.phonetic}
            </Text>
          </View>

          {wordData.partOfSpeech && (
            <Text style={styles.partOfSpeech}>
              {wordData.partOfSpeech}
            </Text>
          )}

          <Text style={styles.meaning}>
            {wordData.meaning}
          </Text>

          <Pressable
            style={styles.buttonContainer}
            onPress={onAdd}
          >
            <Text style={styles.buttonText}>
              Add
            </Text>
          </Pressable>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    marginTop: 100,
    marginBottom: 30,
    width: "20%",
    height: undefined,
    aspectRatio: 1,
    alignSelf: "center",
    resizeMode: "contain",
  },

  inputContainer: {
    paddingHorizontal: 20,
  },

  label: {
    fontSize: 18,
    marginBottom: 8,
    color: COLORS.white,
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.grey600,
    padding: 10,
    fontSize: 18,
    color: COLORS.white,
  },

  receivedInfoContainer: {
    margin: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: COLORS.primary200,
  },

  wordRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },

  word: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.white,
  },

  playPressable: {
    marginLeft: 10,
  },

  phonetics: {
    marginLeft: 10,
    fontSize: 18,
    color: COLORS.grey600,
  },

  partOfSpeech: {
    marginTop: 10,
    fontSize: 18,
    color: COLORS.grey600,
  },

  meaning: {
    marginTop: 10,
    fontSize: 18,
    color: COLORS.white,
  },

  buttonContainer: {
    marginTop: 20,
    padding: 10,
    alignItems: "center",
    backgroundColor: COLORS.primary900,
    borderRadius: 8,
  },

  buttonText: {
    fontSize: 24,
    color: COLORS.white,
  },
});

export default AddWord;
