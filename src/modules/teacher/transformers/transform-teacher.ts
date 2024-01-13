import { transformUserRoles } from "../../../common/utils/transform-user-roles";
import { Teacher } from "../entities/teacher.entity";

export const transformTeacher = (teacher: Teacher) => {
    return {
        id: teacher.id,
        first_name: teacher.user_role.user.first_name,
        last_name: teacher.user_role.user.last_name,
        email: teacher.user_role.user.email,
        students: transformUserRoles(teacher.students),
        groups: teacher.groups,
    }
}
