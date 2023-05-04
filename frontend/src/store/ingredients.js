// import ingredient from '../../../backend/db/models/ingredient';
import { csrfFetch } from './csrf';

const ADD_INGREDIENT = 'session/addIngredient'

const addIngredient=(ingredient)=>{
    return {
        type: ADD_INGREDIENT,
        payload: ingredient
    }
}

export const createIngredient = (ingredient) => async(dispatch)=>{
    const { name, category, ozInCup} = ingredient;
        const response = await csrfFetch('/api/ingredients',{
            method:'POST',
            body: JSON.stringify({ 
                name,
                category,
                ozInCup
            }),
        })
        const data = await response.json();
        dispatch(addIngredient(data.ingredient))
        return response;
}
const initialState = { ingredients: null };
const itemReducer = (state=initialState, action)=>{
    let newState;
    switch (action.type){
        case ADD_INGREDIENT:
            newState = Object.assign({}, state);
            newState.ingredients = action.payload;
        break
        default:
            return state;

    }
}
export default itemReducer