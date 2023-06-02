import { View, Text, FlatList, TouchableOpacity, ViewBase } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const data = [
  {
    id: 1,
    icon: "time-outline",
    location: "Papa's Pizza - East Legon",
    subLocation: "La-Bawaleshi Road, Accra",
  },
  // {
  //   id: 2,
  //   icon: "time-outline",
  //   location: "china mall spintex",
  //   subLocation: "spintex Road 36, Accra",
  // },
  {
    id: 3,
    icon: "ios-location-outline",
    location: "circle vip bus",
    subLocation: "ring road central, Accra",
  },
];

const DestinationOptions = () => {
  return (
    <View className="mt-1 mx-4 flex-grow">
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { icon, location, subLocation } }) => {
          return (
            <TouchableOpacity className="flex flex-row space-x-4 py-2 bg-gray-100 my-1 px-4 rounded-md items-center">
              <Ionicons name={icon} size={24} color="black" />
              <View>
                <Text className="text-sm font-normal capitalize">{location}</Text>
                <Text className="text-gray-600 text-xs capitalize">{subLocation}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default DestinationOptions;
