import React, { useContext } from "react";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { FavouriteContext } from "../../services/favourites/favourite.context";
const FavouriteButton = styled(TouchableOpacity)`
  position: absolute;
  top: 25px;
  right: 25px;
  z-index: 9;
`;

export const Favourite = ({restaurant}) => {
  const { favourites, addToFavourites, removeFromFavourites } = useContext(
    FavouriteContext
  );
  const isFavourite = favourites.find((r) => r.placeId === restaurant.placeId);

  return (
   <FavouriteButton
      onPress={() =>
        !isFavourite
          ? addToFavourites(restaurant)
          : removeFromFavourites(restaurant)
      }
    >
      <AntDesign
        name={isFavourite ? "heart" : "heart"}
        size={34}
        color={isFavourite ? "red" : "gray"}
      />
    </FavouriteButton>
  );
};