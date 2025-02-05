import { configureStore, createSlice } from '@reduxjs/toolkit';

const loadUserData = () => {
    const storedData = localStorage.getItem('userData');
    return storedData ? JSON.parse(storedData) : [];
};

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: loadUserData(),
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
            localStorage.setItem('userData', JSON.stringify(state.userData));
        },
        addUserData: (state, action) => {
            state.userData.push(action.payload);
            localStorage.setItem('userData', JSON.stringify(state.userData));
        },
    },
});

export const { setUserData, addUserData } = userSlice.actions;

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
    },
});

export default store;
    