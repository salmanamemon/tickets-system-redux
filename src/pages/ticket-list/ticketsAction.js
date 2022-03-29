import {
    fetchTicketLoading,
    fetchTicketSuccess,
    fetchTicketFail,
    searchTickets,
    fetchSingleTicketLoading,
    fetchSingleTicketSuccess,
    fetchSingleTicketFail,
    replyTicketLoading,
    replyTicketSuccess,
    replyTicketFail,
    closeTicketLoading,
    closeTicketSuccess,
    closeTicketFail
} from './ticketsSlice';

import { getAllTickets, getSingleTicket, updateReplyTicket, updateTicketStatusClosed } from '../../api/ticketApi';

export const fetchAllTickets = () => async (dispatch) => {
    dispatch(fetchTicketLoading());
    // Fetch the Data From API
    try{
        const result = await getAllTickets();
        //console.log(result.data)
        dispatch(fetchTicketSuccess(result.data))
        
    } catch(error){
        dispatch(fetchTicketFail(error.message));
    }
}

export const filterSearchTicket = (str) => async (dispatch) => {
    dispatch(searchTickets(str))
}

// Action For Single Ticket
export const fetchSingleTicket = (id) => async (dispatch) => {
    dispatch(fetchSingleTicketLoading());
    // Fetch the Data From API
    try{
    const result = await getSingleTicket(id);
        //console.log(result.data)
        dispatch(fetchSingleTicketSuccess(result.data));
        
    } catch(error){
        dispatch(fetchSingleTicketFail(error.message));
    }
}

// Action For Replying on single Ticket
export const replyOnTicket = (id, msgObj) => async (dispatch) => {
    dispatch(replyTicketLoading());
    // Fetch the Data From API
    try{
        const result = await updateReplyTicket(id, msgObj);

        console.log(result.status);
        if(result.status === "error"){
          return dispatch(replyTicketFail(result.message));
        }
        dispatch(fetchSingleTicket(id));
        dispatch(replyTicketSuccess(result.message));
        
    } catch(error){
        console.log(error)
        dispatch(replyTicketFail(error));
    }
}

// Action For Replying on single Ticket
export const closeTicket = (id) => async (dispatch) => {
    dispatch(closeTicketLoading());
    // Fetch the Data From API
    try{
        const result = await updateTicketStatusClosed(id);

        console.log(result.status);
        if(result.status === "error"){
          return dispatch(closeTicketFail(result.message));
        }
        dispatch(fetchSingleTicket(id));
        dispatch(closeTicketSuccess(result.message));
        
    } catch(error){
        console.log(error)
        dispatch(closeTicketFail(error));
    }
}