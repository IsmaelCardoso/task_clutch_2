import React from 'react';
import { FlatList } from 'react-native';

import { ItemWrapper } from './ItemWrapper';
import TaskItem from './TaskItem';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface EditingProps {
  id: number;
  newTitle: string;
}

interface EditTaskProps {
  taskId: number; 
  taskNewTitle: string;
}
interface TasksListProps {
  tasks: Task[];
  editTask: ({taskId, taskNewTitle}: EditTaskProps) => void;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
}

export function TasksList({ tasks, editTask, toggleTaskDone, removeTask }: TasksListProps) {

  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <TaskItem index={index} task={item} editTask={editTask} toggleTaskDone={toggleTaskDone} removeTask={removeTask} />
          </ItemWrapper>
        )
      }}
      style={{
        marginTop: 32
      }}
    />
  )
}