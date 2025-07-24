import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'

const variants = {
  "default": "bg-blue-200",
  "continue": "bg-purple-200",
  "primary": "bg-blue-200",
  "secondary": "bg-blue-200",
  "tertiary": "bg-blue-200",
  "destructive": "bg-red-200",
  "buy": "bg-green-200",
}

const RaisedButton = ({onPress, variant, children, buttonStyles, disabled}) => {

  const variantClass = variants[variant] || variants["default"];

  return (
    <TouchableOpacity
      className={`items-center flex border border-b-4 shadow-md rounded-lg font-bold ${variantClass} ${buttonStyles}`}
      onPress={onPress}
      disabled={disabled}
    >
      {children}
    </TouchableOpacity>
  )
}

export default RaisedButton