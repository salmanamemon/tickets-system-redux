import {
    fetchTicketLoading,
    fetchTicketSuccess,
    fetchTicketFail,
    searchTickets,
} from './ticketsSlice';

import { getAllTickets } from '../../api/ticketApi';

export const fetchAllTickets = () => async (dispatch) => {
    dispatch(fetchTicketLoading());
    // Fetch the Data From API
    try{
        const result = await getAllTickets();
        console.log(result.data)
        dispatch(fetchTicketSuccess(result.data))
        
    } catch(error){
        dispatch(fetchTicketFail(error.message));
    }
}

export const filterSearchTicket = (str) => async (dispatch) => {
    dispatch(searchTickets(str))
}