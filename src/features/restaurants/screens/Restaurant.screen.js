import React from 'react';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import {  View  } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Restaurantinfocard from '../components/restaurant.infocard.components';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components';

const Safearea=styled(SafeAreaView)`
 flex:1;
${ExpoStatusBar.currentHeight && 'margin-top:${ExpoStatusBar.currentHeight}px'};
`
const Searchbarcontainer=styled .View`
padding:${props=>props.theme.space[3]};
backgroundColor:${props=>props.theme.colors.bg.primary};
`
const Restaurantlistcontainer=styled.View`
flex:1;
  padding:${props=>props.theme.space[3]};
  backgroundColor:${props=>props.theme.colors.bg.primary};
  `
const RestaurantScreen=()=>{
    return(
      <>
        <Safearea >
            <Searchbarcontainer >
              <Searchbar placeholder='search'/>
              </Searchbarcontainer>
              <Restaurantlistcontainer >
                <Restaurantinfocard/>
              </Restaurantlistcontainer>
              <ExpoStatusBar style='auto'/>'
            </Safearea>
</>
    )
}

export default RestaurantScreen;