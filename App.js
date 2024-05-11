import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, View } from 'react-native'
import { styles } from './styles'
import Display from './components/Display'
import Button from './components/Button'
import { Component } from 'react'

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class App extends Component {
    state = { ...initialState } //cria uma cópia para modificação dos valores do initial state, deixando os valores da const initialState como um "backup"
    
    addDigit = (value) => { 
        if (value === '.' && this.state.displayValue.includes('.')) return //se ja existir um '.' no display e clicar novamente no '.' ele não deve ser adicionado novamente
        
        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay //const que verifica se a um único '0' no currentDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue //o valor corrente do display
        const displayValue = currentValue + value //adicionando valor no displayValue pelo valor corrente //currentValue + value não fará uma soma pois todos os valores são strings
        
        this.setState({ displayValue, clearDisplay: false }) //logo após, adiciona o displayValue acima como valor do state displayValue e mostra que não deve ter um '0' sozinho no começo do display quando se começa a digitar os valores setando a const clearDisplay como : false

        if (value !== '.') {
            const newValue = parseFloat(displayValue) //pega o valor do state display que estava como string eo transforma em um valor float
            const values = [...this.state.values] //armazena nessa const os valores do state values

            values[this.state.current] = newValue //pega se estou modificando o index 0 do array ou o campo 1
            this.setState({ values }) //adiciona o novo valor que veio da const com o mesmo nome do state para o state
        }
    }

    clearMemory = () => this.setState({ ...initialState }) //passa os valores da const initialState para dentro da sua cópia para modificação state
    
    addOperation = (operation) => {
        if (this.state.current === 0) this.setState({ operation, current: 1, clearDisplay: true }) //guarda a operação clicada, depois muda o index que estamos do array para o valor 1 e limpa o display
        
        const equals = operation === '=' //quarda quando a operação digitada for igual a '='
        const values = [...this.state.values] //gera um clone do array values de state

        try {
            values[0] = eval(`${values[0]}${this.state.operation}${values[1]}`) //para fazer a operação é preciso pegar o valor do primeiro index do array, logo após adicionar a operação para logo depois adicionar o valor do outro index no final, como sendo o outro valor da operação     //operação sendo pega é a que está guardada no state    //eval serve para interpolar as variáveis que serve também para identificar qual a operação matemática que irá ocorrer, idependente se o valor da operação for uma string ou dos números dessa operação
        } catch (err) {
            values[0] = this.state.values[0] //caso o valor digitado for '=' ele irá gerar um erro no eval pois será primeiro valor = segundo valor, que matemáticamente não fará sentido e nem no eval    //para se resolver isso basta que quando ocorrer isso ele mostre o valor do primeiro index do array vindo do state
        }

        values[1] = 0
        this.setState({
            displayValue: values[0],
            operation: equals ? null : operation,
            current: equals ? 0 : 1,
            clearDisplay: !equals,
            values, // como tem o mesmo nome não precisa por : values
        })
    }

    handleOnPress = (arr) => {
        if (arr.action === 'clearMemory') return this.clearMemory()
        else if (arr.action === 'addDigit') return this.addDigit(arr.text)
        
        return this.addOperation(arr.text)
    }

    render() {
        const buttonsText = [
            { id: 1, text: 'AC', triple: true, action: 'clearMemory' }, 
            { id: 2, text: '/', operation: true, action: 'operation' }, 
            { id: 3, text: '7', action: 'addDigit' }, 
            { id: 4, text: '8', action: 'addDigit' }, 
            { id: 5, text: '9', action: 'addDigit' }, 
            { id: 6, text: '*', operation: true, action: 'addOperation' }, 
            { id: 7, text: '4', action: 'addDigit' }, 
            { id: 8, text: '5', action: 'addDigit' }, 
            { id: 9, text: '6', action: 'addDigit' }, 
            { id: 10, text: '-', operation: true, action: 'addOperation' },
            { id: 11, text: '1', action: 'addDigit' }, 
            { id: 12, text: '2', action: 'addDigit' }, 
            { id: 13, text: '3', action: 'addDigit' }, 
            { id: 14, text: '+', operation: true, action: 'addOperation' }, 
            { id: 15, text: '0', double: true, action: 'addDigit' }, 
            { id: 16, text: '.', action: 'addDigit' },
            { id: 17, text: '=', operation: true, action: 'addOperation' }
        ]

        return (
            <SafeAreaView style={styles.container}>
                    <Display value={this.state.displayValue} />
                    <View style={styles.buttons}>
                        {buttonsText.map((item) => 
                            <Button key={item.id} text={item.text} double={item.double} triple={item.triple} operation={item.operation} onPress={() => this.handleOnPress(item)} />
                        )}
                    </View>
                    <StatusBar style="auto" />
            </SafeAreaView>
        )
    }
}