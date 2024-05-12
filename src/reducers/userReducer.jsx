import Cookies from "js-cookie";

function userReducer(
  state = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
  action
) {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return null;
    case "UPDATERPICTURE":
      return { ...state, picture: action.payload };
    case "VERIFY":
      return { ...state, verified: action.payload };

    default:
      return state;
  }
}

export default userReducer;
