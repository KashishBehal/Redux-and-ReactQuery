import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { decrement, increment , incrementAmount, reset } from './features/counter/counterSlice';
import { useState } from 'react';
import {useQuery , useMutation} from "@tanstack/react-query"
//fetch data from api and handle all things reated to fetching the data
//fetch api and the axios only fetch the data but the reactquery also manages the dta and the funcitons related to it

function App() {
  const count=useSelector((state)=>state.counter.value);
  const [Amount , setAmount]=useState(0);
  const dispatch=useDispatch();
  function handleInc(){
  dispatch(increment());
  }
  function handleDec(){
dispatch(decrement());
  }
  function handleReset(){
    dispatch(reset());
  }
  function handleA(){
    dispatch(incrementAmount(Amount))
  }



  const {data , error ,isLoading}=useQuery({
    queryKey:["todo"] ,
    queryFn:()=>
      fetch("https://jsonplaceholder.typicode.com/posts").then((res)=>
       res.json())
  })

  const {mutate , isPending ,isSuccess , isError}=useMutation({
    mutationFn:(newPost)=>
      fetch("https://jsonplaceholder.typicode.com/posts" ,{
        method:"POST" ,
        body:JSON.stringify(newPost),
      }
      ).then((res)=>res.json()),
  }
  )

  if(error || isError) return <div>There was an error</div>
  if(isLoading || isPending) return <div> THE DATA IS LOADING...</div>
if(isSuccess) return <div>Completed</div>



  return (
    <div className="App">
     <div className='a'> <p>Redux State Management</p>
     <button onClick={handleInc}>+</button>
     <p>Count: {count}</p>
     <button onClick={handleDec}>-</button>
     <br/>
     <button onClick={handleReset}>Reset</button>
     <br/>
     <input
     type='number' value={Amount} placeholder='enter amount to add'
     onChange={(e)=>setAmount(e.target.value)}></input>
     <br/>
     <button onClick={handleA}>Add Amount</button>
    </div><div className='b'>
    
<button 
onClick={()=>mutate({
  userId:5000 ,
  id:4000
})}>ADD CONTENT</button>

    {data?.map((todo)=>(<div>
      <h4>ID: {todo.id}</h4>
      <h4>TITLE: {todo.title}</h4>
    </div>))}
    </div>
    </div>
  );
}

export default App;
//ReactQuery is not just a data fetching solution but also state management solution
