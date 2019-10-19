import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

export default function App() {
	return (
		<View style={styles.container}>
			<Text>Hello World!</Text>
			<Button
				title="Click Me"
				onPress={() => Alert.alert('Button clicked')}
			></Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
