import SessionName from "./SessionName";

const SessionTitle = ({session, shouldShowJoinButton, onClick}) => {
  return (
    <div className="card padding-sm flex space-between" key={session.id} onClick={onClick}>
      <SessionName session={session} />
      {shouldShowJoinButton && <div className="text size-xs action-element padding-xs">Join</div>}
      {session.isCompleted && <div className="text size-xs highlight padding-xs">Ended</div>}
    </div>
  );
};

export default SessionTitle;
