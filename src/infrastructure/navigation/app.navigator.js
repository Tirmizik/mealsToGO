import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { SafeArea } from "../../Components/utility/safe-area.component";
import { RestaurantsNavigator } from "./restaurants.navigator";
import { MapScreen } from "../../features/map/map.screen";
const Tab = createBottomTabNavigator();
const Setting = () =>
  <SafeArea><Text>Setting</Text></SafeArea> ;
const Map = () => <SafeArea><Text>Map</Text></SafeArea>;

export const AppNavigator = () => (

<NavigationContainer>
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
              headerShown: true,
            })}
          >
            <Tab.Screen name="Restaurant" component={RestaurantsNavigator} />
            <Tab.Screen name="Map" component={MapScreen} />
            <Tab.Screen name="Setting" component={Setting} />
          </Tab.Navigator>
           </NavigationContainer>

)