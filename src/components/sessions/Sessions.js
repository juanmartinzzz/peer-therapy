import AppBar from "../appbar/appBar";
import SessionList from "./SessionList";
import SessionForm from "./SessionForm";
import { useEffect, useState } from "react";
import { onSessionsChange } from "../../data/dataLayer";
import { sessionTemplate } from "../../data/entities";

const Sessions = () => {
  const [session, setSession] = useState();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    onSessionsChange({callback: ({documents}) => setSessions(documents)});
  }, []);

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
