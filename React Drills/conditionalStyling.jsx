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
    const [user, setUser] = useState({name: 'John', age: 25})
    function increaseAge(){
        
        setUser({...user, age: user.age+1})
    }
    function changeName(){

        setUser({...user, name: "Doe"} )
    }
    return (
        <div className="">
            Name : {user.name}
            Age : {user.age}
            <button onClick={increaseAge}>Birthday</button>
            <button onClick={changeName}>rename</button>
        </div>
    )
}

function LightSwitch(){
const [settings,setSettings] = useState({id: 1, isOn: false, location: 'Kitchen'})

return(
    <>
        <div className="div">The Kitchen Light is {settings.isOn ? 'on'  : 'off'}</div>
        <button onClick={()=>{setSettings({...settings, isOn: !settings.isOn})}}>Toggle</button>
    </>
)
}


function ShoutBox (){
    const [text,setText] = useState("");
    const handleChange = (e) =>{
        setText(e.target.value.toUpperCase());
        
    }
    return(
        <div className="input">
            <input value = {text} type="text" onChange={(e)=>{handleChange(e)}} />
        </div>
    )
}

function NoSpaceInput(){
    const [val,setVal] = useState('');
    function handleChange(e){
        setVal(e.target.value.replaceAll(' ',""))
    }

    return (
        <div className="div">
            <input value = {val} type="text" onChange={(e)=>{handleChange(e)}} />
        </div>
    )
}

function FullName(){
    const [form,setForm] = useState({first:"", last:''})
    return(
        <div className="">
            <input value = {form.first} onchange = {handleNameChange} type="text" />
            <input value = {form.last} onchange = {handleNameChange} type="text" />
            <p>Hello {form.first}{form.last}</p>
        </div>
    )
}