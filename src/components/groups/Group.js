import auth from "../../data/auth";
import AppBar from "../appbar/AppBar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dataLayer } from "../../data/dataLayer";
import RequestForm from "../requests/RequestForm";
import RequestForm2 from "../requests/RequestForm2";

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
      <AppBar />

      <div className="flex column center padding-sm">
        <div className="text size-lg">Welcome to</div>
        <div className="flex center gap-xs">
          <div className="text color-main bold size-xxl">{group.name}</div>
        </div>
      </div>

      <div className="padding-sm">
        <div className="flex center text size-xl">Requests</div>
        {requests.map(request => (
          <div key={request.id}>
            <div className="text color-main bold size-lg">{getParticipant({participants, id: request.participantId}).name}</div>
            <div className="text size-sm">{request.emotionalStateEmoji} ({request.emotionalState})</div>
            <div className="text size-sm">{request.requestToGroup}</div>
            <div className="text size-sm">{request.context}</div>
          </div>
        ))}
      </div>

      <RequestForm2 sessionId={sessionId} groupId={groupId} />
    </>
  );
}

export default Group;