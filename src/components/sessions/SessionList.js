import auth from "../../data/auth";
import SessionName from "./SessionName";
import SessionGroupsAndParticipants from "./SessionGroupsAndParticipants";
import { Fragment, useState } from "react";
import { addUserToSession } from "../../data/dataLayer";

const joinSession = ({session, userSessions, setUserSessions}) => {
  // Add the session ID to the user's sessions list
  auth.addSessionToUser({sessionId: session.id});

  // Add the user to the session
  const user = auth.getUser();
  addUserToSession({sessionId: session.id, user});
  setUserSessions([...userSessions, session.id]);
};

const SessionList = ({sessions, setSession}) => {
  const user = auth.getUser();
  const [userSessions, setUserSessions] = useState(user.sessions);

  return (
    <div className="flex column gap-xxs">
      {Object.values(sessions).sort((a, b) => b.date.getTime() - a.date.getTime()).map(session => {
        const onClick = session.isCompleted ? undefined : () => joinSession({session, userSessions, setUserSessions});
        const shouldShowJoinButton = !session.isCompleted && !userSessions.includes(session.id);

        return (
          <Fragment key={session.id}>
            <div className="flex center-vertical gap-xs">
              <span className="text color-main size-md">{session.isCompleted ? 'Finished' : 'Upcoming'}</span>
              <span className="text bold size-lg"><SessionName session={session} /></span>
            </div>
            <div className="flex wrap gap-sm">
              <div className="padding-left-right-sm action-element" onClick={() => setSession(session)}>Edit</div>
              {!session.isCompleted && (
                <>
                  <div className="padding-left-right-sm action-element" onClick={() => window.location.href = `/session/${session.id}`}>Join</div>
                  <div className="padding-left-right-sm action-element" onClick={() => window.location.href = `/session/${session.id}/ubq6nqwo4nd7a3infg`}>Manage Groups</div>
                </>
              )}
            </div>
            <div className="padding-top-bottom-sm">
              <div className="horizontal-line"></div>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};

export default SessionList;
