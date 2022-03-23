import axios from 'axios';

import {
    fetchTicketLoading,
    fetchTicketSuccess,
    fetchTicketFail,
    searchTickets,
} from './ticketsSlice';

export const fetchAllTickets = () => async (dispatch) => {
    dispatch(fetchTicketLoading());
    // Fetch the Data From API
    try{
        const result = await axios.get('http://127.0.0.1/a)TicketSystem/crm-frontend-before-redux-toolkit/api/v1/tickets.php',
        {
            headers:{
                "content-type": "application/json; charset=UTF-8",
                //'content-type': 'multipart/form-data'
            },
        });
        console.log(result.data)
        dispatch(fetchTicketSuccess(result.data))
        
    } catch(error){
        dispatch(fetchTicketFail(error.message));
    }
}

export const filterSearchTicket = (str) => async (dispatch) => {
    dispatch(searchTickets(str))
}