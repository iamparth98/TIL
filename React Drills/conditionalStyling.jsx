import React from "react";
import { useState } from "react";

function ProgressBar ({percent}){
    return (
        <div style={{background : gray, width: '100%'}} className="div">
            <div style={{width: `${percent}%`}} className="div">

            </div>
        </div>
    )
}

function TagList (){
    const [arr,setArr] = useState(["react", "Angular", "vue"]);
    const handleDelete = (itemToDelete)=>{
        setArr(arr.filter((curr)=>
            curr !== itemToDelete
        ))
    }
    return(
        <div className="div">

            {arr.map((item)=>(
                <button key={item} onClick={()=>{handleDelete(item)}}>{item}</button>
            ))}
        </div>
    )
}

function UserProfile(){
    const [user, setUser] = useState({name: john, age: 25})
    return (
        <div className="">
            Name : {user.name}
            Age : {user.age}
            <button>Birthday</button>
            <button>rename</button>
        </div>
    )
}