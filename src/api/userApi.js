import axios from "axios";

const rootURL = 'http://ticket.salmanaziz.tech/api/v1/';
const loginUrl = rootURL+'login.php';
const userProfileUrl = rootURL+'user.php';
const logoutUrl = rootURL+'logout.php';

export const userLogin = (frmData) => {
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

export const fetchUser = () => {
    return new Promise (async (resolve, reject) => {

        try {

            const authToken = sessionStorage.getItem('authToken');
            if(!authToken){
                reject("Token not found!")
            }
            
            const res= await axios.get(userProfileUrl, 
                { 
                    headers: {"Authorization" : `${authToken}`} 
                }
            )
            //console.log(res);
            resolve(res.data);

            if(res.data.status === "success"){
                sessionStorage.setItem('authToken', res.data.token);
                //console.log(res.data.token)
            }

        } catch (error) {
            console.log(error)
            reject(error.message)
        }

    });
};

export const userLogout = async () => {
    try {
        const authToken = sessionStorage.getItem('authToken');
        if(!authToken){
            console.log("Token not found!")
        }
        await axios.get(logoutUrl,
        { 
            headers: {"Authorization" : `${authToken}`} 
        })
    } catch (error) {
        console.log(error)
    }
}