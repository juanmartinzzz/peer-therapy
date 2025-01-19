import { userTemplate } from "./entities";

const isAdmin = () => {
  // If the window location includes the admin hash
  return window.location.pathname.includes(process.env.REACT_APP_ADMIN_HASH);
}

const isModerator = () => {
  // If the window location includes /74m92rfp07uc43kjj
  return window.location.pathname.includes('/74m92rfp07uc43kjj');
}

/**
 * @returns {userTemplate}
 */
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
  isAdmin,
  updateUser,
  isModerator,
  addSessionToUser,
};

export default auth;
