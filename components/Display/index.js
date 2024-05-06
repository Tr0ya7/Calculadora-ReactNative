import { View, Text, TextInput } from "react-native"
import { styles } from "./styles"

export default props => <View style={styles.container}><Text style={styles.title}>Calculator</Text><Text style={styles.value} numberOfLines={1}>{ props.value }</Text></View>