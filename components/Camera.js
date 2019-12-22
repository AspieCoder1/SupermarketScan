import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { setPredictions } from '../redux/actions';

const config = require('../config/config.json');

class CameraComponent extends React.Component {
	state = {
		hasCameraPermission: null,
		disabled: false,
		loaded: true,
	};

	async componentDidMount() {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		this.setState({ hasCameraPermission: status === 'granted' });
	}

	render() {
		const { hasCameraPermission, loaded } = this.state;
		if (hasCameraPermission === null) {
			return <View />;
		} else if (hasCameraPermission === false) {
			return <Text>No access to camera</Text>;
		} else {
			return (
				<View style={{ flex: 1 }}>
					<NavigationEvents
						onWillFocus={payload => this.setState({ loaded: true })}
						onDidBlur={payload => this.setState({ loaded: false })}
					/>
					{loaded && (
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
											let pic = await this.camera.takePictureAsync();
											console.log(pic.uri);
											console.log('sending a request to google');
											const imageData = await FileSystem.readAsStringAsync(
												pic.uri,
												{
													encoding: 'base64',
												},
											);
											axios
												.post(
													`https://vision.googleapis.com/v1/images:annotate?key=${config.API_KEY}`,
													{
														requests: [
															{
																image: {
																	content: imageData,
																},
																features: [
																	{
																		type: 'LABEL_DETECTION',
																		maxResults: 10,
																	},
																],
															},
														],
													},
												)
												.then(res => {
													const labels = res.data.responses[0].labelAnnotations.map(
														label => label.description,
													);
													console.log(labels);
													this.props.setPredictions(labels);
													this.setState({ disabled: false });
												})
												.catch(err => console.log(err));
										}
									}}
								>
									<Text
										style={{ fontSize: 18, marginBottom: 10, color: 'white' }}
									>
										{this.state.disabled ? 'Analysing...' : 'Take Picture'}
									</Text>
								</TouchableOpacity>
							</View>
						</Camera>
					)}
				</View>
			);
		}
	}
}

export default connect(state => ({ state }), { setPredictions })(
	CameraComponent,
);
