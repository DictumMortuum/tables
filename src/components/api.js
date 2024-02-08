
export const createTable = payload => fetch(`${process.env.REACT_APP_ENDPOINT}/rest/tables`, {
  method: "POST",
  body: JSON.stringify(payload)
}).then(res => res.json());

export const deleteTable = id => fetch(`${process.env.REACT_APP_ENDPOINT}/rest/tables/${id}`, {
  method: "DELETE",
}).then(res => res.json());

export const createParticipant = payload => fetch(`${process.env.REACT_APP_ENDPOINT}/rest/tableparticipants`, {
  method: "POST",
  body: JSON.stringify(payload)
}).then(res => res.json());

export const removeParticipant = id => fetch(`${process.env.REACT_APP_ENDPOINT}/rest/tableparticipants/${id}`, {
  method: "DELETE",
}).then(res => res.json());

export const getBoardgame = id => fetch(`${process.env.REACT_APP_ENDPOINT}/rest/boardgames/${id}`).then(res => res.json());
