import auth from "../../data/auth";
import SessionTitle from "./SessionTitle";
import { Fragment, useState } from "react";
import { addUserToSession } from "../../data/dataLayer";
import SessionGroupsAndParticipants from "./SessionGroupsAndParticipants";

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
            <SessionTitle session={session} shouldShowJoinButton={shouldShowJoinButton} onClick={onClick} />

            {!session.isCompleted && (
              <SessionGroupsAndParticipants session={session} />
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default SessionList;
