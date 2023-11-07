import { Role } from "../types/enums/role.enum";

export const UserRoleSchoolMap = {
    [Role.ADMIN]: 'administrators',
    [Role.TEACHER]: 'teachers',
    [Role.STUDENT]: 'students',
}
