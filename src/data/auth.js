import { userTemplate } from "./entities";

const getUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    const newUser = {
      ...userTemplate,
      id: crypto.randomUUID(),
    };

    localStorage.setItem("user", JSON.stringify(newUser));
    return newUser;
  }

  return user;
};

const addSessionToUser = ({sessionId}) => {
  const user = getUser();

  // prevent duplicates
  if(user.sessions.includes(sessionId)) {
    return;
  }

  user.sessions.push(sessionId);
  localStorage.setItem("user", JSON.stringify(user));
}

const updateUser = ({user}) => {
  const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
  const updatedUser = {...userFromLocalStorage, ...user};
  localStorage.setItem("user", JSON.stringify(updatedUser));
}

const auth = {
  getUser,
  updateUser,
  addSessionToUser,
};

export default auth;
