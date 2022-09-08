import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import aboutService from './aboutService'

const initialState = {
  about: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// create education 
export const create = createAsyncThunk(
  'about/create',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await aboutService.create(data, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// show education 
export const show = createAsyncThunk(
  'about/show',
  async (id, thunkAPI) => {
    try {
      return await aboutService.show(id)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const update = createAsyncThunk(
  'about/update',
  async (id, data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await aboutService.update(id, data, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const aboutSlice = createSlice({
  name: 'about',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(create.pending, (state) => {
        state.isLoading = true
      })
      .addCase(create.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.about = action.payload
      })
      .addCase(create.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(show.pending, (state) => {
        state.isLoading = true
      })
      .addCase(show.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.about = action.payload
      })
      .addCase(show.rejected, (state, action) => {
        state.isLoading = false
        state.message = action.payload
      })
      .addCase(update.pending, (state) => {
        state.isLoading = true
      })
      .addCase(update.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.about = action.payload
      })
      .addCase(update.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = aboutSlice.actions
export default aboutSlice.reducer