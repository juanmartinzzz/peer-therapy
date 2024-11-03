import { cities } from "./enums";

const locationTemplate = {
  nickname: '',
  city: cities.montreal,
  hostCompanyName: 'Acme Inc.',
};

const sessionTemplate = {
  nickname: '',
  date: new Date(),
  isCompleted: false,
  location: locationTemplate,
};

const userTemplate = {
  id: '',
  name: '',
  email: '',
  industry: '',
  sessions: [],
  companyName: '',
  city: cities.montreal,
};

export { locationTemplate, sessionTemplate, userTemplate };