import AppBar from "../appbar/appBar";
import SessionGroupsAndParticipants from "./SessionGroupsAndParticipants";
import ParticipantBasicInfoForm from "../particpants/ParticipantBasicInfoForm";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dataLayer } from "../../data/dataLayer";

const Session = () => {
  const {sessionId} = useParams();
  const [session, setSession] = useState({});
  const [sessions, setSessions] = useState({});

  useEffect(() => {
    dataLayer.session.onSessionsChange({callback: ({documents}) => {
      setSessions(documents);
      const session = documents.find(session => session.id === sessionId);
      setSession(session || {});
    }});
  }, []);

  if (!session.location) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AppBar />

      <div className="flex column center padding-sm">
        <div className="text size-lg center">Welcome to our Product Therapy session at</div>
        <div className="text size-xxl color-main bold center">{session.location.hostCompanyName} in {session.location.city}</div>
        <div className="text size-lg center">Please fill your info!</div>
        <div className="text size-md center">We will create groups and assign participants shortly.</div>
      </div>


      {!session.isCompleted && (
        <>
          <div className="padding-left-right-sm">
            <SessionGroupsAndParticipants session={session} />
          </div>

          <ParticipantBasicInfoForm sessionId={sessionId} />

          {/* <ModalForm openButtonText="Fill your personal info">
          </ModalForm> */}
        </>
      )}
    </>
  );
}

export default Session;