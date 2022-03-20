import { propertyUnitData, unitTransactions, unitDetails } from './PropertyUnitStore'


const initialState = {
    propertyUnitData,
    unitTransactions,
    unitDetails
}
  
const propertyUnitReducer = (state = initialState, action) => {
    switch (action.type) {
      default: {
        return state // We return the default state here
      }
    }
}
  
export default propertyUnitReducer