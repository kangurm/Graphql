export const userQuery =
`
{
  user {
    firstName
    lastName
  }
}
`

export const myQuery =
`
{
  object(where: { id: { _eq: 9041 }}) {
    name
    type
  }
}
`