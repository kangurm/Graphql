export const userQuery =
  `
{
  user {
    firstName
    lastName
  }
}
`
export const totalXP =
`
  transactions_aggregate(
    where: {
    type: { _eq: "xp" },
    event: { id: { _eq: 148 } }
  }
  ) {
    aggregate {
      sum {
        amount
      }
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