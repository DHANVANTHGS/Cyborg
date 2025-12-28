import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image,
} from "react-native";
import { useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useRouter } from "expo-router";

export default function EchoMindScreen() {
  const router = useRouter();
  const floatAnim = useRef(new Animated.Value(0)).current;

  // Floating animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 60,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <LinearGradient
        colors={[ "#07F8C0", "#020601",]}
        style={styles.container}
      >
        <View style={styles.card}>
          {/* Title */}
          <Text style={styles.title}>
            Meet the <Text style={styles.highlight}>Echo Mind!</Text>
          </Text>

          {/* Speech Bubble */}
          <View style={styles.chatBubble}>
            <Text style={styles.chatText}>Need our help now?</Text>
          </View>

          {/* Floating Robot */}
          <Animated.Image
            source={require("../assets/images/robot6.png")}
            style={[styles.robot, { transform: [{ translateY: floatAnim }] }]}
            resizeMode="contain"
          />
          
          {/* Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/login")}

          >
            <Text style={styles.buttonText}>Login Now</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", 
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 40,
  },

  card: {
    width: 330,
    maxWidth: "90%",
    height: 600,
    backgroundColor: "rgba(46, 39, 49, 0.08)",
    borderRadius: 35,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.25)",
    padding: 25,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 10,
    lineHeight: 36,
  },

  highlight: {
    color: "#0511f8ff",
  },

  chatBubble: {
    backgroundColor: "rgba(255,255,255,0.18)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 18,
    marginTop: 20,
  },

  chatText: {
    color: "white",
    fontSize: 14,
  },

  robot: {
    width: 200,
    height: 200,
    marginTop: 25,
  },

  button: {
    width: "90%",
    backgroundColor: "#222ac8ff",
    paddingVertical: 16,
    borderRadius: 30,
    position: "absolute",
    bottom: 35,
  },

  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
});
