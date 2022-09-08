import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import educationService from './educationService'

const initialState = {
  education: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// create education 
export const create = createAsyncThunk(
  'education/create',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await educationService.create(data, token)
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
  'education/show',
  async (id, thunkAPI) => {
    try {
      return await educationService.show(id)
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
  'education/update',
  async (id, data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      const response = await educationService.update(id, data, token)
      return response.data.user
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

// delete education 
export const remove = createAsyncThunk(
  'education/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await educationService.remove(id, token)
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

export const educationSlice = createSlice({
  name: 'education',
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
        state.education = action.payload
      })
      .addCase(create.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.education = null
      })
      .addCase(show.pending, (state) => {
        state.isLoading = true
      })
      .addCase(show.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.education = action.payload
      })
      .addCase(show.rejected, (state, action) => {
        state.isLoading = false
        state.message = action.payload
        state.education = null
      })
      .addCase(update.pending, (state) => {
        state.isLoading = true
      })
      .addCase(update.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.education = action.payload
      })
      .addCase(update.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(remove.pending, (state) => {
        state.isLoading = true
      })
      .addCase(remove.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.education = action.payload
      })
      .addCase(remove.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = educationSlice.actions
export default educationSlice.reducer