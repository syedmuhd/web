export const QUERY_ALL_USERS = `
query UsersByBranch($id: ID!) {
  branchById(id: $id) {
    users {
      id
      email
      profile {
        name
      }
      role {
        name
      }
    }
  }
}`

export const MUTATION_CREATE_USER = `
mutation CreateUser ($email: String!, $phone: String!, $name: String!, $branchId: [ID!], $roleId: ID!) {
  createUser(input: {
    email: $email,
    phone: $phone,
    profile: {
      create: { name: $name }
    },
    role: {
        connect: $roleId
    }
    branches: {
      connect: $branchId
    }
  }) {
    id
  }
}
`

export const QUERY_GET_USER_BY_ID = `
query GetUserById ($id: ID!) {
  userById(id: $id) {
    id
    email
    phone
    profile {
      id
      name
    }
    role {
      id
      name
    }
  }
}
`