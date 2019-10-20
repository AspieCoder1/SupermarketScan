import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Main from './components/Main';
import Camera from './components/Camera';

const TabNavigator = createBottomTabNavigator({
	Home: Main,
	Camera,
});

export default createAppContainer(TabNavigator);
