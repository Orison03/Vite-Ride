import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import logo from "../assets/gologo.png";
import NavOptions from "../components/NavOptions";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
import { setOrigin,setDestination } from "../slices/navSlice";
const HomeScreen = () => {
  const dispatch = useDispatch()
 
  console.log(setOrigin);
  return (
    <SafeAreaView className="bg-white h-full">
      <View className="px-5 flex flex-row justify-between">
        <Image source={logo} />
        <View className="mt-4">
          <TouchableOpacity className="rounded-md px-4 py-2 bg-black">
            <Text className="text-white">New</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="p-5 mb-5">
        <GooglePlacesAutocomplete
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={200}
          enablePoweredByContainer={false}
          minLength={2}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );

            dispatch(setDestination(null));
          }}
          returnKeyType={"search"}
          fetchDetails={true}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
          placeholder="Pick Up Location ??"
          styles={{
            container: {
              flex: 0,
              borderTopWidth: 2,
              borderLeftWidth: 2,
              borderRightWidth: 2,
              borderBottomWidth: 2,
              borderRadius: 3,
              // backgroundColor: "#000",
              borderColor: "#000",
            },
            textInput: {
              height: 38,
              color: "black",
              fontSize: 18,
            },
            predefinedPlacesDescription: {
              color: "#1faadb",
            },
          }}
        />
      </View>

      <NavOptions />
      {/* welcome message */}
      <View className="m-5 bg-yellow-400 p-5 rounded-lg">
        <Text className="text-green-600 text-lg py-2 font-semibold">
          Welcome !!
        </Text>
        <Text className="text-white text-sm">
          Go is a modern mobile app that makes it easy to ride across the
          country SO fast, with ease and comfortable. We are new, but checkout
          or food side -- GO food
        </Text>
      </View>

      {/* buttons */}
      <View className="m-5 mt-3">
        <TouchableOpacity className="bg-green-500 p-4 rounded-full mb-6">
          <Text className="text-center text-lg text-white font-semibold">
            Sign Up For Free
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-yellow-400 p-4 rounded-full">
          <Text className="text-center text-lg text-white font-semibold">
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
