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

function AddWord() {
  const [text, setText] = useState();
  const [wordData, setWordData] = useState();

  function onChangeText(text) {
    setWordData(undefined);
    setText(text);
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (text) {
        const wordDataReceived = await getWordInfo(text);
        setWordData(wordDataReceived);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [text]);

  return (
    <>
      <Image
        style={{
          marginTop: 100,
          marginBottom: 30,
          width: "20%",
          height: undefined,
          aspectRatio: 1,
          alignSelf: "center",
          resizeMode: "contain",
        }}
        source={require("../assets/add.png")}
      />
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Your word to search:</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="type here.."
          placeholderTextColor={COLORS.grey600}
        />
      </View>
      {wordData && (
        <View style={styles.receivedInfoContainer}>
          <View style={{ flexDirection: "row", alignItems: "baseline" }}>
            <Text style={styles.word}>{wordData.word}</Text>
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
            <Text style={styles.phonetics}>{wordData.phonetics}</Text>
          </View>
          <Text style={styles.partOfSpeech}>{wordData.partOfSpeech}</Text>
          <Text style={styles.meaning}>{wordData.meaning}</Text>
          {wordData.word && (
            <Pressable style={styles.buttonContainer} onPress={onAdd}>
              <Text style={{ fontSize: 24, color: COLORS.white }}>Add</Text>
            </Pressable>
          )}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    fontSize: 18,
    borderColor: COLORS.primary200,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    color: COLORS.black,
  },
  label: {
    fontSize: 12,
    color: COLORS.grey600,
    marginBottom: 4,
  },
  inputContainer: {
    marginHorizontal: 12,
  },
  receivedInfoContainer: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 32,
  },
  word: {
    fontSize: 32,
    paddingHorizontal: 10,
    color: COLORS.black,
  },
  phonetics: {
    fontSize: 20,
    paddingHorizontal: 10,
    color: COLORS.black,
  },
  partOfSpeech: {
    fontSize: 20,
    paddingHorizontal: 10,
    color: COLORS.black,
  },
  meaning: {
    fontSize: 16,
    padding: 13,
    color: COLORS.black,
  },
  buttonContainer: {
    borderRadius: 5,
    backgroundColor: COLORS.primary900,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  backPressable: {
    position: "absolute",
    width: 60,
    borderRadius: 30,
    aspectRatio: 1,
    top: "2%",
    left: "2%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  playPressable: {
    marginHorizontal: 20,
  },
});

export default AddWord;
