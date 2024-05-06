import { Dimensions, StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    button: {
      fontSize: 40,
      width: Dimensions.get('window').width / 4,
      height: Dimensions.get('window').width / 4,
      padding: 20,
      backgroundColor: '#f0f0f0',
      textAlign: 'center',
      borderWidth: 1,
      borderColor: '#888'
    },
    
    buttonDouble: {
      width: (Dimensions.get('window').width / 4) * 2
    },

    buttonTriple: {
      width: (Dimensions.get('window').width / 4) * 3
    },

    operationButton: {
      color: '#ffff',
      backgroundColor: '#fa8231'
    }
});