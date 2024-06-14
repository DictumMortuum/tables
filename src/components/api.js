
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

export const searchBoardgame = name => fetch(`${process.env.REACT_APP_ENDPOINT}/rest/boardgames?filter={"name@simplelike":"${name}"}&range=[0,9]`, {
  method: "GET"
}).then(res => res.json())

export const createEurovisionParticipation = payload => fetch(`${process.env.REACT_APP_ENDPOINT}/rest/eurovisionparticipations`, {
  method: "POST",
  body: JSON.stringify(payload)
}).then(res => res.json());

export const createEurovisionVotes = payload => fetch(`${process.env.REACT_APP_ENDPOINT}/rest/eurovisionvotes`, {
  method: "POST",
  body: JSON.stringify(payload)
}).then(res => res.json());

export const getEurovisionVotes = user_id => fetch(`${process.env.REACT_APP_ENDPOINT}/rest/eurovisionvotes/user/${user_id}`, {
  method: "GET"
}).then(res => res.json());

export const getEurovisionParticipation = user_id => fetch(`${process.env.REACT_APP_ENDPOINT}/rest/eurovisionparticipations/user/${user_id}`, {
  method: "GET"
}).then(res => res.json());
