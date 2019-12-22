import React from 'react';
import { View, Text, StyleSheet, FlatList, Button, Alert } from 'react-native';
import { connect } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import _ from 'lodash';

class Main extends React.Component {
	state = {
		predictions: [],
		shoppingList: ['Apple', 'Pear', 'Grapes', 'Pen'],
		basket: [],
		score: 0,
	};

	async componentDidUpdate(prevProps) {
		if (this.props.isFocused !== prevProps.isFocused) {
			await this.setState({ predictions: this.props.state.predictions });
			const intersections = _.intersection(
				this.state.predictions.map(item => item.toLowerCase()),
				this.state.shoppingList.map(item => item.toLowerCase()),
			);
			if (intersections.length > 0) {
				const item = intersections[0];
				this.setState(prevState => ({
					shoppingList: prevState.shoppingList.filter(
						listItem => listItem.toLowerCase() !== item.toLowerCase(),
					),
					basket: [...prevState.basket, item],
				}));
				this.setState(prevState => ({ score: (prevState.score += 10) }));
			}
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>Score: {this.state.score}</Text>
				<Text style={styles.shoppingListTitle}>Shopping List</Text>
				<FlatList
					data={this.state.shoppingList.map(item => ({ key: item }))}
					renderItem={({ item }) => (
						<Text style={styles.listItem}>{item.key}</Text>
					)}
				/>
				<Text style={styles.basketTitle}>My Basket</Text>
				<FlatList
					data={this.state.basket.map(item => ({ key: item }))}
					renderItem={({ item }) => (
						<Text style={styles.listItem}>{item.key}</Text>
					)}
				/>
				<Text style={styles.bonusTitle}>Bonus Points</Text>
				<Text>Take a pitcture of yourself shoplifting</Text>
				<Button
					title="Let's do it"
					onPress={() => {
						// Alert.alert('Shoplifting camera component');
						this.props.navigation.navigate('Bonus');
					}}
				></Button>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		margin: 5,
		marginTop: 50,
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	shoppingListTitle: {
		fontSize: 24,
	},
	listItem: {},
	basketTitle: {
		fontSize: 24,
	},
	bonusTitle: {
		fontSize: 24,
	},
});

export default connect(state => ({ state }), {})(withNavigationFocus(Main));
