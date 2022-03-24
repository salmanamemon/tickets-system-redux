import { configureStore } from '@reduxjs/toolkit';

import ticketsReducer from './pages/ticket-list/ticketsSlice';
import loginReducer from "./components/login/loginSlice";
import userReducer from "./pages/dashoard/userSlice";

const store = configureStore({ 
    reducer: {
        tickets: ticketsReducer,
        login: loginReducer,
        user: userReducer,
    } 
});

export default store;