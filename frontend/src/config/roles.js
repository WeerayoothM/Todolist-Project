import Login from "../pages/Login";
import Todo from "../pages/Todo";

const allPages = {
    login: {
        url: '/login',
        page: Login
    },
    todo: {
        url: '/todo',
        page: Todo,
    }
    
};

const permissionList = {
    guest: [
        allPages.login
    ],
    user: [
        allPages.todo
    ]

};

export default permissionList;
