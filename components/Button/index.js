import { Text, TouchableHighlight } from "react-native"
import { styles } from "./styles"

export default props => {
    const stylesButton = [styles.button]
    props.double && stylesButton.push(styles.buttonDouble)
    props.triple && stylesButton.push(styles.buttonTriple)
    props.operation && stylesButton.push(styles.operationButton)

    return <TouchableHighlight onPress={ props.onPress }><Text style={stylesButton}>{ props.text }</Text></TouchableHighlight>
}