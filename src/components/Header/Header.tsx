import React from "react";
import { StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
const Background = require("../../../assets/images/Background.png");

const Header = () => {
  return <FastImage source={Background} style={styles.image} />;
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 90,
    borderRadius: 10,
    marginTop: 5,
  },
});

export default Header;
