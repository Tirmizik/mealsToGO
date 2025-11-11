import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { RestaurantsNavigator } from "./restaurants.navigator";
import { MapScreen } from "../../features/map/map.screen";
import { FavouriteContextProvider } from "../../services/favourites/favourite.context";
import { LocationContextProvider } from "../../services/location/location.context";
import { RestaurantsContextProvider } from "../../services/restaurants/restaurants.context";
import { SettingsNavigator } from "./settings.navigator";
const Tab = createBottomTabNavigator();
const map = () => <SafeArea><Text>Map</Text></SafeArea>;
export const AppNavigator = () => (
      <FavouriteContextProvider>
      <LocationContextProvider>
      <RestaurantsContextProvider>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName;

                if (route.name === "Restaurant") {
                  iconName = "restaurant";
                } else if (route.name === "Map") {
                  iconName = "map";
                } else if (route.name === "Setting") {
                  iconName = "settings";
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: "tomato",
              tabBarInactiveTintColor: "gray",
              headerShown: false,
            })}
          >
            <Tab.Screen name="Restaurant" component={RestaurantsNavigator} />
            <Tab.Screen name="Map" component={MapScreen} />
            <Tab.Screen name="Setting" component={SettingsNavigator} />
          </Tab.Navigator>

   </RestaurantsContextProvider>
    </LocationContextProvider>
  </FavouriteContextProvider>
)