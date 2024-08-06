import React from "react";
import { Layout } from "components";
import { Content } from "./components";
import { SafeAreaView, StyleSheet, View } from "react-native";

const Result = () => {
  return (
    <Layout>
      <Content />
    </Layout>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#ECF2FF",
    flex: 1,
  },
  container: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default Result;
