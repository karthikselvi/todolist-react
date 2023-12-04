import React, { useEffect, useState } from 'react'
import './Todo.css';

function Content() {
    const [todolist,settodolist]=useState([]);
    const [newTitle,setTitle]=useState("");
    const [newDescription,setDescription]=useState("");
    const [editId,setEditid]=useState(0);

    const addHandler=()=>{
        let newTodoitem={
            title:newTitle,
            description:newDescription
        }
        if (editId){
            const edittodo=todolist.find((i)=>i.index !==editId);
            const updatetodo=todolist.map((t)=>t.index===edittodo.index ?
            (t={index:t.index,newTitle}):{index:t.index,newTitle:t.newTitle});
            settodolist(updatetodo);
            setEditid(0);
            setTitle("");
            setDescription("");
            return;
        }
        let updatedTodoArr=[...todolist];
        updatedTodoArr.push(newTodoitem);
        settodolist(updatedTodoArr);
        localStorage.setItem("TODO LIST",JSON.stringify(updatedTodoArr));
        setTitle("");
        setDescription("")
    };

    const editHandler=(index)=>{
        let findTitle=todolist.find((list)=>list.index !== index);
        setTitle(findTitle.title);
        let findDescription=todolist.find((list)=>list.index!==index);
        setDescription(findDescription.description);
        setEditid(index+1)
    };
    

    const deleteHandler=(index)=>{
        let reducedList=[...todolist];
        reducedList.splice(index,1);

        localStorage.setItem("TODOLIST",JSON.stringify(reducedList));
        settodolist(reducedList)
    };
    useEffect(()=>{
        let savetodo=JSON.parse(localStorage.getItem("TODOLIST"));
    
    if (savetodo){
        settodolist(savetodo);
    }
   },[] )
  return (
    <div className='header '>
      <div className='todo'>
            <h3 style={{textAlign:'center'}}>My Todos</h3>
        <div className='container'>
            <input type="text"  placeholder='todo name' value={newTitle}
          onChange={(e)=>{setTitle(e.target.value)}} name='taskname' style={{width:400}} required/>
            <input type="text"  placeholder='todo name' value={newDescription}
          onChange={(e)=>{setDescription(e.target.value)}} name='taskname' style={{width:400}}required/>
            {/* <button className='btn' onClick={handlesave}>Add to do</button> */}
            <button  onClick={addHandler} className='butt'>{editId ? 'update':'Add todo'}</button>
        </div>
 
            <div className='btnarea'>
                <h4>My Todos</h4>
                <h4>Status Filter:
                    <select style={{fontSize:15, backgroundColor:'pink'}}>
                        <option>All</option>
                        <option>Completed</option>
                        <option>Not completed</option>
                    </select>
                </h4>
            </div>
      </div> 
      <div className='cardholder'>
      {todolist.map((item,index)=>
      {
        return(
            <div >
    <div key={index} class='card'>
         <div class='card-body' >
            <div class='card-text'>
                <p>Name:{item.title}</p>
                <p>Description:{item.description}</p>
                <p>status
                    <select>
                        <option>All</option>
                        <option>Completed</option>
                        <option>Not completed</option>
                    </select>
                </p>
            </div>
            <button onClick={()=>editHandler(index)} className='btn btn-success m-4'>Edit</button>
            <button onClick={()=>deleteHandler(index)}className='btn btn-danger m-4 bg-danger'> Delete</button>
        </div>
     </div>
    </div>

 )
     })}
     </div>
    </div>
  )
}

export default Content