import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, { act, useReducer, useState } from 'react'
import { Task } from '../types/Task';
import { TaskListAction } from '../types/TaskListAction';
import Row from '../components/Row';

const [inputText, setInputText] = useState<string>('')

const todoReducer = (state: Task[], action: TaskListAction) => {
    switch (action.type) {
        case 'ADD':
            return [...state, {text: action.text, done: 0, id: state.length + 1}]
        case 'TOGGLE':
            return state.map((task, id) =>
                id === action.id ? { ...task, done: !task.done } : task
            );
        case 'DELETE':
            return state.filter(task => task.id !== action.id);
        default:
            Error();
    }
};

export default function useTodos() {
    const [tasks, dispatch] = useReducer(todoReducer, [])
  
    const addTask = (text : string) => {
        dispatch({ type: 'ADD', text: text});
    }

    const toggleTask = (id: number) => {
        dispatch({ type: 'TOGGLE', id: id});
    }

    const deleteTask = (id: number) => {
        dispatch({ type: 'DELETE', id: id});
    }
    
    return (
        <>
            <Text style={styles.header}>Todo List</Text>
            <View style={styles.input}>
                <TextInput
                    placeholder="Enter task..."
                    value={inputText}
                    onChangeText={setInputText}
                    onSubmitEditing={addTask}
                />
                <TouchableOpacity onPress={async () => addTask(inputText)} style={styles.addButton}>
                    <Text>Add</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Row item={item} toggleTask={async () => toggleTask(item.id)} deleteTask={async () => deleteTask(item.id)} />
                )}
            />
        </>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff49',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 24,
    margin: 16,
    textAlign: 'center'
  },
  input:{
    alignItems: 'center'
  },
  addButton: {
    backgroundColor: '#17bb11a5',
    padding: 8
  }
});