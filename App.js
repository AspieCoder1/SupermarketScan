import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { Route, NativeRouter } from 'react-router-native';
import Main from './components/Main';
import Camera from './components/Camera';

export default function App() {
	return (
		<NativeRouter>
			<Route exact path="/" component={Camera} />
		</NativeRouter>
	);
}
