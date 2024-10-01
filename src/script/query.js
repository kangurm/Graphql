import { getUserIDFromStorage } from "./util.js";

let user_id = getUserIDFromStorage();

export const userQuery =
  `
{
  user {
    firstName
    lastName
    id
  }
}
`

export const ProjectsQuery =
`{
  transaction(
    where: { type: { _eq: "xp" }, object: { type: { _eq: "project" } } }
  ) {
    id
    amount
    createdAt
    object {
      name
    }
  }
}`



export const AuditsQuery =
`query {
downTransactions: transaction_aggregate( where: { userId: { _eq: ${user_id} }, type: { _eq: "down" } }) {
  aggregate {
      count
  }
}
upTransactions: transaction_aggregate( where: { userId: { _eq: ${user_id} }, type: { _eq: "up" } }) {
  aggregate {
      count
  }
}
user(where: { id: { _eq: ${user_id} } }) {
  auditRatio
}
audit (where: { auditorId: { _eq: ${user_id} } }) {
  grade
}
}`
