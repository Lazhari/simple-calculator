import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import InputNumberButton from './InputNumberButton';

const buttons = [
	['CLEAR', 'DEL'],
	['7', '8', '9', '÷'],
	['4', '5', '6', 'x'],
	['1', '2', '3', '-'],
	['0', '.', '=', '+']
];

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.initialState = {
			displayValue: '0',
			operator: null,
			firstValue: '',
			secondValue: '',
			nextValue: false
		};
		this.state = this.initialState;
	}
	handlePress = input => {
		const {
			displayValue,
			operator,
			nextValue,
			firstValue,
			secondValue
		} = this.state;
		switch (input) {
			case '0':
			case '1':
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
			case '7':
			case '8':
			case '9':
				this.setState({
					displayValue: displayValue === '0' ? input : displayValue + input
				});
				if (!nextValue) {
					this.setState({
						firstValue: firstValue + input
					});
				} else {
					this.setState({
						secondValue: secondValue + input
					});
				}
				break;
			case '+':
			case '-':
			case 'x':
			case '÷':
				this.setState({
					nextValue: true,
					operator: input,
					displayValue:
						operator !== null
							? displayValue.substr(0, displayValue.length - 1)
							: displayValue + input
				});
				break;
			case '.':
				let dot = displayValue.toString().slice(-1);
				this.setState({
					displayValue: dot !== '.' ? displayValue + input : displayValue
				});
				if (!nextValue) {
					this.setState({
						firstValue: firstValue + input
					});
				} else {
					this.setState({
						secondValue: secondValue + input
					});
				}
				break;
			case '=':
				let formatOperator =
					operator === 'x' ? '*' : operator === '÷' ? '/' : operator;
				let result = eval(firstValue + formatOperator + secondValue);
				this.setState({
					displayValue: result % 1 === 0 ? result : result.toFixed(2),
					firstValue: result % 1 === 0 ? result : result.toFixed(2),
					secondValue: '',
					operator: null,
					nextValue: true
				});
				break;
			case 'CLEAR':
				this.setState(this.initialState);
				break;
			case 'DEL':
				let deletedString = displayValue
					.toString()
					.substr(0, displayValue.toString().length - 1);
				let length = displayValue.length;
				this.setState({
					displayValue: length === 1 ? '0' : deletedString,
					firstValue: length === 1 ? '0' : deletedString
				});
				break;
			default:
				this.setState({ displayValue: '0' });
		}
	};

	renderButtons() {
		let layouts = buttons.map((buttonRows, index) => {
			let rowItems = buttonRows.map((button, buttonIndex) => {
				return (
					<InputNumberButton
						key={`btn-${buttonIndex}`}
						value={button}
						handlePress={this.handlePress}
					/>
				);
			});
			return (
				<View style={styles.inputRow} key={`row-${index}`}>
					{rowItems}
				</View>
			);
		});
		return layouts;
	}
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.resultContainer}>
					<Text style={styles.resultText}>{this.state.displayValue}</Text>
				</View>

				<View style={styles.inputContainer}>{this.renderButtons()}</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	resultContainer: {
		flex: 2,
		justifyContent: 'center',
		backgroundColor: '#22262B'
	},
	inputContainer: {
		flex: 8,
		backgroundColor: '#292C34'
	},
	resultText: {
		color: '#FF8E23',
		fontSize: 80,
		fontWeight: 'bold',
		padding: 20,
		textAlign: 'right'
	},
	inputRow: {
		flex: 1,
		flexDirection: 'row'
	}
});
