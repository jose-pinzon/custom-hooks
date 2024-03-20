import { useState } from "react"



export const useCounter = ( initialValue:number = 10 ) => {

    const [ counter, setCounter ] = useState<number>(initialValue)
    
     const increment = (value:number = 1) => {
        setCounter( (current) => current + value)
     }

     const decrement = (value:number = 1) => {
        if (  counter === 0 )  return 
        setCounter(counter - value)
     }

     const reset = () => {
        setCounter( initialValue )
     }

    return{
        counter,
        increment,
        decrement,
        reset
    }

}