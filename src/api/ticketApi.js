import axios from "axios";

export const getAllTickets = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.get('http://127.0.0.1/a)TicketSystem/crm-frontend-before-redux-toolkit/api/v1/tickets.php',
            {
                headers:{
                    "content-type": "application/json; charset=UTF-8",
                    //'content-type': 'multipart/form-data'
                },
            });
            resolve(result);
        } catch (error) {
            reject(error)
        }
    })
}