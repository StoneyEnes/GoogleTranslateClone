import { createSlice } from '@reduxjs/toolkit';

export const LanguageSlice = createSlice({
    name: 'lang',
    initialState: {
        selectedLanguage: 'en',
    },
    reducers: {
        setLang: (state, action) => {
            state.selectedLanguage = action.payload;
        }
    }
});

// Action creators are generated for each case reducer function
export const { setLang } = LanguageSlice.actions;

export default LanguageSlice.reducer;
