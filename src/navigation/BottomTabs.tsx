import type { ComponentProps } from 'react';
import {
  createBottomTabNavigator,
  type BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons/static';
import { AccountScreen } from '../screens/AccountScreen/AccountScreen';
import { AppointmentsScreen } from '../screens/AppointmentsScreen/AppointmentsScreen';
import { BookScreen } from '../screens/BookScreen/BookScreen';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { ServicesScreen } from '../screens/ServicesScreen/ServicesScreen';
import type { TabParamList } from '../types/navigation';
import { AppBottomTabBar } from './AppBottomTabBar';

type IconName = ComponentProps<typeof MaterialDesignIcons>['name'];

const Tab = createBottomTabNavigator<TabParamList>();

function tabIcon(name: IconName, color: string) {
  return <MaterialDesignIcons name={name} size={24} color={color} />;
}

function renderTabBar(props: BottomTabBarProps) {
  return <AppBottomTabBar {...props} />;
}

export function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={renderTabBar}
      screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarAccessibilityLabel: 'Home',
          tabBarIcon: ({ color }) => tabIcon('home-outline', color),
        }}
      />
      <Tab.Screen
        name="Services"
        component={ServicesScreen}
        options={{
          tabBarLabel: 'Services',
          tabBarAccessibilityLabel: 'Services',
          tabBarIcon: ({ color }) => tabIcon('spa-outline', color),
        }}
      />
      <Tab.Screen
        name="Book"
        component={BookScreen}
        options={{
          tabBarLabel: 'Book',
          tabBarAccessibilityLabel: 'Book',
          tabBarIcon: ({ color }) => tabIcon('calendar-check-outline', color),
        }}
      />
      <Tab.Screen
        name="Appointments"
        component={AppointmentsScreen}
        options={{
          tabBarLabel: 'Appointments',
          tabBarAccessibilityLabel: 'Appointments',
          tabBarIcon: ({ color }) => tabIcon('calendar-month-outline', color),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarLabel: 'Account',
          tabBarAccessibilityLabel: 'Account',
          tabBarIcon: ({ color }) => tabIcon('account-outline', color),
        }}
      />
    </Tab.Navigator>
  );
}

export type { TabParamList };
