import React from 'react'
import { View } from 'react-native'

const ThemedView = ({ ...props }) => {
  return (
    <View className="flex-1 bg-primary" {...props} />
  )
}

export default ThemedView