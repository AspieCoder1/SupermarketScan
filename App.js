import React from 'react';
import Nav from './Navigation';

import store from './redux/store';
import { Provider } from 'react-redux';

export default function App() {
	return (
		<Provider store={store}>
			{/* <NativeRouter>
				<Route exact path="/" component={Camera} />
			</NativeRouter> */}
			<Nav />
		</Provider>
	);
}
