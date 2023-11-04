import { StatusBar } from 'expo-status-bar';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {runPracticeDayjs} from './src/practice-dayjs';
import { useEffect } from 'react';
import { getCalendarColumns, getDayColor, getDayText } from './src/util';
import dayjs from "dayjs"
import Margin from './src/Margin';

import { SimpleLineIcons } from '@expo/vector-icons'; 

const columnSize = 35;

const Column = ({text, color, opacity}) => {
  return (
      <View style={{
          width: columnSize, 
          height: columnSize, 
          justifyContent: 'center', 
          alignItems: 'center'
        }}>
        <Text style={{color, opacity}}>{text}</Text>
      </View>
  );
}

const ArrowButton = ({onPress, iconName}) => {
  return (
    <TouchableOpacity style={{paddingHorizontal: 20, paddingVertical: 15}}>
      <SimpleLineIcons name={iconName} size={15} color="black" onPress={onPress}/>
    </TouchableOpacity>
  )
}

export default function App() {

  const now = dayjs();
  const columns = getCalendarColumns(now);

  const ListHeaderComponent = () => {
    const currentDateText = dayjs(now).format('YYYY.MM.DD.');
    return (
      <View>
        {/* < YYYY.MM.DD > */}
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <ArrowButton iconName={'arrow-left'} onPress={() => {}}/>
          <Text style={{fontSize: 20, color: '#404040'}}>{currentDateText}</Text>
          <ArrowButton iconName={'arrow-right'} onPress={() => {}}/>
        </View>
        <Margin height={15}/>
  
        {/* 일 ~ 토 */}
        <View style={{flexDirection: 'row'}}>
          {[0, 1, 2, 3, 4, 5, 6].map(day => {
            const dayText = getDayText(day);
            return (
              <Column key={`day-${day}`} text={dayText} color={getDayColor(day)} opacity={1}/>
            )
          })}
        </View>
      </View>
    )
  }

  const renderItem = ({item : date}) => {
    const dateText = dayjs(date).get('date');
    const day = dayjs(date).get('day');
    const color = getDayColor(day);
    const isCurrentMonth = dayjs(date).isSame(now, 'month');
    return (
      <Column text={dateText} color={color} opacity={isCurrentMonth ? 1 : 0.4}/>
    )
  };

  useEffect(() => {
    // runPracticeDayjs();
    // console.log('columns', columns);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        keyExtractor={(_, idx) => `column-${idx}`}
        data={columns}
        renderItem={renderItem}
        numColumns={7}
        ListHeaderComponent={ListHeaderComponent}
      />
    </SafeAreaView>
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
