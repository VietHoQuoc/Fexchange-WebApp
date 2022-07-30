// import jwt from "jsonwebtoken";
// import axios from "axios";

// export async function UserIsValid(token) {
//   let bodyFormData = new FormData();
//   bodyFormData.append("tokenId", token);
//   const responseToken = await axios({
//     method: "POST",
//     url: process.env.REACT_APP_API_URL + "/login/google",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     data: { tokenId: token },
//   })
//     .then((res) => {
//       console.log(res.data);
//       return res.data.token;
//       // console.log(res.data)
//     })
//     .catch((err) => {
//       console.log(err);
//     });

//   var decodedToken = jwt.decode(responseToken);
//   var dateNow = new Date();
//   if (decodedToken.exp > dateNow.getTime() / 1000) return responseToken;
//   else return false;
// }

import jwt from 'jsonwebtoken';

export function UserIsValid(token) {
    console.log('the token is ' + token.user);
    if (token.isAuthenticated) {
        var decodedToken = jwt.decode(token.user);
        var dateNow = new Date();
        if (decodedToken.exp > dateNow.getTime() / 1000) return true;
        else return false;
    }
    return false;
}
