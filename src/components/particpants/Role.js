import { nonDisclosedRoleReplacements } from "../../data/enums";

const getRole = ({participant}) => {
  if(participant.role) {
    return participant.role;
  }

  const randomIndex = Object.keys(nonDisclosedRoleReplacements)[Math.floor(Math.random() * Object.keys(nonDisclosedRoleReplacements).length)];
  return nonDisclosedRoleReplacements[randomIndex];
};

const Role = ({participant}) => {
  return (
    <>
      {getRole({participant})}
    </>
  );
}

export default Role;
