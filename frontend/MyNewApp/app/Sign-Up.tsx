import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function Signup() {
  const router = useRouter();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // ✅ FIXED TypeScript error
  const validatePassword = (pwd: string): boolean =>
    /^(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/.test(pwd);

  const handleSignup = () => {
    setError("");

    if (!username || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Password must be 8+ characters with a number & special character"
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    Alert.alert("Success", "Account created successfully");
    router.replace("/login");
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
            style={{ flex: 1 }}
          >
            <ScrollView
              contentContainerStyle={styles.wrapper}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {/* SIGN UP CARD */}
              <View style={styles.card}>
                <Text style={styles.title}>Sign Up</Text>

                <View style={styles.inputBox}>
                  <TextInput
                    placeholder="Username"
                    placeholderTextColor="#bbb"
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.inputBox}>
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor="#bbb"
                    secureTextEntry={!showPassword}
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons
                      name={showPassword ? "eye-off" : "eye"}
                      size={20}
                      color="#000"
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.inputBox}>
                  <TextInput
                    placeholder="Confirm Password"
                    placeholderTextColor="#bbb"
                    secureTextEntry={!showConfirm}
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirm(!showConfirm)}
                  >
                    <Ionicons
                      name={showConfirm ? "eye-off" : "eye"}
                      size={20}
                      color="#000"
                    />
                  </TouchableOpacity>
                </View>

                {error ? <Text style={styles.error}>{error}</Text> : null}

                <TouchableOpacity style={styles.btn} onPress={handleSignup}>
                  <Text style={styles.btnText}>Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push("/login")}>
                  <Text style={styles.link}>
                    Already have an account? Login
                  </Text>
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
    backgroundColor: "#066b5a",
  },

  container: {
    flex: 1,
  },

  background: {
    flex: 1,
  },

  wrapper: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: height * 0.1,
    paddingBottom: 30,
  },

  card: {
    width: "90%",
    maxWidth: 320,
    backgroundColor: "rgba(0,0,0,0.28)",
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 18,
  },

  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 14,
    textAlign: "center",
  },

  inputBox: {
    height: 45,
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },

  btn: {
    height: 45,
    backgroundColor: "#000",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  error: {
    color: "#ffdada",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 8,
  },

  link: {
    marginTop: 14,
    fontSize: 12,
    color: "#fff",
    textAlign: "center",
    textDecorationLine: "underline",
  },

  robot: {
    width: width * 0.42,
    height: height * 0.26,
    resizeMode: "contain",
    marginTop: 5,
  },
});
