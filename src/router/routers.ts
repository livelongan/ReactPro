import { RouteItem } from "./type"
// path: "/TestForm1",  // 域名加后面的path
// name: "TestForm",  // 组件名称
// title: "Form2", //菜单标题
// icon: "form"
const routers: RouteItem[] = [
    // {
    //     path: "/",
    //     name: "Home",
    //     title: "Home",
    //     icon: "home",
    //     display: false,
    //     color: "rgba(32, 128, 0, 1)"
    // },
    {
        path: "/",
        name: "Home",
        title: "Home",
        icon: "home",
        color: "rgba(32, 128, 0, 1)"
    },
    {
        path: "/Gann",
        name: "Gann",
        title: "Gann",
        icon: "gann",
        color: "rgba(65, 219, 27, 1)"
    },
    {
        path: "/Calc",
        name: "Calc",
        title: "Calc",
        icon: "calc",
        color: "rgba(215, 8, 8, 1)"
    },
    {
        path: "/Organization",
        name: "Organization",
        title: "Organization",
        icon: "organization",
        color: "rgba(225, 225, 20, 1)"
    },
    {
        path: "/Settings",
        name: "Settings",
        title: "Settings",
        icon: "settings",
        color: "rgba(6, 0, 168, 1)"
    },
    {
        path: "/UserProfile",
        name: "UserProfile",
        title: "User Profile",
        icon: "userProfile",
        color: "rgba(27, 219, 187, 1)"
    },
    {
        path: "/Test",
        name: "Test",
        title: "Test Form",
        icon: "form", 
        children: [
            {
                path: "/TestForm1",
                name: "TestForm",
                title: "Form2",
                icon: "form"
            },
            {
                path: "/TestForm2",
                name: "TestForm",
                title: "Form1",
                icon: "form"
            },
        ]
    },
    {
        path: "/Purple",
        name: "Purple",
        title: "Purple",
        icon: "purple",
        color: "rgba(128, 0, 128, 1)"
    },
]
export default routers