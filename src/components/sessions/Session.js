import auth from "../../data/auth";
import AppBar from "../appbar/AppBar";
import GroupForm2 from "../groups/GroupForm2";
import SessionGroupsAndParticipants from "./SessionGroupsAndParticipants";
import ParticipantBasicInfoForm from "../particpants/ParticipantBasicInfoForm";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dataLayer } from "../../data/dataLayer";

const Session = () => {
  const {sessionId} = useParams();
  const [group, setGroup] = useState();
  const [session, setSession] = useState({});
  const [sessions, setSessions] = useState({});

  useEffect(() => {
    dataLayer.session.onSessionsChange({callback: ({documents}) => {
      setSessions(documents);

      // Find current Session for User
      const session = documents.find(session => session.id === sessionId);
      setSession(session || {});
    }});
  }, []);

  if (!session.location) {
    return <div>Loading...</div>;
  }

  const IntroText = () => {
    return <div className="text size-lg center">{auth.isAdmin() ? 'Manage Groups for our session at' : 'Welcome to our Product Therapy session at'}</div>
  }

  const SessionSubtitle = () => {
    if(auth.isAdmin()) {
      return null;
    }

    return (
      <>
        <div className="text size-lg center">Please fill your info!</div>
        <div className="text size-md center">We will create groups and assign participants shortly.</div>
      </>
    );
  }

  const backAction = auth.isAdmin() ? () => {window.location.href = `/${process.env.REACT_APP_ADMIN_HASH}`;} : null;

  return (
    <>
      <AppBar backAction={backAction} />

      <div className="flex column center padding-sm">
        <IntroText />
        <div className="text size-xxl color-main bold center">{session.location.hostCompanyName} in {session.location.city}</div>
        <SessionSubtitle />
      </div>

      <div className="padding-left-right-sm">
        <SessionGroupsAndParticipants session={session} setGroupToEdit={setGroup} />
      </div>

      {!auth.isAdmin() && <ParticipantBasicInfoForm sessionId={sessionId} />}
      {auth.isAdmin() && <GroupForm2 sessionId={sessionId} groupToEdit={group} setGroupToEdit={setGroup} />}
    </>
  );
}

export default Session;