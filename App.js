import { StatusBar } from "expo-status-bar";
import {  Text, View, KeyboardAvoidingView, Platform} from "react-native";
import { Provider } from "react-redux";
import { store } from "./store";
import HomeScreen from "./screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapScreen from "./screens/MapScreen";
const Stack = createNativeStackNavigator();



export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <KeyboardAvoidingView className="flex-1" behavior={Platform .OS === "ios" ? "padding" : "height"}>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="MapScreen"
              component={MapScreen}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </KeyboardAvoidingView>
      </NavigationContainer>
      <StatusBar style="auto" />
    </Provider>
  );
}

