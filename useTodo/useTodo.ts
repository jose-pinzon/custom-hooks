
import { useEffect, useReducer } from "react"
import { todoReducer } from "./todoReduce";

export interface stateInicialI {
    id: number;
    description: string;
    done: boolean;
}


const initialState: stateInicialI[] = []

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || []
}


export const useTodo = () => {

    const [todos, dispatch] = useReducer(todoReducer, initialState, init)

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    const handleNewTodo = (todo: stateInicialI) => {

        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }

        dispatch(action)
    }

    const handleDeleteTodo = (id: number) => {


        dispatch({
            type: '[TODO] Remove Todo',
            payload: id
        })
    }

    const onToggleTodo = (id: number) => {
        dispatch({
            type: '[TODO] Remove Toggle',
            payload: id
        })
    }

   


    return {
        todos,
        handleNewTodo,
        handleDeleteTodo,
        onToggleTodo,
        todosCount:todos.length,    
        pendingTodosCount:todos.filter( todo => !todo.done ).length,
        
    }
}
