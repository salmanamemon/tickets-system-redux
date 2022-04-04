//import {signupPending, signupSuccess, signupFail} from './signupSlice';
//import { userSignup } from "../../api/userApi";

// export const signupUser = (signupFrmData) => dispatch => {
//     return new Promise(async(resolve, reject) => {
//         try {
//             dispatch(signupPending())

//             // Call API
//             const result = await userSignup(signupFrmData);

//             if(result.status === "error"){
//                 return dispatch(signupFail(result.message))
//             }
//             console.log(result);
//             dispatch(signupSuccess(result.message));


//         } catch (error) {
//             console.log(error);
//             dispatch(signupFail(error.message));
//         }
//     })
// }