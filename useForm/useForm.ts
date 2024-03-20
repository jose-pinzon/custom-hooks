import { useState } from "react"

// !Este hook tiene como funcion pasarle el value al input y almacenar dicho dato 

// De parametro se espera los datos que tendra el formulario en forma de objeto
export const useForm = <T>(inicialForm:T ) => {

    const [ formState, setFormState ] = useState(inicialForm) 

    const onInputChange = ( { target }:React.ChangeEvent<HTMLInputElement> ) => {

      // no hay que olvidar colocar el name en el input, para saber al cual de todos se refiere
        const { name, value } = target
        setFormState({
            ...formState,
            [ name ]:value
        })
    }

    const onResetForm = () => {
        setFormState( inicialForm )
    }


  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm
  }

}
