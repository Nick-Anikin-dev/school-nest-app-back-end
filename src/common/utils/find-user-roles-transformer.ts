import { Student } from "../../modules/student/entities/student.entity";
import { Teacher } from "../../modules/teacher/entities/teacher.entity";
import { Admin } from "../../modules/admin/entities/admin.entity";

export const findUserRolesTransformer = (entities: Array<Student | Teacher | Admin>) => {
    return entities.map(entity=>{
        return {
            id: entity.id,
            user_id: entity.user_role.user_id,
            first_name: entity.user_role.user.first_name,
            last_name: entity.user_role.user.last_name,
            email: entity.user_role.user.email,
        }
    })
}
