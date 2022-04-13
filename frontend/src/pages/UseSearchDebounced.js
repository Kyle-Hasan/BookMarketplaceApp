import {useState} from 'react'
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import {useAsync} from 'react-async-hook'
import useConstant from 'use-constant';
function UseSearchDebounced(search,dTime){



   
    const [input, setInput] = useState("");
  
    
    var d = useConstant(() =>
      AwesomeDebouncePromise(search, dTime)
    );
  
  
    var results = useAsync(
      async function(){
        if (input.length > 0) {
        return d(input);
          
        } else {
            return [];
          
        }
      },
      [d, input]
    );
  

    return {
      results,
      input,
      setInput,
      
    };
  



}

export default UseSearchDebounced