import { useEffect, useState } from "react"
import { PokeAPII } from '../Interfaces/pokeApi';

export interface dataI{
    data:PokeAPII | null;
    isloading:boolean;
    hasError:boolean;
    error:error | null 
} 



type error = {
    code:number
    message:string
}


const localCache:PokeAPII[] = []


export const useFetch = ( url:string ) => {

    const [state, setstate] = useState<dataI>({
        data:null,
        isloading:true,
        hasError:false,
        error:null
    })

    useEffect(() => {
        getFetch()

    },[url])/* aqui podemos colocar que este pendiente que un elemento cambie para que vuelava a cargar */

    
    const setLoadingState = () => {
        
        setstate({
            data:null,
            isloading:true,
            hasError:false,
            error: null
        })
    }


    const getFetch = async(  ) => {
        if( localCache[url]){

            console.log(localCache)
            console.log('Usando cache')
            setstate({
                data:localCache[url],
                isloading:false,
                hasError:false,
                error:null
            })
            return;
        }
    
        setLoadingState();

        const resp = await fetch(url )
        // sleep este es solo para retrazar un poco la promesa
        await new Promise( resolve => setTimeout( resolve, 1500))

        if ( !resp.ok) {
            setstate({
                data:null,
                isloading:false,
                hasError:true,
                error:{
                    code:resp.status,
                    message:resp.statusText
                }
            
            });
            return
        }
        
        const data = await resp.json()
        setstate({
            data,
            isloading:false,
            hasError:false,
            error: null
        })
        /*
        !Esto se veria de la siguiente manera:
        ?"https://pokeapi.co/api/v2/pokemon/11": Object { base_experience: 72, height: 7, id: 11, … }
        */
        localCache[url] = data;
    }



  return {
    data:state.data,
    isloading:state.isloading,
    hasError:state.hasError
  }
}
