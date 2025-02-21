import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import styles from "./styles/styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import SampleTabScreen from "./screens/tabScreens/SampleTabScreen";
import SampleProfile from "./screens/drawerScreens/SampleProfile";
import CameraHomeScreen from "./screens/tabScreens/CameraHomeScreen";
import CameraScreen from "./screens/tabScreens/CameraScreen";
import CameraProfileScreen from "./screens/tabScreens/CameraProfileScreen";
import Fontisto from "@expo/vector-icons/Fontisto";
import Moments from "./screens/drawerScreens/Moments";
import TriviaGame from "./screens/tabScreens/triviaGame/TriviaGame";
import CalendarScreen from "./screens/tabScreens/CalendarScreen";
import CompassScreen from "./screens/tabScreens/CompassScreen";
// CREATE TAB NAVIGATION
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const transparentScreens = ["Quiz"];

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        headerShown: false, // HIDE DEFAULT TAB HEADER
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
          tabBarIcon: ({ color, size }) => {
            return (
              <Fontisto name="photograph" size={size} color={color}></Fontisto>
            );
          },
        }}
      />
      <Tab.Screen name="Calendar" component={CalendarScreen} 
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <Fontisto name="calendar" size={size} color={color}></Fontisto>
            );
          },
        }}/>
      <Tab.Screen name="Task" component={SampleTabScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialIcons name="add-task" size={size} color={color}></MaterialIcons>
            );
          },
        }} />
      <Tab.Screen name="Compass" component={CompassScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <Fontisto name="compass-alt" size={size} color={color}></Fontisto>
            );
          },
        }} />
      <Tab.Screen
        style={styles.tabIconTrivia}
        name="Quiz"
        component={TriviaGame}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialIcons name="quiz" size={size} color={color}></MaterialIcons>
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
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Module 5 Project"
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name="menu" size={size} color={color} />
          ),
        }}
      >
        {(props) => <TabNavigator {...props} />}
      </Drawer.Screen>
      <Drawer.Screen
        name="Moments "
        component={Moments}
        options={{
          drawerIcon: ({ focused, color, size }) => {
            return <Fontisto name="photograph" size={size} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        name="Johnny"
        component={SampleProfile}
        options={{
          drawerIcon: ({ focused, color, size }) => {
            return <Fontisto name="calendar" size={size} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        name="Joseph"
        component={SampleProfile}
        options={{
          drawerIcon: ({ focused, color, size }) => {
            return <MaterialIcons name="add-task" size={size} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        name="Manyu"
        component={SampleProfile}
        options={{
          drawerIcon: ({ focused, color, size }) => {
            return <Fontisto name="compass" size={size} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        name="Andrew"
        component={SampleProfile}
        options={{
          drawerIcon: ({ focused, color, size }) => {
            return <MaterialIcons name="quiz" size={size} color={color} />;
          },
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
        <Stack.Screen name="Camera" component={CameraScreen}></Stack.Screen>
        <Stack.Screen
          name="CameraProfile"
          component={CameraProfileScreen}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
