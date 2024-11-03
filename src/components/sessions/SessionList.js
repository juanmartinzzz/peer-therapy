import SessionName from "./SessionName";
import auth from "../../data/auth";
import { addUserToSession } from "../../data/dataLayer";

const joinSession = ({session}) => {
  // Add the session ID to the user's sessions list
  auth.addSessionToUser({sessionId: session.id});

  // Add the user to the session
  const user = auth.getUser();
  addUserToSession({sessionId: session.id, user});
};

const SessionList = ({sessions}) => {
  return (
    <div className="flex column gap-sm">
      {Object.values(sessions).map(session => {
        const onClick = session.isCompleted ? undefined : () => joinSession({session});

        return (
          <div className="card padding-sm flex space-between" key={session.id} onClick={onClick}>
            <SessionName session={session} />
            {session.isCompleted ? <div className="text size-xs highlight padding-xs">Ended</div> : <div className="text size-xs action-element padding-xs">Join</div>}
          </div>
        );
      })}
    </div>
  );
};

export default SessionList;
