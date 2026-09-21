import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
} from "react-native";

import { useState } from "react";

import { COLORS } from "../constants";

function EditWord({ route, navigation }) {
  const wordData = route.params?.wordData || {};

  const [phonetics, setPhonetics] = useState(
    wordData.phonetics || wordData.phonetic || ""
  );

  const [partOfSpeech, setPartOfSpeech] = useState(
    wordData.partOfSpeech || ""
  );

  const [meaning, setMeaning] = useState(
    wordData.meaning || ""
  );

  function onSave() {
    const updatedWord = {
      ...wordData,
      phonetics,
      partOfSpeech,
      meaning,
    };

    navigation.navigate("AllWords", {
      wordData: updatedWord,
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.imagePlaceholder}>
        <Text style={styles.pencil}>📝</Text>
      </View>

      <Text style={styles.word}>
        {wordData.word}
      </Text>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>
            phonetics:
          </Text>

          <TextInput
            value={phonetics}
            onChangeText={setPhonetics}
            style={styles.input}
          />
        </View>

        <View style={styles.column}>
          <Text style={styles.label}>
            part of speech:
          </Text>

          <TextInput
            value={partOfSpeech}
            onChangeText={setPartOfSpeech}
            style={styles.input}
          />
        </View>
      </View>

      <Text style={styles.label}>
        meaning:
      </Text>

      <TextInput
        value={meaning}
        onChangeText={setMeaning}
        multiline
        style={styles.meaning}
      />

      <Pressable
        style={styles.saveButton}
        onPress={onSave}
      >
        <Text style={styles.saveText}>
          Save
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    paddingHorizontal: 18,
    paddingTop: 80,
  },

  imagePlaceholder: {
    height: 110,
    alignItems: "center",
    justifyContent: "center",
  },

  pencil: {
    fontSize: 65,
  },

  word: {
    color: COLORS.black,
    fontSize: 30,
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    gap: 10,
  },

  column: {
    flex: 1,
  },

  label: {
    color: COLORS.grey600,
    fontSize: 12,
    marginBottom: 4,
    marginTop: 8,
  },

  input: {
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.primary200,
    borderRadius: 5,
    padding: 8,
    color: COLORS.black,
  },

  meaning: {
    minHeight: 65,
    borderWidth: 1,
    borderColor: COLORS.primary200,
    borderRadius: 5,
    padding: 8,
    color: COLORS.black,
    textAlignVertical: "top",
  },

  saveButton: {
    height: 40,
    marginTop: 15,
    borderRadius: 5,
    backgroundColor: COLORS.primary900,
    alignItems: "center",
    justifyContent: "center",
  },

  saveText: {
    fontSize: 24,
    color: COLORS.white,
  },
});

export default EditWord;