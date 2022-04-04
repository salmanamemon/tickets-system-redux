import { configureStore } from '@reduxjs/toolkit';

import ticketsReducer from './pages/ticket-list/ticketsSlice';
import loginReducer from "./components/login/loginSlice";
import userReducer from "./pages/dashoard/userSlice";
import newTicketReducer from "./components/add-ticket-form/addTicketSlicer";
import registerReducer from "./components/signup/signupSlice";

const store = configureStore({ 
    reducer: {
        tickets: ticketsReducer,
        login: loginReducer,
        user: userReducer,
        openTicket: newTicketReducer,
        register: registerReducer,
    } 
});

export default store;