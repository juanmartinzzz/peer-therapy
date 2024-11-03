import SessionName from "./SessionName";

const SessionList = ({sessions}) => {
  return (
    <div>
      {Object.values(sessions).map(session => (
        <div className="card padding-sm" key={session.id}>
          <SessionName session={session} />
          {session.isCompleted && <div className="text size-xs highlight padding-xs">Ended</div>}
        </div>
      ))}
    </div>
  );
};

export default SessionList;
