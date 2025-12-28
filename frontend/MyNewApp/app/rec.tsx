import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function GetRecordScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGetRecord = async () => {
    try {
      setLoading(true);

      const response = await fetch("https://example.com/api/my-record");
      if (!response.ok) throw new Error();

      const data = await response.json();

      router.push({
        pathname: "/res",
        params: { record: JSON.stringify(data) },
      });
    } catch {
      Alert.alert("Error", "Unable to fetch record");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient colors={["#07F8C0", "#020601"]} style={styles.container}>
        <ImageBackground
          source={require("../assets/images/net 2.png")}
          style={styles.background}
          imageStyle={{ opacity: 0.12 }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.flex}
          >
            <ScrollView
              contentContainerStyle={styles.wrapper}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {/* CARD */}
              <View style={styles.card}>
                <Text style={styles.title}>Get My Record</Text>

                <TouchableOpacity
                  style={styles.button}
                  onPress={handleGetRecord}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>Get My Record</Text>
                  )}
                </TouchableOpacity>
              </View>

              {/* ROBOT */}
              <Image
                source={require("../assets/images/robot6.png")}
                style={styles.robot}
              />
            </ScrollView>
          </KeyboardAvoidingView>
        </ImageBackground>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },

  flex: {
    flex: 1,
  },

  container: {
    flex: 1,
  },

  background: {
    flex: 1,
  },

  // 🔹 Controls vertical position
  wrapper: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: height * 0.18, // ⬇️ pushed slightly down
    paddingBottom: 40,
  },

  card: {
    width: "85%",
    maxWidth: 340,
    backgroundColor: "rgba(0,0,0,0.28)",
    borderRadius: 20,
    paddingVertical: 28,
    paddingHorizontal: 22,
    alignItems: "center",
  },

  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 22,
  },

  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#000",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  robot: {
    marginTop: 25, // space between card & robot
    width: width * 0.45,
    height: height * 0.28,
    resizeMode: "contain",
  },
});
