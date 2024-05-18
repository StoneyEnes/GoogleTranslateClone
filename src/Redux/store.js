import { configureStore } from '@reduxjs/toolkit'
import LanguageReducer from "./Slicer/Language.jsx";

export default configureStore({
    reducer: {
        language: LanguageReducer
    }
})