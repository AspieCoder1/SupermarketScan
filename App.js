import React from 'react';
import { Route, NativeRouter } from 'react-router-native';
import Main from './components/Main';
import Camera from './components/Camera';

import store from './redux/store';
import { Provider } from 'react-redux';

export default function App() {
	return (
		<Provider store={store}>
			<NativeRouter>
				<Route exact path="/" component={Camera} />
			</NativeRouter>
		</Provider>
	);
}
