import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import bolt from "../assets/corolla.png";
import corolla from "../assets/bolt.png";
import CurrencyFormatter from "react-currency-formatter";
import benz from "../assets/benz.png";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";

const data = [
  {
    id: 1,
    title: "go save",
    multiplier: 1,
    image: bolt,
  },
  {
    id: 2,
    title: "go class",
    multiplier: 1.2,
    image: corolla,
  },
  {
    id: 3,
    title: "go polling",
    multiplier: 1.75,
    image: benz,
    people: 4,
  },
];

const RideOptions = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("NavigateCard")}
          className="absolute top-4 z-50 left-3"
        >
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-center py-3 text-xl font-medium">
          Choose a Ride - {travelTimeInformation?.distance?.text}
        </Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const { id, multiplier, image, title, people } = item;
          return (
            <TouchableOpacity
              className={`flex flex-row py-4 mx-3 px-2 items-center justify-between ${
                id === selected?.id && "bg-gray-200 rounded-lg"
              } `}
              onPress={() => setSelected(item)}
            >
              <View className="">
                <Image source={image} className="mt-1 w-24 h-10 object-contain" />
                <Text className={`${people ? "absolute text-white rounded-md top-0 -right-4 bg-black text-xs p-1" : "hidden"}`}>
                  1x4
                </Text>
              </View>
              <View>
                <Text className="text-lg font-medium text-green-400 capitalize">
                  {title}
                </Text>
                <Text>{travelTimeInformation?.duration?.text} ride</Text>
              </View>
              <Text className="mx-4">
                <CurrencyFormatter
                  quantity={
                    people
                      ? (travelTimeInformation?.duration?.value * multiplier) /
                        100 /
                        people
                      : (travelTimeInformation?.duration?.value * multiplier) /
                        100
                  }
                  currency="GHS"
                />
              </Text>
            </TouchableOpacity>
          );
        }}
      />
      <TouchableOpacity
        className={`mt-6 py-4 bg-yellow-400 mx-4 rounded-full ${
          !selected && "bg-yellow-200"
        }`}
        onPress={() => navigation.navigate("RideOptions")}
        disabled={!selected}
      >
        <Text className={`text-center text-white text-lg uppercase shadow-lg`}>
          Choose {selected?.title}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default RideOptions;
