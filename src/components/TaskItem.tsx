import React, { useEffect, useRef, useState } from 'react';

import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native'

import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png';
import penEditIcon from '../assets/icons/penEdit/penEdit.png';
import xIcon from '../assets/icons/xIcon/xIcon.png';
import rectangle from '../assets/icons/pipe/rectangle.png';

import { Task as ITask } from './TasksList'

interface EditTaskProps {
    taskId: number; 
    taskNewTitle: string;
}

interface TasksListProps {
    index: number;
    task: ITask;
    editTask: ({taskId, taskNewTitle}: EditTaskProps) => void;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
}

const TaskItem: React.FC<TasksListProps> = ({ index, task, editTask, toggleTaskDone, removeTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [taskNewTitle, setTaskNewTitle] = useState<string>(task.title);

    const textInputRef = useRef<TextInput>(null);

    const handleStartEditing = () => {
        setIsEditing(true);
    }

    const handleCancelEditing = () => {
        setTaskNewTitle(task.title)
        setIsEditing(false);
    }

    const handleSubmitEditing = () => {
        editTask({ taskId: task.id, taskNewTitle: taskNewTitle });

        setIsEditing(false);
    }

    useEffect(() => {
        if (textInputRef.current) {
            if (isEditing) {
              textInputRef.current.focus();
            } else {
              textInputRef.current.blur();
            }
        }
    }, [isEditing])

    return (
        <>
            <View>
                <TouchableOpacity
                    testID={`button-${index}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(task.id)}
                >
                    <View
                        testID={`marker-${index}`}
                        style={task.done ? styles.taskMarkerDone : styles.taskMarker}
                    >
                        {task.done && (
                            <Icon
                                name="check"
                                size={12}
                                color="#FFF"
                            />
                        )}
                    </View>

                    <TextInput
                        ref={textInputRef}
                        style={task.done ? styles.taskTextDone : styles.taskText}
                        returnKeyType="send"
                        
                        value={taskNewTitle}
                        onChangeText={setTaskNewTitle}
                        editable={isEditing}
                        onSubmitEditing={handleSubmitEditing}
                    />
                </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                    testID={`trash-${index}`}
                    style={{ paddingHorizontal: 24 }}
                    onPress={isEditing ? handleCancelEditing : handleStartEditing}
                >
                    <Image source={isEditing ? xIcon : penEditIcon} /> 
                </TouchableOpacity>

                <Image source={rectangle} /> 

                <TouchableOpacity
                    testID={`trash-${index}`}
                    style={{ paddingHorizontal: 24 }}
                    onPress={() => removeTask(task.id)}
                >  
                    <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} /> 
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 15,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    }
})

export default TaskItem;