import auth from "../../data/auth";
import Button from "../form/Button";
import TextInput from "../form/TextInput";
import { useEffect, useState } from "react";
import { dataLayer } from "../../data/dataLayer";
import { requestTemplate } from "../../data/entities";

const saveRequest = async ({request}) => {
  await dataLayer.request.addOrUpdate({request});
}

const RequestForm = ({participantRequest}) => {
  const [request, setRequest] = useState(participantRequest || {emotionalState: ''});

  useEffect(() => {
    if(participantRequest) {
      setRequest(participantRequest);
    }
  }, [participantRequest]);

  return (
    <>
      <TextInput label="Emotional state" placeholder="Emotional state" value={request.emotionalState} onChange={({target}) => setRequest({...request, emotionalState: target.value})} />

      <Button onClick={() => saveRequest({request})}>Save request</Button>
    </>
  );
}

export default RequestForm;