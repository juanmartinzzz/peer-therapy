import auth from "../../data/auth";
import SessionName from "./SessionName";
import { addUserToSession } from "../../data/dataLayer";
import ParticipantList from "../particpants/ParticipantList";
import { Fragment, useState } from "react";

const joinSession = ({session, userSessions, setUserSessions}) => {
  // Add the session ID to the user's sessions list
  auth.addSessionToUser({sessionId: session.id});

  // Add the user to the session
  const user = auth.getUser();
  addUserToSession({sessionId: session.id, user});
  setUserSessions([...userSessions, session.id]);
};

const SessionList = ({sessions}) => {
  const user = auth.getUser();
  const [userSessions, setUserSessions] = useState(user.sessions);

  return (
    <div className="flex column gap-sm">
      {Object.values(sessions).map(session => {
        const onClick = session.isCompleted ? undefined : () => joinSession({session, userSessions, setUserSessions});
        const shouldShowJoinButton = !session.isCompleted && !userSessions.includes(session.id);

        return (
          <Fragment key={session.id}>
            <div className="card padding-sm flex space-between" key={session.id} onClick={onClick}>
              <SessionName session={session} />
              {shouldShowJoinButton && <div className="text size-xs action-element padding-xs">Join</div>}
              {session.isCompleted && <div className="text size-xs highlight padding-xs">Ended</div>}
            </div>

            {!session.isCompleted && (
              <div className="padding-left-right-sm">
                <ParticipantList session={session} />
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default SessionList;
