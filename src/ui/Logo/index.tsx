import React from "react";
import FastImage from "react-native-fast-image";
//@ts-ignore
import LogoImage from "assets/images/Logo.png";

export const Logo = () => {
  return (
    <FastImage
      source={LogoImage}
      style={{ width: 70, height: 70 }}
      resizeMode={FastImage.resizeMode.contain}
    />
  );
};
