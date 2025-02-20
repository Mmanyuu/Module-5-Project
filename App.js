import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import {
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import SampleTabScreen from "./screens/tabScreens/SampleTabScreen";
import SampleProfile from "./screens/drawerScreens/SampleProfile";
import CalendarScreen from "./screens/tabScreens/CalendarScreen";

// CREATE TAB NAVIGATION
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        headerShown: false, // HIDE DEFAULT TAB HEADER
      })}
    >
      <Tab.Screen name="Bindu" component={SampleTabScreen} />
      <Tab.Screen name="Johnny" component={CalendarScreen} />
      <Tab.Screen name="Joseph" component={SampleTabScreen} />
      <Tab.Screen name="Manyu" component={SampleTabScreen} />
      <Tab.Screen name="Andrew" component={SampleTabScreen} />
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
