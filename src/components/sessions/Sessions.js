
import auth from "../../data/auth";
import SessionList from "./SessionList";
import NewSessionForm from "./NewSessionForm";
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

  return (
    <div>
      <div className="flex column gap-sm padding-left-right-sm">
        <div className="flex center padding-top-bottom-md">
          <div className="text size-xxl">Manage Sessions & Groups</div>
        </div>

        {/* <div className="text size-xs"><pre>{JSON.stringify(sessions, null, 2)}</pre></div> */}
        <SessionList sessions={sessions} isAdmin={true} />
      </div>

      {auth.isAdmin() && (
        <div>
          <div className="flex center padding-md">
            <div className="flex center circle size-lg action-element" onClick={() => setShowNewSessionForm(true)}>
              <div className="text size-xxl line-height-xxs center">n<br/>e<br/>w</div>
            </div>
          </div>
        </div>
      )}

      {showNewSessionForm && <NewSessionForm session={session} setSession={setSession} setShowNewSessionForm={setShowNewSessionForm} />}
    </div>
  );
};

export default Sessions;
