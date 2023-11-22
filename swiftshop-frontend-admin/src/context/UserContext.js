import React, { useState } from "react";
import { GetLoggedInUserDetails } from "../services/Helper";

const UserContext = React.createContext();

//This is custom user provider which helps to manipulate actual Provider value with the help of state
function UserProvider(props) {
  const [userContextState, setUserContextState] = useState(GetLoggedInUserDetails());

  return (
    <UserContext.Provider value={{ userContextState:userContextState, setUserContextState: setUserContextState}}>
      {props.children}
    </UserContext.Provider>
  );
}

export { UserProvider  }; //named export 
export default UserContext; //default export
