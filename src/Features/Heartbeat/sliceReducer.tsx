import { createSlice } from 'redux-starter-kit';

const initialState = {
  currentData: 0,
  pastData: 0,
};

const slice = createSlice({
  name: 'heartbeat',
  initialState,
  reducers: {
      timestamp: (state, action) => {
        state.currentData = action.payload;
        state.pastData = action.payload - 180000;
      }
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
