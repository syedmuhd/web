export const QUERY_ALL_USERS = `
  query Users($branchCondition: QueryUsersBranchesWhereHasConditions!, $roleId: ID) {
    users(branches: $branchCondition, role_id: $roleId) {
      id
      email
      created_at
      profile {
        name
      }
      role {
        name
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

export const MUTATION_UPDATE_USER = `
mutation UpdateUser ($id: ID!, $roleId: ID, $email: String, $phone: String, $profileId: ID, $name: String) {
  updateUser(input: {
    id: $id
    role_id: $roleId,
    email: $email
    phone: $phone
    profile: {
      update: {
        id: $profileId,
        name: $name
      }
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

export const MUTATION_DELETE_USER = `
mutation DeleteUser ($id: ID!) {
  deleteUser(id: $id) {
    id
  }
}
`