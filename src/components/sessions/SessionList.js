const SessionList = ({sessions}) => {
  return (
    <div>
      {Object.values(sessions).map(session => (
        <div className="card padding-sm" key={session.id}>
          <div className="text size-xl">{`${session.date.getFullYear()} ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][session.date.getUTCMonth()]} ${session.date.getUTCDate()} @ ${session.location.hostCompanyName} - ${session.location.city}`}</div>
          {session.isCompleted && <div className="text size-xs">Ended</div>}
        </div>
      ))}
    </div>
  );
};

export default SessionList;
