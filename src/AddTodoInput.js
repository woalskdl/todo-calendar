import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { ITEM_WIDTH, bottomSpace } from "./util";
import {AntDesign} from '@expo/vector-icons';

export default ({
  value,
  onChangeText,
  placeholder,
  onPressAdd,
  onSubmitEditing,
  onFocus
}) => {
  return (
    <View 
      style={{
        flexDirection: 'row', 
        width: ITEM_WIDTH,
        alignItems: 'center',
        alignSelf: 'center'
      }}
    >
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={{
          flex: 1,
          padding: 5,
          color: '#595959'
        }}
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={false}
        onFocus={onFocus}
      />
      <TouchableOpacity onPress={onPressAdd} style={{ padding : 5 }}>
        <AntDesign name="plus" size={18} color='#595959'/>
      </TouchableOpacity>
    </View>
  )
}