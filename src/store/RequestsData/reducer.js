import { requestData } from './RequestsStore'


const initialState = {

  requestData,
}

const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state // We return the default state here
    }
  }
}

export default requestReducer
