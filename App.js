import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import {
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import styles from "./styles/styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import SampleTabScreen from "./screens/tabScreens/SampleTabScreen";
import SampleProfile from "./screens/drawerScreens/SampleProfile";
import TriviaGame from "./screens/tabScreens/triviaGame/TriviaGame";

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
      <Tab.Screen name="Bindu" component={SampleTabScreen} />
      <Tab.Screen name="Johnny" component={SampleTabScreen} />
      <Tab.Screen name="Joseph" component={SampleTabScreen} />
      <Tab.Screen name="Manyu" component={SampleTabScreen} />
      <Tab.Screen
        style={styles.tabIconTrivia}
        name="Quiz"
        component={TriviaGame}
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
            <MaterialCommunityIcons
              name="menu"
              size={size}
              color={color}
            />
          ),
        }}
      >
        {(props) => <TabNavigator {...props} />}
      </Drawer.Screen>
      <Drawer.Screen
        name="Bindu"
        component={SampleProfile}
        options={{
          drawerIcon: ({ focused, color, size }) => {
            return (
              <MaterialIcons
                name="article"
                size={size}
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
          drawerIcon: ({ focused, color, size }) => {
            return (
              <MaterialIcons
                name="article"
                size={size}
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
          drawerIcon: ({ focused, color, size }) => {
            return (
              <MaterialIcons
                name="article"
                size={size}
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
          drawerIcon: ({ focused, color, size }) => {
            return (
              <MaterialIcons
                name="article"
                size={size}
                color={color}
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name="Andrew"
        component={SampleProfile}
        options={{
          drawerIcon: ({ focused, color, size }) => {
            return (
              <MaterialIcons
                name="article"
                size={size}
                color={color}
              />
            );
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
