
import auth from "../../data/auth";
import SessionList from "./SessionList";
import NewSessionForm from "./NewSessionForm";
import ParticipantForm from "../particpants/ParticipantForm";
import { useEffect, useState } from "react";
import { sessionTemplate } from "../../data/entities";
import { onSessionsChange } from "../../data/dataLayer";

const Sessions = () => {
  const [session, setSession] = useState(sessionTemplate);
  const [sessions, setSessions] = useState([]);
  const [showNewSessionForm, setShowNewSessionForm] = useState(false);

  useEffect(() => {
    onSessionsChange({callback: ({documents}) => setSessions(documents)});
  }, []);

  const NewSessionButton = ({setShowNewSessionForm}) => (
    <div className="flex center padding-md">
      <div className="flex center circle size-lg action-element" onClick={() => setShowNewSessionForm(true)}>
        <div className="text size-xxl line-height-xxs center">n<br/>e<br/>w</div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex column gap-sm padding-left-right-sm">
        <div className="flex center padding-top-bottom-md">
          <div className="text size-xxl">Sessions & Groups</div>
        </div>

        <SessionList sessions={sessions} />
      </div>

      {auth.isAdmin() && (
        <NewSessionButton setShowNewSessionForm={setShowNewSessionForm} />
      )}

      <div className="padding-top-bottom-md">
        <ParticipantForm />
      </div>

      {showNewSessionForm && <NewSessionForm session={session} setSession={setSession} setShowNewSessionForm={setShowNewSessionForm} />}
    </div>
  );
};

export default Sessions;
