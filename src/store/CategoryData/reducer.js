import { categories, sub_categories } from "./CategoryStore";
import { CATEGORY_API_ERROR, UPDATE_CATEGORY_LIST ,UPDATE_SUB_CATEGORY_LIST,CLEAR_CATEGORY_ERROR} from "./actionType";


const initialState = {
    categories,
    sub_categories,
    error:''
}

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CATEGORY_LIST: {
            const { results } = action.payload;
            state.categories = [];
            state.categories = [...state.categories,...results]
            return state;
        }
        case UPDATE_SUB_CATEGORY_LIST: {
            const { results } = action.payload;
            state.sub_categories = [];
            state.sub_categories = [...state.sub_categories,...results]
            return state;
        }
        case CATEGORY_API_ERROR: {
            console.log("api error payload", action.payload)
            state.error = { ...state.error, error:action.payload, loading: true };
            console.log("innside api error", state.error);
            return state;
        }
        case CLEAR_CATEGORY_ERROR: {
            state.error = { ...state.error, loading:action.payload};
            }
        default: {
             return state; // We return the default state here
            }
    }
    
}
export default categoryReducer;