
import React, { useState } from 'react';
import { createIngredient } from '../../store/ingredients';
import { useDispatch, useSelector } from 'react-redux';

function Items(){
    const dispatch = useDispatch()
    // const items = useSelector(state=>state.ingredients)
    const [name,setName] = useState('')
    const [category,setCategory] = useState('')
    const [ozInCup,setOzInCup]=useState('')


    const handleSubmit = (e)=>{
        e.preventDefault()
        return dispatch(createIngredient({name, category, ozInCup}))
    }

    return(
        <>
        <form onSubmit={handleSubmit}>
        <label>
            Name
            <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            />
        </label>
        <label>
            Category
            <input 
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            />
        </label>
        <label>
            Name
            <input 
            type="number"
            value={ozInCup}
            onChange={(e) => setOzInCup(e.target.value)}
            required
            />
        </label>
        <button type="submit">Add</button>
        </form>
        
        
        </>
    )
}

export default Items