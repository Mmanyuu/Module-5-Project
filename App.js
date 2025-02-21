import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import styles from "./styles/styles";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import SampleTabScreen from "./screens/tabScreens/SampleTabScreen";
import SampleProfile from "./screens/drawerScreens/SampleProfile";
import CameraHomeScreen from "./screens/tabScreens/CameraHomeScreen";
import CameraScreen from "./screens/tabScreens/CameraScreen";
import CameraProfileScreen from "./screens/tabScreens/CameraProfileScreen";
import Fontisto from "@expo/vector-icons/Fontisto";
import BinduProfile from "./screens/drawerScreens/BinduProfile";
import TriviaGame from "./screens/tabScreens/triviaGame/TriviaGame";
import CalendarScreen from "./screens/tabScreens/CalendarScreen";
import CompassScreen from "./screens/tabScreens/CompassScreen";
import AndrewProfile from "./screens/drawerScreens/AndrewProfile";

// CREATE TAB NAVIGATION
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const transparentScreens = ["Quiz"];
  const iconSize = 20;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        headerShown: false, // Hide default tab navigation header
        tabBarStyle: {
          backgroundColor: transparentScreens.includes(route.name)
            ? "transparent"
            : "#ffffff", // Transparent for specific screens, white for others
          position: "absolute",
          elevation: 0, // Remove shadow on Android
          shadowOpacity: 0, // Remove shadow on iOS
        },
      })}
    >
      <Tab.Screen
        name="Moments"
        component={CameraHomeScreen}
        options={{
          tabBarIcon: ({ color }) => {
            return (
              <Fontisto
                name="photograph"
                size={iconSize}
                color={color}
              ></Fontisto>
            );
          },
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ color }) => {
            return (
              <Fontisto
                name="calendar"
                size={iconSize}
                color={color}
              ></Fontisto>
            );
          },
        }}
      />
      <Tab.Screen
        name="Task"
        component={SampleTabScreen}
        options={{
          tabBarIcon: ({ color }) => {
            return (
              <MaterialIcons
                name="add-task"
                size={iconSize}
                color={color}
              ></MaterialIcons>
            );
          },
        }}
      />
      <Tab.Screen
        name="Compass"
        component={CompassScreen}
        options={{
          tabBarIcon: ({ color }) => {
            return (
              <Fontisto
                name="compass-alt"
                size={iconSize}
                color={color}
              ></Fontisto>
            );
          },
        }}
      />
      <Tab.Screen
        style={styles.tabIconTrivia}
        name="Quiz"
        component={TriviaGame}
        options={{
          tabBarIcon: ({ color }) => {
            return (
              <MaterialIcons
                name="quiz"
                size={iconSize}
                color={color}
              ></MaterialIcons>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

// CREATE DRAWER NAVIGATION
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const drawerIconSize = 20;
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Module 5 Project"
        options={{
          drawerIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name="menu"
              size={drawerIconSize}
              color={color}
            />
          ),
        }}
      >
        {(props) => <TabNavigator {...props} />}
      </Drawer.Screen>
      <Drawer.Screen
        name="Bindu"
        component={BinduProfile}
        options={{
          drawerIcon: ({ focused, color }) => {
            return (
              <Fontisto
                name="photograph"
                size={drawerIconSize}
                color={color}
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name="Johnny"
        component={SampleProfile}
        options={{
          drawerIcon: ({ focused, color }) => {
            return (
              <Fontisto
                name="calendar"
                size={drawerIconSize}
                color={color}
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name="Joseph"
        component={SampleProfile}
        options={{
          drawerIcon: ({ focused, color }) => {
            return (
              <MaterialIcons
                name="add-task"
                size={drawerIconSize}
                color={color}
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name="Manyu"
        component={SampleProfile}
        options={{
          drawerIcon: ({ focused, color }) => {
            return (
              <Fontisto
                name="compass"
                size={drawerIconSize}
                color={color}
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name="Andrew"
        component={AndrewProfile}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <FontAwesome
              name="user-secret"
              size={size}
              color={color}
            />
          ),
          headerStyle: {
            backgroundColor: "#B2B2B2",
            elevation: 0,
            shadowOpacity: 0, // Remove shadow on iOS
          },
          headerTintColor: "#000", // Optional: Change text/icon color
        }}
      />
    </Drawer.Navigator>
  );
};

// CREATE STACK NAVIGATOR
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="All Tabs"
          component={DrawerNavigator}
          options={{ headerShown: false }} // HIDE DEFAULT STACK HEADER
        />
        {/* Added by Bindu for the camera app Stack navigation */}
        <Stack.Screen
          name="CameraHome"
          component={CameraHomeScreen}
        ></Stack.Screen>
        <Stack.Screen
          name="Camera"
          component={CameraScreen}
        ></Stack.Screen>
        <Stack.Screen
          name="CameraProfile"
          component={CameraProfileScreen}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
