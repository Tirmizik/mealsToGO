import React from "react";
import { Text ,Platform} from "react-native";
import { createStackNavigator ,TransitionPresets} from "@react-navigation/stack";
import {RestaurantsScreen}  from "../../features/restaurants/screens/Restaurant.screen";
import { RestaurantDetailScreen } from "../../features/restaurants/screens/restaurant-details.screen";

const RestaurantStack = createStackNavigator();

export const RestaurantsNavigator = () => {
  return (
    <RestaurantStack.Navigator
   screenOptions={{
        headerShown: false,
        ...(Platform.OS === "android"
          ? TransitionPresets.FadeFromBottomAndroid
          : TransitionPresets.ModalPresentationIOS),
      }}
    >
      <RestaurantStack.Screen
        name="Restaurants"
        component={RestaurantsScreen}
      />
      <RestaurantStack.Screen
        name="RestaurantDetail"
        component={RestaurantDetailScreen}
      />
    </RestaurantStack.Navigator>
  );
};