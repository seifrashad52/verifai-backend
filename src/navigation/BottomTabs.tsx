import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PlayScreen from "../screens/Play/PlayScreen";
import SearchScreen from "../screens/Search/SearchScreen"; // hosts "Check a Claim"
import ScoreScreen from "../screens/Score/ScoreScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Play" component={PlayScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Score" component={ScoreScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
