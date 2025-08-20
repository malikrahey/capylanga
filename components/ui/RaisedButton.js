import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'

const variants = {
  "default": "bg-blue-500 active:bg-blue-600",
  "continue": "bg-purple-500 active:bg-purple-600",
  "primary": "bg-blue-500 active:bg-blue-600",
  "secondary": "bg-gray-500 active:bg-gray-600",
  "tertiary": "bg-slate-500 active:bg-slate-600",
  "destructive": "bg-red-500 active:bg-red-600",
  "buy": "bg-green-500 active:bg-green-600",
}

const RaisedButton = ({onPress, variant, children, buttonStyles, disabled}) => {

  const variantClass = variants[variant] || variants["default"];
  const disabledClass = disabled ? "opacity-50" : "";

  return (
    <TouchableOpacity
      className={`items-center justify-center px-6 py-4 rounded-2xl shadow-lg ${variantClass} ${disabledClass} ${buttonStyles}`}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {children}
    </TouchableOpacity>
  )
}

export default RaisedButton