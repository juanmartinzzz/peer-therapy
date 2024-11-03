import { createSession } from "../../data/dataLayer";
import { cities } from "../../data/enums";
import Button from "../form/Button";
import DateInput from "../form/DateInput";
import SelectInput from "../form/SelectInput";
import TextInput from "../form/TextInput";
import SessionName from "./SessionName";

const NewSessionForm = ({session, setSession, setShowNewSessionForm}) => {
  return (
    <div className="flex column gap-sm padding-left-right-sm">
        <div className="flex wrap gap-md">
          <DateInput label="Session Date" value={session.date.toISOString().split('T')[0]} onChange={({target}) => setSession({...session, date: new Date(target.value)})} />
          <TextInput label="Location - Company name" placeholder="Acme Inc." value={session.location.hostCompanyName} onChange={({target}) => setSession({...session, location: {...session.location, hostCompanyName: target.value}})} />
          <SelectInput label="City" value={session.location.city} onChange={({target}) => setSession({...session, location: {...session.location, city: target.value}})} options={Object.values(cities)} />
          <TextInput label="Session Nickname" placeholder="Session Nickname" value={session.nickname} onChange={({target}) => setSession({...session, nickname: target.value})} />
        </div>

        <div>
          <div className="text size-md">Session name preview:</div>
          <SessionName session={session} />
        </div>

        <div>
          <Button onClick={() => {createSession({session}); setShowNewSessionForm(false);}}>
            <div className="text size-xxl">create session</div>
          </Button>
        </div>
      </div>
  );
}

export default NewSessionForm;
