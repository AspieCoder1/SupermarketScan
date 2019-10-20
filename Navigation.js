import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Main from './components/Main';
import Camera from './components/Camera';
import Bonus from './components/Bonus';

const TabNavigator = createBottomTabNavigator({
	Home: Main,
	Camera,
	Bonus,
});

export default createAppContainer(TabNavigator);
