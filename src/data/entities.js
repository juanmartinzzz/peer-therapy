import { cities, emojis } from "./enums";

const groupTemplate = {
  id: '',
  name: '',
  emoji: '',
  sessionId: '',
  emoji: emojis[Object.keys(emojis)[Math.floor(Math.random() * Object.keys(emojis).length)]]
};

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

export { locationTemplate, sessionTemplate, userTemplate, groupTemplate };