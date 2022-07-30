//The login action passes the token as a payload to the reducer, but the logout action doesn’t.
export function login(token) {
  console.log("logging in"+token.tokenId)
  return (dispath) => {
    dispath({
      type: "LOGIN",
      payload: token,
    });
  };
}

export function logout() {
  console.log("Logging out");
  return (dispath) => {
    dispath({
      type: "LOGOUT",
      payload: "",
    });
  };
}
