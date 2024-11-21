import auth from "../../data/auth";
import AppBar from "../appbar/AppBar";
import SessionList from "./SessionList";
import SessionForm from "./SessionForm";
import { useEffect, useState } from "react";
import { dataLayer } from "../../data/dataLayer";

const Sessions = () => {
  const [session, setSession] = useState();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    dataLayer.session.onSessionsChange({callback: ({documents}) => setSessions(documents)});
  }, []);

  if(!auth.isAdmin()) {
    return <div>Sorry! You are not an admin. Please use the admin link to have admin powers.</div>;
  }

  return (
    <>
      <AppBar />
      <div className="flex column gap-sm padding-left-right-sm">
        <div className="flex center padding-top-bottom-md">
          <div className="text color-main bold size-xxl">Manage Sessions</div>
        </div>

        <SessionList sessions={sessions} setSession={setSession} />
      </div>

      <SessionForm sessionToEdit={session} setSessionToEdit={setSession} />
    </>
  );
};

export default Sessions;
