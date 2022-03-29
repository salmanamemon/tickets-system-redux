import axios from "axios";

export const getAllTickets = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.get('http://127.0.0.1/a)TicketSystem/crm-frontend-before-redux-toolkit/api/v1/ticket/tickets.php',
            {
                headers:{
                    "content-type": "application/json; charset=UTF-8",
                    Authorization: sessionStorage.getItem("authToken"),
                },
            });
            resolve(result);
        } catch (error) {
            reject(error)
        }
    })
}

export const getSingleTicket = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.get('http://127.0.0.1/a)TicketSystem/crm-frontend-before-redux-toolkit/api/v1/ticket/singleticket.php?id='+id,
            {
                headers:{
                    "content-type": "application/json; charset=UTF-8",
                    Authorization: sessionStorage.getItem("authToken"),
                },
            });
            resolve(result);
        } catch (error) {
            console.log(error.message)
            reject(error)
        }
    })
}

export const updateReplyTicket = (id, msgObj) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.post('http://127.0.0.1/a)TicketSystem/crm-frontend-before-redux-toolkit/api/v1/ticket/singleticketinsert.php?id='+id,
            {
                headers:{
                    "content-type": "application/json; charset=UTF-8",
                    Authorization: sessionStorage.getItem("authToken"),
                },
                msgObj,
            });
            
            //console.log(result.data);
            resolve(result.data);
        } catch (error) {
            console.log(error.message)
            reject(error)
        }
    })
}

export const updateTicketStatusClosed = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.post('http://127.0.0.1/a)TicketSystem/crm-frontend-before-redux-toolkit/api/v1/ticket/singleticketupdatestatus.php?id='+id,
            {
                headers:{
                    Authorization: sessionStorage.getItem("authToken"),
                },
            });
            
            //console.log(result.data);
            resolve(result.data);
        } catch (error) {
            console.log(error.message)
            reject(error)
        }
    })
}