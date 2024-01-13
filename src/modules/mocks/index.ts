import { Role } from "../../common/types/enums/role.enum";
const password = '123456';
export const students = [
    {
        email: "student1@gmail.com",
        password,
        first_name: 'Student1',
        last_name: 'Student1',
        role: Role.STUDENT,
    },
    {
        email: "student2@gmail.com",
        password,
        first_name: 'Student2',
        last_name: 'Student2',
        role: Role.STUDENT,
    },
    {
        email: "student3@gmail.com",
        password,
        first_name: 'Student3',
        last_name: 'Student3',
        role: Role.STUDENT,
    }
];
export const teachers = [
    {
        email: "teacher1@gmail.com",
        password,
        first_name: 'Teacher1',
        last_name: 'Teacher1',
        role: Role.TEACHER,
    },
    {
        email: "teacher2@gmail.com",
        password,
        first_name: 'Teacher2',
        last_name: 'Teacher2',
        role: Role.TEACHER,
    },
    {
        email: "teacher3@gmail.com",
        password,
        first_name: 'Teacher3',
        last_name: 'Teacher3',
        role: Role.TEACHER,
    },
];
export const admins = [
    {
        email: "admin1@gmail.com",
        password,
        first_name: 'Admin1',
        last_name: 'Admin1',
        role: Role.TEACHER,
    },
    {
        email: "admin2@gmail.com",
        password,
        first_name: 'Admin2',
        last_name: 'Admin2',
        role: Role.TEACHER,
    },
    {
        email: "admin3@gmail.com",
        password,
        first_name: 'Admin3',
        last_name: 'Admin3',
        role: Role.TEACHER,
    },
];
