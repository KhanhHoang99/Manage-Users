import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import { loginApi } from '../../services/userService'


// First, create the thunk
export const handleUserLoginRedux = createAsyncThunk(
  'users/handleUserLogin',
  async (email, password) => {
    let res = await loginApi(email.trim(), password);
    
    // console.log('res: ', res);
    if(res.status === 400) {
        toast.error(res.data.error);
        return res.data
    }
    return res;
  }
)


const initialState = {
  email: '',
  auth: false,
  isLoading: false,
  isError: false,
  token: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    handleLogOut: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      state.email = '';
      state.token = '';
      state.auth = null;
    },
    handleRefresh: (state, action) => {

      console.log('action: ', action);
      state.email = action.payload.email;
      state.auth = true;
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
        .addCase(handleUserLoginRedux.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(handleUserLoginRedux.fulfilled, (state, action) => {
            //console.log(action);
            if(action.payload.token) {
              localStorage.setItem('token', action.payload.token);
              localStorage.setItem('email', action.meta.arg);
              state.email = action.meta.arg;
              state.token = action.payload.token;
              state.auth = true;
            }
            state.isLoading = false;
            state.isError = false;    
        })
        .addCase(handleUserLoginRedux.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true; 
        })
  },
})

// Action creators are generated for each case reducer function
export const {handleLogOut, handleRefresh} = userSlice.actions

export default userSlice.reducer