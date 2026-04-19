
export const ROLES = {
    ADMIN: 'ADMIN',
    STAFF: 'EMPLOYEE'
} as const;

export type TRole = typeof ROLES[keyof typeof ROLES];