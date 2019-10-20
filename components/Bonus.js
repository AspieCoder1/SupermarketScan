import React from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { connect } from 'react-redux';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { setPredictions } from '../redux/actions';

const config = require('../config/config.json');

export default class Bonus extends React.Component {
	state = {
		hasCameraPermission: null,
		disabled: false,
	};

	async componentDidMount() {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		this.setState({ hasCameraPermission: status === 'granted' });
	}

	render() {
		const { hasCameraPermission } = this.state;
		if (hasCameraPermission === null) {
			return <View />;
		} else if (hasCameraPermission === false) {
			return <Text>No access to camera</Text>;
		} else {
			return (
				<View style={{ flex: 1 }}>
					<Camera
						flashMode="auto"
						style={{ flex: 1 }}
						type={this.state.type}
						ref={ref => {
							this.camera = ref;
						}}
					>
						<View
							style={{
								flex: 1,
								backgroundColor: 'transparent',
								flexDirection: 'row',
								alignItems: 'flex-end',
								justifyContent: 'center',
							}}
						>
							<TouchableOpacity
								disabled={this.state.disabled}
								onPress={async () => {
									this.setState({ disabled: true });
									if (this.camera) {
										// let pic = await this.camera.takePictureAsync();
										Alert.alert('Should post image to twitter');
									}
									this.setState({ disabled: false });
								}}
							>
								<Text
									style={{ fontSize: 18, marginBottom: 10, color: 'white' }}
								>
									{this.state.disabled ? 'Scoring...' : 'Take Picture'}
								</Text>
							</TouchableOpacity>
						</View>
					</Camera>
				</View>
			);
		}
	}
}
