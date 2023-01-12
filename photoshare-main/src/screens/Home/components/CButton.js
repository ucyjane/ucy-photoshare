import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import homeStyles from "../styles/homeStyles"

const CButton = (props) => {
  const {onPress,label,disabled} = props
  return (
    <TouchableOpacity disabled={disabled ? true : false} style={homeStyles.button} onPress={onPress}>
      <Text style={homeStyles.buttonText}>
        {label}
      </Text>
    </TouchableOpacity>
  )
}

export default CButton