import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

export default class InputNumberButton extends React.Component {
	render() {
		const { value, handlePress } = this.props;
		return (
			<TouchableOpacity
				style={styles.container}
				onPress={() => handlePress(value)}
			>
				<Text style={styles.text}>{value}</Text>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 1,
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		justifyContent: 'center',
		alignItems: 'center'
	},
	text: {
		color: '#FF8E23',
		fontSize: 30
	}
});
