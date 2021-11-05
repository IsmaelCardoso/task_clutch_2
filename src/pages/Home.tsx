import { doExpression } from '@babel/types';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

interface EditTaskProps {
  taskId: number; 
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const existingTask = tasks.find((task) => task.title === newTaskTitle);

    if (existingTask) {
      return Alert.alert("Task já cadastrada", "Você não pode cadastrar uma task com o mesmo nome")
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }

    setTasks(oldTasks => [...oldTasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    setTasks(currentTasks =>
      currentTasks.map(task => task.id === id ? { ...task, done: !task.done } : task)
    )
  }

  function handleRemoveTask(id: number) {

    Alert.alert(
      "Remover item",
      "deseja remover esse item?",
      [
        {
          text: "Não",
          style: "cancel"
        },
        { text: "Sim", 
          style: "destructive", 
          onPress: () => setTasks(oldTask => oldTask.filter((task) => task.id !== id)) 
        }
      ]
    )
  }

  function handleEditTask({taskId, taskNewTitle}: EditTaskProps) {
    setTasks(currentTasks =>
      currentTasks.map(task => task.id === taskId ? { ...task, title: taskNewTitle } : task)
    )
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        editTask={handleEditTask}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})