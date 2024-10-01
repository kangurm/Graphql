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

export const AuditsQuery =
`query {
downTransactions: transaction_aggregate(
  where: { userId: { _eq: 9041 }, type: { _eq: "down" } }
) {
  aggregate {
      count
  }
}
upTransactions: transaction_aggregate(
  where: { userId: { _eq: 9041 }, type: { _eq: "up" } }
) {
  aggregate {
      count
  }
}
}`