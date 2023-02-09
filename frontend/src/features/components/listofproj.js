import React, { useEffect, useState } from 'react';

export default function ListOfProj() {
    const [id, setId] = useState(0);
    const [listProj, setListProj] = useState (['loading']);
    const [rerender, setRerender] = useState(false);
    const [title, setTitle] = useState ("")
    const [description, setDescription] = useState ("");

    useEffect(() => {
        fetch('/api')
        .then(response => response.json())
        .then((response) => { setListProj(response)})
    },[rerender])

    const deleteElement =(event)=>{
        try {
            fetch(`/api/${event.target.id}`, 
            {method: "DELETE"})
            .then((r)=>setRerender(!rerender));
        } catch(error) {
            console.error(error);
        }
    }

    function editViewFn (e) {
        setId(e.currentTarget.id);
        setTitle(listProj[e.currentTarget.id-1].title)
        setDescription(listProj[e.currentTarget.id-1].description)
        setRerender(!rerender);
    }

    const modifyElement =(event)=>{
        try {
            fetch(`/api/?id=${event.target.id}&title=${title}&description=${description}`, 
            {method: "PUT"})
            .then((r) => {
                setRerender(!rerender);
            })
            setId(0);
          } catch(error) {
            console.error(error);
          }
    }

    const DrawListProj = listProj.map((element,index) => {
        if (index+1==id) {
            return <li key={index}className="listOfProj__ul-liEdit">
            <label>Title:<input value={title} onChange={(e) => setTitle(e.target.value)}/></label>
            <label>Description:<input value={description} onChange={(e) => setDescription(e.target.value)}/></label>
            <button id={element.id} onClick={modifyElement}>Save</button>
            </li>
        }else{
            return <li key={index} className="listOfProj__ul-li">
            {`${element.title} - ${element.description}`}
            <span id={element.id} style={{color:'yellow', fontSize:'20px'}} onClick={editViewFn}>✎</span>
            <span id={element.id} onClick={deleteElement}>❌</span>
            </li>}
    });

    return (
        <div className="listOfProj">
            <h2>List</h2>
            <ul className='listOfProj_ul'>
                {DrawListProj}
            </ul>
        </div>
      );
}