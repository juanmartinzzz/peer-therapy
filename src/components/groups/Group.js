import auth from "../../data/auth";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dataLayer } from "../../data/dataLayer";
import RequestForm from "../requests/RequestForm";

const getParticipant = ({participants, id}) => participants.find(participant => participant.id === id) || {};

const Group = () => {
  const user = auth.getUser();
  const { sessionId, groupId } = useParams();
  const [group, setGroup] = useState({});
  const [session, setSession] = useState({});
  // const [groups, setGroups] = useState([]);
  const [requests, setRequests] = useState([]);
  const [participants, setParticipants] = useState([]);

  // const group = groups.length > 0 ? groups.find(group => group.participantIds.includes(user.id)) : {};
  const participantsInGroup = participants.filter(participant => group.participantIds.includes(participant.id));

  useEffect(() => {
    dataLayer.session.onSessionsChange({sessionId, callback: ({documents}) => {
      setSession(documents.find(session => session.id === sessionId));
    }});
    dataLayer.group.onGroupsChange({sessionId, callback: ({documents}) => {
      setGroup(documents.find(group => group.id === groupId));
    }});
    dataLayer.request.onRequestsChange({sessionId, groupId, callback: ({documents}) => setRequests(documents)});
    dataLayer.participant.onParticipantsChange({sessionId, callback: ({documents}) => setParticipants(documents)});
  }, []);

  return (
    <>
      <div className="flex column center padding-top-bottom-md">
        <div className="text size-lg">Session at {session.location.hostCompanyName}</div>
        <div className="flex center gap-xs">
          <div className="text size-lg">Group</div>
          <div className="text size-xxl">{group.name}</div>
        </div>
      </div>

      <div className="flex gap-sm padding-left-right-sm">
        Participants:{participantsInGroup.map(participant => <div className="text size-md" key={participant.id}>{participant.name}</div>)}
      </div>

      {requests.map(request => (
        <div className="padding-sm" key={request.id}>
          <div className="text size-md">Request from: {getParticipant({participants, id: request.participantId}).name}</div>
          <div className="text size-sm">{request.emotionalStateEmoji} ({request.emotionalState})</div>
          <div className="text size-sm">{request.requestToGroup}</div>
          <div className="text size-sm">{request.context}</div>
        </div>
      ))}

      <div className="card padding-top-bottom-md padding-left-right-sm">
        <RequestForm participantRequest={requests[0]} />
      </div>
    </>
  );
}

export default Group;