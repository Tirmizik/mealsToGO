import React, { useContext , useState} from "react";
import {FlatList,ActivityIndicator,TouchableOpacity} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { Spacer } from "../../../Components/spacer/spacer.component";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { RestaurantInfoCard } from "../components/restaurant.infocard.components";
import { FavouritesBar } from "../../../Components/favourites/favourite-bar.component";
import { Search } from "../components/search.component";
import { FavouriteContext } from "../../../services/favourites/favourite.context";
import { RestaurantList } from "../components/restaurant-list.styles";
import { FadeInView } from "../../../Components/animations/fade.animation";
const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;
const SearchbarContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;
const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;
export const RestaurantsScreen = ({ navigation  }) => {
  const { isLoading, restaurants } = useContext(RestaurantsContext);
  const { favourites } = useContext(FavouriteContext);
 const [isToggled, setIsToggled] = useState(false);

  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <ActivityIndicator animating={true} color="tomato" size="large" />
        </LoadingContainer>
      )}
      <Search
       isFavouritesToggled={isToggled}
        onFavouritesToggle={() => setIsToggled(!isToggled)}
      />
      {isToggled && (
         <FavouritesBar
          favourites={favourites}
          onNavigate={navigation.navigate}
        />
      )}
      <RestaurantList
        data={restaurants}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate("RestaurantDetail",{restaurant:item})}>
              <Spacer position="bottom" size="large">
                <FadeInView>
                <RestaurantInfoCard restaurant={item} />
                </FadeInView>
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  );
};