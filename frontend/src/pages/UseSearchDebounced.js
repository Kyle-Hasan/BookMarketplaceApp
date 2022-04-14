import {useState} from 'react'
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import {useAsync} from 'react-async-hook'
import useConstant from 'use-constant';
//referenced from https://stackoverflow.com/questions/23123138/perform-debounce-in-react-js
function UseSearchDebounced(search,dTime,intial){



   
    const [input, setInput] = useState(intial);
  
    
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