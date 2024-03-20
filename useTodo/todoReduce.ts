import { stateInicialI } from "./useTodo";




export  type ActionType = 
        | { type:'[TODO] Add Todo', payload:stateInicialI }
        | { type:'[TODO] Remove Todo', payload:number }
        | { type:'[TODO] Remove Toggle', payload:number }



export const todoReducer = (initialState:stateInicialI[],  action:ActionType  ) => {

   switch ( action.type ) {
    case '[TODO] Add Todo':
        return [ ...initialState,  action.payload  ];

    case '[TODO] Remove Todo':
        return initialState.filter( todo => todo.id !== action.payload )

    case '[TODO] Remove Toggle':
        return initialState.map( todo => {
                if ( todo.id === action.payload ) {
                     return{
                        ...todo,
                        done:!todo.done
                     }
                }
           return todo;
        })
   
    default:
        return initialState;
        
   }

}