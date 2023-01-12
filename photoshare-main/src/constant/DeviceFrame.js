import { Dimensions } from "react-native";

export const { width: screenWidth, height: screenHeight } = Dimensions.get("window")

// Yatay olarak responsive değer
export const horizontalSize = size => (screenWidth * size) / 375

// Dikey olarak responsive değer
export const verticalSize = size => (screenHeight * size) / 812