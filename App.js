import { StatusBar } from 'expo-status-bar';
import { Alert, FlatList, Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import dayjs from "dayjs"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from '@expo/vector-icons';

import {runPracticeDayjs} from './src/practice-dayjs';
import { ITEM_WIDTH, bottomSpace, getCalendarColumns, statusBarHeight } from './src/util';
import { useCalendar } from './src/hook/use-calendar';
import { useTodoList } from './src/hook/use-todo-list';
import Calendar from './src/Calendar';
import Margin from './src/Margin';
import AddTodoInput from './src/AddTodoInput';

export default function App() {

  const now = dayjs();
  const {
    selectedDate,
    setSelectedDate,
    isDatePickerVisible,
    showDatePicker,
    hideDatePicker,
    handleConfirm,
    subtract1Month,
    add1Month
  } = useCalendar(now);

  const {
    todoList,
    addTodo,
    removeTodo,
    toggleTodo,
    input,
    setInput,
    resetInput
  } = useTodoList(selectedDate);
  
  const columns = getCalendarColumns(selectedDate);
  const flatListRef = useRef(null);

  const onPressLeftArrow = subtract1Month;
  const onPressHeaderDate = showDatePicker;
  const onPressRightArrow = add1Month;
  const onPressDate = setSelectedDate;

  const ListHeaderComponent = () => (
    <View>
      <Calendar 
        columns={columns}
        selectedDate={selectedDate}
        onPressLeftArrow={onPressLeftArrow}
        onPressHeaderDate={onPressHeaderDate}
        onPressRightArrow={onPressRightArrow}
        onPressDate={onPressDate}
      />
      <Margin height={15}/>
      <View
        style={{ 
          width: 4, 
          height: 4, 
          borderRadius: 4 / 2, 
          backgroundColor: '#a3a3a3',
          alignSelf: 'center'
        }}
      />
      <Margin height={15}/>
    </View>
  )

  const renderItem = ({ item : todo }) => {
    const isSuccess = todo.isSuccess;
    const onPress = () => toggleTodo(todo.id);
    const onLongPress = () => {
      Alert.alert('삭제하시겠어요?', '', [
        {
          style: 'cancel',
          text: '아니오'
        },
        {
          text: '네',
          onPress: () => removeTodo(todo.id)
        }
      ])
    }

    return (
      <Pressable
        onPress={onPress} 
        onLongPress={onLongPress}
        style={{ 
          width: ITEM_WIDTH, 
          alignSelf: 'center',
          paddingVertical: 10,
          paddingHorizontal: 5,
          borderBottomWidth: 0.2,
          borderColor: '#a6a6a6',
          flexDirection: 'row',
        }}
      >
        <Text style={{ flex: 1, fontSize: 14, color: '#595959'}}>{todo.content}</Text>

        <Ionicons 
          name='ios-checkmark' 
          size={17}
          color={isSuccess ? '#595959' : '#bfbfbf'}
        />
      </Pressable>
    )
  }

  const scrollToEnd = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd();
    }, 200);
  }

  const onPressAdd = () => {
    addTodo();
    resetInput();
    scrollToEnd();
  }

  const onSubmitEditing = () => {
    addTodo();
    resetInput();
    scrollToEnd();
  }

  const onFocus = () => {
    scrollToEnd();
  }

  useEffect(() => {
    // runPracticeDayjs();
    // console.log('columns', columns);
  }, []);

  return (
    /* Touch는 되지만 TouchableOpacity 처럼 눌렀을때 투명해지지는 않음 (activeOpacity={1}) */
    <Pressable style={styles.container} onPress={Keyboard.dismiss}> 
      <Image
        source={{
          uri: "https://img.freepik.com/free-photo/white-crumpled-paper-texture-for-background_1373-159.jpg?w=1060&t=st=1667524235~exp=1667524835~hmac=8a3d988d6c33a32017e280768e1aa4037b1ec8078c98fe21f0ea2ef361aebf2c",
        }}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={{flex: 1}}>
          <FlatList
            ref={flatListRef}
            data={todoList}
            ListHeaderComponent={ListHeaderComponent}
            contentContainerStyle={{paddingTop: statusBarHeight + 30}}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
          />

          <AddTodoInput
            value={input}
            onChangeText={setInput}
            placeholder={`${dayjs(selectedDate).format('MM.D')}에 추가할 TODO`}
            onPressAdd={onPressAdd}
            onSubmitEditing={onSubmitEditing}
            onFocus={onFocus}
          />
        </View>
      </KeyboardAvoidingView>

      <Margin height={bottomSpace}/>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
