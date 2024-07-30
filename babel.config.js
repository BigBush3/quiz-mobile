module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["."],
        alias: {
          components: "./src/components",
          assets: "./assets",
          ui: "./src/ui",
          shared: "./src/shared",
          pages: "./src/pages",
        },
      },
    ],
    ["react-native-reanimated/plugin"],
  ],
};
