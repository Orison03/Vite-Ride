import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useRef } from "react";
import MapView from "react-native-maps";
import { selectDestination, selectOrigin, setTravelTimeInformation } from "../slices/navSlice";
import { useDispatch, useSelector } from "react-redux";
import { Marker } from "react-native-maps";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavigateCard from "../components/NavigateCard";
import RideOptions from "../components/RideOptions";
import { GOOGLE_MAPS_APIKEY } from "@env";
import MapViewDirections from "react-native-maps-directions";
const Stack = createNativeStackNavigator();
import { EvilIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const MapScreen = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);
  const dispatch = useDispatch()
  const navigation = useNavigation()

  useEffect(() => {
    if (!origin || !destination) return;

    mapRef.current.fitToSuppliedMarkers(["pick up location", "destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [origin, destination, GOOGLE_MAPS_APIKEY]);

  useEffect(() => {
    if (!origin || !destination) return;
    const getTravelTime = async () => {
      try {
        const response =
          await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}
`);
        const data = await response.json();

        dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
      } catch (error) {
        console.log(error);
      }
    };
    getTravelTime();
  }, [origin, destination]);

  return (
    <View className="flex-1">
      <TouchableOpacity
        className="absolute top-14 z-50 p-3 rounded-full bg-green-400 left-4 shadow-lg"
        onPress={() => navigation.navigate("Home")}
      >
        <EvilIcons name="navicon" size={26} color="white" />
      </TouchableOpacity>
      <View className="flex-1">
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          mapType="mutedStandard"
          initialRegion={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          {origin && destination && (
            <MapViewDirections
              origin={origin.description}
              destination={destination.description}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={4}
              strokeColor="#14D474"
            />
          )}

          {origin?.location && (
            <Marker
              coordinate={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
              }}
              title="Pick Up Location"
              description={origin.description}
              identifier="pick up location"
            />
          )}
          {destination?.location && (
            <Marker
              coordinate={{
                latitude: destination.location.lat,
                longitude: destination.location.lng,
              }}
              title="Destination"
              description={destination.description}
              identifier="destination"
            />
          )}
        </MapView>
      </View>
      <View className="flex-1">
        <Stack.Navigator>
          <Stack.Screen
            name="NavigateCard"
            component={NavigateCard}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="RideOptions"
            component={RideOptions}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
};

export default MapScreen;
