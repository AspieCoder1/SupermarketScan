import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

export default class CameraExample extends React.Component {
	state = {
		hasCameraPermission: null,
		type: Camera.Constants.Type.back,
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
								onPress={async () => {
									if (this.camera) {
										let data = await this.camera.takePictureAsync();
										console.log(data.uri);
									}
								}}
							>
								<Text
									style={{ fontSize: 18, marginBottom: 10, color: 'white' }}
								>
									Take Picture
								</Text>
							</TouchableOpacity>
						</View>
					</Camera>
				</View>
			);
		}
	}
}
