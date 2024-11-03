const SessionName = ({session}) => {
  return <div className="text size-xl">{`${session.date.getFullYear()} ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][session.date.getUTCMonth()]} ${session.date.getUTCDate()} @ ${session.location.hostCompanyName} - ${session.location.city}`}</div>;
};

export default SessionName;
