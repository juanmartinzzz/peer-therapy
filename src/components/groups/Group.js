import auth from "../../data/auth";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dataLayer } from "../../data/dataLayer";
import RequestForm from "../requests/RequestForm";

const getParticipant = ({participants, id}) => participants.find(participant => participant.id === id) || {};

const Group = () => {
  const user = auth.getUser();
  const { sessionId } = useParams();
  const [group, setGroup] = useState({});
  const [groups, setGroups] = useState([]);
  const [requests, setRequests] = useState([]);
  const [participants, setParticipants] = useState([]);

  // const group = groups.length > 0 ? groups.find(group => group.participantIds.includes(user.id)) : {};
  const participantsInGroup = participants.filter(participant => group.participantIds.includes(participant.id));

  useEffect(() => {
    dataLayer.group.onGroupsChange({sessionId, callback: ({documents}) => {
      const group = documents.find(group => group.participantIds.includes(user.id));
      setGroup(group);
      setGroups(documents);
      dataLayer.request.onRequestsChange({sessionId, groupId: group.id, callback: ({documents}) => setRequests(documents)});
    }});
    dataLayer.participant.onParticipantsChange({sessionId, callback: ({documents}) => setParticipants(documents)});
  }, []);

  return (
    <>
      <div className="flex center padding-top-bottom-md">
        <div className="text size-xxl">{group.name}</div>
      </div>

      <div className="flex column">
        {participantsInGroup.map(participant => (
          <div className="padding-sm" key={participant.id}>
            <div>{participant.name}</div>
          </div>
        ))}
      </div>

      {requests.map(request => (
        <div className="padding-sm" key={request.id}>
          <div className="text size-md">Request from: {getParticipant({participants, id: request.participantId}).name}</div>
          <div className="text size-sm">{request.emotionalState} - {request.status}</div>
        </div>
      ))}

      <RequestForm participantRequest={requests[0]} />
    </>
  );
}

export default Group;