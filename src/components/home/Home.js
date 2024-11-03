import Sessions from "../sessions/Sessions";
import { useState, useEffect } from "react";
import { onSessionsChange } from "../../data/dataLayer";

const Home = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    onSessionsChange({callback: ({documents}) => setSessions(documents)});
  }, []);

  return (<div>
    <Sessions sessions={sessions} />
  </div>);
};

export default Home;
