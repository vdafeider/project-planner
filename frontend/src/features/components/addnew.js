import React, {useState} from 'react';

export default function AddNew() {
  const [title, setTitle] = useState ("")
  const [description, setDescription] = useState ("")
  const [rerender, setRerender] = useState(false);

  const handleAddNew= () => {
    try {
      fetch(`/api/?title=${title}&description=${description}`, 
      {method: "POST"})
      .then((r) => {
        setRerender(!rerender);
      })
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <div >
      <form className="addNewPrj">
        <h2 className='addNewPrj__h2'>ADD NEW PROJECT:</h2>
        <label htmlFor="title">Title:
          <input 
            type="text"
            id='title'
            className='addNewPrj__form-input'
            onChange={(e) => setTitle(e.target.value)} value={title} />
        </label>
        <label htmlFor="model">Description:
          <input 
            type="text"
            id='description'
            className='addNewPrj__form-input'
            onChange={(e) => setDescription(e.target.value)} value={description} />
        </label>
        <button className='addNewPrj__form-addbtn' onClick={handleAddNew}>Add</button>
      </form>
    </div>
  );
}