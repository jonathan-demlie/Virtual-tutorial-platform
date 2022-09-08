import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  score: 0,
}



export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    changeScore:(state)=>{
        state.score+=1
    },
    reset: (state) => {
        state.score=0
    },
  },
})

export const { changeScore,reset } = quizSlice.actions
export default quizSlice.reducer
