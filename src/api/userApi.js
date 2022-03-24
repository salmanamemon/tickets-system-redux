import axios from "axios";

const loginUrl = 'http://127.0.0.1/a)TicketSystem/crm-frontend-before-redux-toolkit/api/v1/login.php';

export const userLogin = frmData => {
    return new Promise (async (resolve, reject) => {

        try {
            const res= await axios.post(loginUrl, frmData)
            console.log(res);
            resolve(res.data);

            if(res.data.status === "success"){
                sessionStorage.setItem('authToken', res.data.token);
                //console.log(res.data.token)
            }

        } catch (error) {
            console.log(error)
            reject(error)
        }

    })
}