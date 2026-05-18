const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// This tells Metro to use NativeWind and points it to your new CSS file
module.exports = withNativeWind(config, { input: "./global.css" });