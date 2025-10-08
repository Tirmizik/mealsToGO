import React from "react";
import styled from "styled-components/native";
import { Text,View ,Image} from "react-native";
import { Card } from "react-native-paper";
import { SvgXml } from 'react-native-svg';
import star from '../../../../assets/star';
import open from '../../../../assets/open';

const Restaurant=styled(Card)`
background-Color:${props=>props.theme.colors.bg.primary};
`
const Restaurantcover=styled(Card.Cover)`
padding:${props=>props.theme.space[4]};
background-Color:${props=>props.theme.colors.bg.secondary};
`
const Title=styled(Text)`
font-family:${props=>props.theme.fonts.heading};
font-size:${props=>props.theme.fontSizes.body};
color:${props =>props.theme.colors.ui.primary}`;
const Info = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;
const Address=styled(Text)`
font-samily:${props=>props.theme.fonts.body};
font-size:${props=>props.theme.fontSizes.caption};
`
const Rating=styled.View`
padding-top:${props=>props.theme.space[2]};
padding-buttom:${props=>props.theme.space[2]};
flex-direction:row;`
const Section=styled.View`
 flex-direction: row;
  align-items: center;
  justify-content:space-between;
  width: 100%;`
const SectionEnd=styled.View`
flex:1;
flex-dirction:row;
justify-content:flex-end;
`
const Restaurantinfocard=({restaurant={}})=>{
    const {name='some restaurant',
        icon,
        photos=['https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg'],
        address='100 some randome street',
        isopennow=true,
        rating=4,
        istemporaryclosed=true,
    }=restaurant
    const ratingArray=Array.from(new Array(Math.floor(rating)))
    return(
    <Restaurant elevation={5} >
        <Restaurantcover source={{uri:photos[0]}}/>
        <Info>
        <Title>{name}</Title>
        <Section>
          <Rating>
            {ratingArray.map(() => (
              <SvgXml xml={star} width={20} height={20} />
            ))}
          </Rating>
          <SectionEnd>
            <View style={{ paddingLeft: 20,  }} />
            {isopennow && <SvgXml xml={open} width={20} height={20} />}
            <View style={{ paddingLeft: 16 }} />
            <Image style={{ width: 15, height: 15  }} source={{ uri: icon }} />
          </SectionEnd>
        </Section>
        <Address>{address}</Address>
        </Info>
    </Restaurant>
    )
}


export default Restaurantinfocard;