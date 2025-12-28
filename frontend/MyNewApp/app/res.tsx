import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ImageBackground,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";

const { width } = Dimensions.get("window");

type RecordData = {
  [key: string]: string | number;
};

export default function RecordResultScreen() {
  const { record } = useLocalSearchParams<{ record?: string }>();

  let parsedRecord: RecordData | null = null;

  try {
    parsedRecord = record ? JSON.parse(record) : null;
  } catch {
    parsedRecord = null;
  }

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient colors={["#07F8C0", "#020601"]} style={styles.container}>
        <ImageBackground
          source={require("../assets/images/net 2.png")}
          style={styles.background}
          imageStyle={{ opacity: 0.12 }}
        >
          <ScrollView contentContainerStyle={styles.wrapper}>
            <View style={styles.card}>
              <Text style={styles.title}>My Record</Text>

              {parsedRecord ? (
                Object.entries(parsedRecord).map(([key, value]) => (
                  <View key={key} style={styles.row}>
                    <Text style={styles.key}>{key}</Text>
                    <Text style={styles.value}>{String(value)}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.emptyText}>
                  No record found or invalid data.
                </Text>
              )}
            </View>
          </ScrollView>
        </ImageBackground>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  wrapper: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 350,
    backgroundColor: "rgba(0,0,0,0.28)",
    borderRadius: 20,
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  row: {
    marginBottom: 12,
  },
  key: {
    color: "#ccc",
    fontSize: 13,
  },
  value: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  emptyText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
});
