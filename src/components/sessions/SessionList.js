import SessionName from "./SessionName";
import { Fragment } from "react";

const SessionList = ({sessions, setSession}) => (
  <div className="flex column gap-xxs">
    {Object.values(sessions).sort((a, b) => b.date.getTime() - a.date.getTime()).map(session => (
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
    ))}
  </div>
);

export default SessionList;
