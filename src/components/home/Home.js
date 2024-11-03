import Sessions from "../sessions/Sessions";
import { useState, useEffect } from "react";
import { sessionTemplate } from "../../data/entities";
import { onSessionsChange } from "../../data/dataLayer";

const Home = () => {
  const [session, setSession] = useState(sessionTemplate);
  const [sessions, setSessions] = useState([]);
  const [showNewSessionForm, setShowNewSessionForm] = useState(false);

  useEffect(() => {
    onSessionsChange({callback: ({documents}) => setSessions(documents)});
  }, []);

  return (<div>
    <Sessions sessions={sessions} />
  </div>);
};

export default Home;
