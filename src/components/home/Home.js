import SessionList from "../sessions/SessionList";
import ParticipantForm from "../particpants/ParticipantForm";
import { useState, useEffect } from "react";
import { onSessionsChange } from "../../data/dataLayer";

const Home = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    onSessionsChange({callback: ({documents}) => setSessions(documents)});
  }, []);

  return (
    <div>
      <div className="flex column gap-sm padding-left-right-sm">
        <div className="flex center padding-top-bottom-md">
          <div className="text size-xxl">Sessions</div>
        </div>

        {/* <div className="text size-xs"><pre>{JSON.stringify(sessions, null, 2)}</pre></div> */}
        <SessionList sessions={sessions} />
      </div>

      <div className="padding-top-bottom-md">
        <ParticipantForm />
      </div>
    </div>
    );
};

export default Home;
