import ModalForm from "../form/ModalForm";
import DateInput from "../form/DateInput";
import TextInput from "../form/TextInput";
import SelectInput from "../form/SelectInput";
import { cities } from "../../data/enums";
import { useEffect, useState } from "react";
import { dataLayer } from "../../data/dataLayer";
import { sessionTemplate } from "../../data/entities";

const saveSession = ({session}) => {
  dataLayer.session.updateSession({session});
}

const SessionForm = ({sessionToEdit, setSessionToEdit}) => {
  const [shouldOpen, setShouldOpen] = useState(false);
  const [session, setSession] = useState(sessionTemplate);

  useEffect(() => {
    setSession(sessionToEdit !== undefined ? sessionToEdit : sessionTemplate);
    setShouldOpen(sessionToEdit !== undefined);
  }, [sessionToEdit]);

  return (
    <ModalForm openButtonText="Create new session" onSave={() => {saveSession({session}); setSessionToEdit(); setShouldOpen(false)}} onClose={() => {setSessionToEdit(); setShouldOpen(false)}} shouldOpen={shouldOpen}>
      <div className="flex column gap-sm padding-sm">
        <div className="text size-lg">Session details</div>
        <DateInput label="Date" value={session.date.toISOString().split('T')[0]} onChange={({target}) => setSession({...session, date: new Date(target.value)})} />
        <TextInput label="Location - Company name" placeholder="Acme Inc." value={session.location.hostCompanyName} onChange={({target}) => setSession({...session, location: {...session.location, hostCompanyName: target.value}})} />
        <SelectInput label="City" value={session.location.city} onChange={({target}) => setSession({...session, location: {...session.location, city: target.value}})} options={Object.values(cities)} />
        <TextInput label="Session Nickname" placeholder="Session Nickname" value={session.nickname} onChange={({target}) => setSession({...session, nickname: target.value})} />
      </div>
    </ModalForm>
  );
}

export default SessionForm;