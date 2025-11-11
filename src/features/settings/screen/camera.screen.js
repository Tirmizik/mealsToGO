import React, { useRef, useState, useContext } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Text } from "../../../Components/typography/text.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
const ProfileCamera = styled(CameraView)`
  width: 100%;
  height: 100%;
`;
export const CameraScreen = ({ navigation }) => {
  const cameraRef = useRef(null);
  const { user } = useContext(AuthenticationContext);
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState("front");
  const [photoUri, setPhotoUri] = useState(null);
  if (!permission) {
    return <View />;
  }
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>We need your permission to use the camera</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.text}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }
  const snap = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 });
      setPhotoUri(photo.uri);
    }
  };
  const savePhoto = async () => {
    if (photoUri && user?.uid) {
      await AsyncStorage.setItem(`${user.uid}-photo`, photoUri);
      navigation.goBack();
    }
  };
  if (photoUri) {
    return (
      <View style={styles.previewContainer}>
        <Image source={{ uri: photoUri }} style={styles.previewImage} />
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={() => setPhotoUri(null)}>
            <Text style={styles.text}>Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: "green" }]} onPress={savePhoto}>
            <Text style={styles.text}>Save Photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <ProfileCamera ref={cameraRef} facing={facing} ratio="16:9" />
      <View style={styles.captureContainer}>
        <TouchableOpacity style={styles.captureButton} onPress={snap} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
  },
  button: {
    backgroundColor: "tomato",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    minWidth: 120,
    alignItems: "center",
  },
  captureContainer: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "white",
    borderWidth: 5,
    borderColor: "tomato",
  },
  previewContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  previewImage: {
    width: "100%",
    height: "80%",
    borderRadius: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
});
