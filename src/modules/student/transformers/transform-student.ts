import { transformUserRoles } from "../../../common/utils/transform-user-roles";
import { Student } from "../entities/student.entity";

export const transformStudent = (student: Student) => {
    return {
        id: student.id,
        first_name: student.user_role.user.first_name,
        last_name: student.user_role.user.last_name,
        email: student.user_role.user.email,
        teachers: transformUserRoles(student.teachers),
        groups: student.groups,
    }
}
