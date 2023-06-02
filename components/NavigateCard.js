import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import DestinationOptions from "./DestinationOptions";

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="border-t border-gray-200">
        <View>
          <GooglePlacesAutocomplete
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={200}
            enablePoweredByContainer={false}
            minLength={2}
            returnKeyType={"search"}
            placeholder="Your Destination..."
            fetchDetails={true}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "en",
            }}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              );

              navigation.navigate("RideOptions");
            }}
            styles={{
              container: {
                flex: 0,
                // backgroundColor: "#000",
                borderColor: "transparent",
                marginHorizontal: 20,
                marginVertical: 30,
              },
              textInput: {
                borderWidth : 2,
                height: 40,
                color: "black",
                fontSize: 18,
                backgroundColor: "white",
              },
              predefinedPlacesDescription: {
                color: "#1faadb",
              },
            }}
          />
        </View>
      </View>
      <View>
        <DestinationOptions />
      </View>
      <TouchableOpacity className='mt-10 py-4 bg-yellow-400 mx-4 rounded-full'onPress={() => navigation.navigate("RideOptions")}>
        <Text className="text-center text-white text-lg">Select a Ride</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default NavigateCard;
