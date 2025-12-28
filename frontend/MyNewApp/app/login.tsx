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
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"doctor" | "patient" | null>(null);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" hidden />

      <LinearGradient colors={["#07F8C0", "#020601"]} style={styles.container}>
        <ImageBackground
          source={require("../assets/images/net 2.png")}
          style={styles.background}
          imageStyle={{ opacity: 0.18 }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <ScrollView
              contentContainerStyle={styles.centerWrapper}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {/* Login Card */}
              <View style={styles.card}>
                <Text style={styles.label}>Email Id</Text>
                <View style={styles.inputBox}>
                  <TextInput
                    placeholder="Enter email"
                    placeholderTextColor="#cfcfcf"
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <Text style={styles.label}>Password</Text>
                <View style={styles.inputBox}>
                  <TextInput
                    placeholder="Enter password"
                    placeholderTextColor="#cfcfcf"
                    secureTextEntry={!showPassword}
                    style={styles.input}
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

                {/* ✅ ROLE SELECT */}
                <Text style={styles.label}>Select Role</Text>
                <View style={styles.roleContainer}>
                  <TouchableOpacity
                    style={[
                      styles.roleBtn,
                      role === "doctor" && styles.roleActive,
                    ]}
                    onPress={() => setRole("doctor")}
                  >
                    <Text
                      style={[
                        styles.roleText,
                        role === "doctor" && styles.roleTextActive,
                      ]}
                    >
                      Doctor
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.roleBtn,
                      role === "patient" && styles.roleActive,
                    ]}
                    onPress={() => setRole("patient")}
                  >
                    <Text
                      style={[
                        styles.roleText,
                        role === "patient" && styles.roleTextActive,
                      ]}
                    >
                      Patient
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* LOGIN */}
                <TouchableOpacity
                  style={styles.loginBtn}
                  onPress={() => router.push("/rec")}
                >
                  <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>

                <Text style={styles.helperText}>
                  Don’t have an account?{" "}
                  <Text
                    style={styles.linkText}
                    onPress={() => router.push("/Sign-Up")}
                  >
                    Sign up
                  </Text>
                </Text>
              </View>

              {/* Robot */}
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

  centerWrapper: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 100,
    paddingHorizontal: 20,
  },

  /* ✅ FIXED CARD SIZE FOR MOBILE */
  card: {
    width: "90%",
    maxWidth: 320,
    minHeight: 420, // 🔒 fixed height feel
    backgroundColor: "rgba(0,0,0,0.25)",
    borderRadius: 18,
    padding: 20,
    justifyContent: "space-between",
  },

  label: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },

  inputBox: {
    height: 45,
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },

  /* ROLE */
  roleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  roleBtn: {
    width: "48%",
    height: 42,
    borderRadius: 21,
    backgroundColor: "#fff", // ✅ default white
    justifyContent: "center",
    alignItems: "center",
  },

  roleActive: {
    backgroundColor: "#000", // ✅ active only
  },

  roleText: {
    color: "#000",
    fontSize: 13,
    fontWeight: "600",
  },

  roleTextActive: {
    color: "#fff",
  },

  loginBtn: {
    height: 45,
    backgroundColor: "#000",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  helperText: {
    marginTop: 12,
    fontSize: 12,
    color: "#fff",
    textAlign: "center",
  },

  linkText: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },

  robot: {
    width: width * 0.5,
    height: height * 0.25,
    resizeMode: "contain",
  },
});
