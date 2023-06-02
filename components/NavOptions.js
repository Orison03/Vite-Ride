import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import car from "../assets/go-car.png";
import food from "../assets/burger-94.png";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectOrigin } from "../slices/navSlice";


const data = [
  {
    id: 1,
    title: "Fast Ride",
    image: car,
  },
  {
    id: 2,
    title: "Go Food",
    image: food,
  },
];

const NavOptions = () => {
const navigation = useNavigation()
const origin = useSelector(selectOrigin)
  return (
    <View className="ml-5 bg-white mt-4">
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="bg-yellow-400 ml-2 px-10 py-2 rounded-xl w-40 shadow-2xl"
            onPress={() => navigation.navigate("MapScreen")}  
            disabled={!origin}
          >
            <View className={`${!origin && "opacity-20"}`}>
              <Image source={item.image} className="w-24 h-24"/>
              <Text className="pl-2 font-semibold text-white text-sm">
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default NavOptions;
