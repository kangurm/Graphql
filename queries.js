export const userQuery = 
`
{
  user_public_view {
    id
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