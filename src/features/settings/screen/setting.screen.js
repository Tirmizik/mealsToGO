import React, { useContext, useState, useEffect } from "react";
import { List, Avatar } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "../../../Components/typography/text.component";
import { Spacer } from "../../../Components/spacer/spacer.component";
import { SafeArea } from "../../../Components/utility/safe-area.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;

const AvatarContainer = styled.View`
  align-items: center;
`;

export const SettingsScreen = ({ navigation }) => {
  const { onLogout, user } = useContext(AuthenticationContext);
  const [photo, setPhoto] = useState(null);

  const getProfilePicture = async (uid) => {
    const photoUri = await AsyncStorage.getItem(`${uid}-photo`);
    if (photoUri) {
      setPhoto(photoUri);
    }
  };

  useEffect(() => {
    if (user && user.uid) {
      getProfilePicture(user.uid);
    }

    const unsubscribe = navigation.addListener("focus", () => {
      if (user && user.uid) {
        getProfilePicture(user.uid);
      }
    });

    return unsubscribe;
  }, [navigation, user]);

  return (
    <SafeArea>
      <AvatarContainer>
        <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
          {photo ? (
            <Avatar.Image size={180} source={{ uri: photo }} />
          ) : (
            <Avatar.Icon size={180} icon="human" backgroundColor="#2182BD" />
          )}
        </TouchableOpacity>

        <Spacer position="top" size="large">
          <Text variant="label">{user?.email}</Text>
        </Spacer>
      </AvatarContainer>

      <List.Section>
        <SettingsItem
          title="Favourites"
          description="View your favourites"
          left={(props) => <List.Icon {...props} color="black" icon="heart" />}
          onPress={() => navigation.navigate("Favourites")}
        />
        <SettingsItem
          title="Logout"
          left={(props) => <List.Icon {...props} color="black" icon="door" />}
          onPress={onLogout}
        />
      </List.Section>
    </SafeArea>
  );
};
