import { Student } from "../../modules/student/entities/student.entity";
import { Teacher } from "../../modules/teacher/entities/teacher.entity";
import { Admin } from "../../modules/admin/entities/admin.entity";

export const transformUserRole = (user_role: Student | Teacher | Admin) => {
    return {
        id: user_role.id,
        user_role_id: user_role.user_role.id,
        user_id: user_role.user_role.user_id,
        first_name: user_role.user_role.user.first_name,
        last_name: user_role.user_role.user.last_name,
        email: user_role.user_role.user.email,
    }
}

export const transformUserRoles = (user_roles: Student[] | Teacher[] | Admin[]) => {
    return user_roles.map(user_role => transformUserRole(user_role));
}
