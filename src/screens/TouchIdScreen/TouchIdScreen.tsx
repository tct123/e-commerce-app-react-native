import React from "react";
import { StyleSheet, StatusBar, Platform } from "react-native";
import { AuthBody, Header } from "./components";
import { SafeAreaView } from "react-native-safe-area-context";

export const TouchIdScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <AuthBody />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
