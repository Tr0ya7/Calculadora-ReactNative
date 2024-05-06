import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, View } from 'react-native'
import { styles } from './styles'
import Display from './components/Display'
import Button from './components/Button'
import { Component } from 'react'

export default class App extends Component { //diminuir criando um componente intermediário
    state = {
        displayValue: '0',
        clearDisplay: false,
        operation: null,
        values: [0, 0],
        current: 0
    }

    addDigit = (value) => { if (value === '.' && this.state.displayValue.includes('.')) return; const clearDisplay = this.state.displayValue === 0 }
    clearMemory = () => this.setState({ displayValue: 0 })
    addOperation = (value) => this.setState({ displayValue: value })

    render() {
        const buttonsText = [
            { id: 1, text: 'AC', triple: true, action: () => this.clearMemory }, 
            { id: 2, text: '/', operation: true, action: () => this.addDigit }, 
            { id: 3, text: 7, action: () => this.addDigit }, 
            { id: 4, text: 8, action: () => this.addDigit }, 
            { id: 5, text: 9, action: () => this.addDigit }, 
            { id: 6, text: '*', operation: true, action: () => this.addOperation }, 
            { id: 7, text: 4, action: () => this.addDigit }, 
            { id: 8, text: 5, action: () => this.addDigit }, 
            { id: 9, text: 6, action: () => this.addDigit }, 
            { id: 10, text: '-', operation: true, action: () => this.addOperation },
            { id: 11, text: 1, action: () => this.addDigit }, 
            { id: 12, text: 2, action: () => this.addDigit }, 
            { id: 13, text: 3, action: () => this.addDigit }, 
            { id: 14, text: '+', operation: true, action: () => this.addOperation }, 
            { id: 15, text: 0, double: true, action: () => this.addDigit }, 
            { id: 16, text: '.', action: () => this.addDigit },
            { id: 17, text: '=', operation: true, action: () => this.addOperation }
        ]

        return (
            <SafeAreaView style={styles.container}>
                    <Display value={this.state.displayValue} />
                    <View style={styles.buttons}>
                        {buttonsText.map((item) => 
                            <Button key={item.id} text={item.text} double={item.double} triple={item.triple} operation={item.operation} onPress={item.action()} />
                        )}
                    </View>
                    <StatusBar style="auto" />
            </SafeAreaView>
        )
    }
}