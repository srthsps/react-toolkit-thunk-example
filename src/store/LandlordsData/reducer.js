import { landlordData, landlordDetailsData } from './LandlordStore'


const initialState = {
    landlordData,
    landlordDetailsData,
}
  
const landlordReducer = (state = initialState, action) => {
    switch (action.type) {
      default: {
        return state // We return the default state here
      }
    }
}
  
export default landlordReducer