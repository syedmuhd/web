export const QUERY_ROLES_BY_BRANCH = `
query rolesByBranch ($id: ID!) {
    rolesByBranch(branch_id: $id) {
        id
        name
    }
}
`

export const MUTATION_CREATE_ROLE = `
mutation CreateRole ($roleName: String!, $branchId: Int!, $permissions: [ID!]) {
  createRole(
    input: {name: $roleName, branch_id: $branchId, permissions: {sync: $permissions}}
  ) {
    id
  }
}
`

export const QUERY_ROLE_BY_ID = `
query GetRoleById ($id: ID!) {
    roleById(id: $id) {
        id
        name
        permissions {
            id
            name
        }
    }
}
`

export const MUTATION_UPDATE_ROLE = `
mutation UpdateRole($id: ID!, $roleName: String, $permissions: [ID]) {
    updateRole(input: {
        id: $id,
        name: $roleName,
        permissions: {
            sync: $permissions
        }
        }) {
        name
        permissions {
            id
            name
        }
    }
}
`

export const MUTATION_DELETE_ROLE = `
mutation DeleteRole($id: ID!) {
    deleteRole(id: $id) {
        id
    }
}
`