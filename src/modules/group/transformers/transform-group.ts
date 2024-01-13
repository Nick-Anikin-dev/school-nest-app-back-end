import { Group } from "../entities/group.entity";
import { transformUserRoles } from "../../../common/utils/transform-user-roles";


export const transformGroup = (group: Group) => {
    return {
        id: group.id,
        name: group.name,
        created_at: group.name,
        students: transformUserRoles(group.students),
        teachers: transformUserRoles(group.teachers),
    }
}
