import { StyleSheet } from "react-native"
import { horizontalSize, screenWidth, verticalSize } from "../../../constant/DeviceFrame"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#fff"
  },
  header: {
    padding: 20
  },
  headerTag: {
    color: "#333",
    fontSize: 34,
    fontWeight: "700",
    textAlign: "center"
  },
  body: {
    flex: 1,
    padding: 24,
  },
  imageContainer: {
    height: verticalSize(400),
  },
  image: {
    height: verticalSize(400),
  },
  imageLabelText: {
    position: "absolute",
    top: horizontalSize(10),
    left: horizontalSize(10),
    color:"#fff",
    fontSize:24,
    fontWeight:"600",
  },
  imageLocationText: {
    position: "absolute",
    right: horizontalSize(10),
    bottom: horizontalSize(10),
    color:"#fff",
    fontSize:24,
    fontWeight:"600"
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "lightgray",
    height: verticalSize(40),
    paddingHorizontal: horizontalSize(8),
    marginBottom: verticalSize(24)
  },
  input: {
    flex: 1,
    color: "#333",
    paddingVertical:0,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 16
  },
  button: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 16,
    color:"#333"
  }
})

export default styles