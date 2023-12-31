const routes = [
    {
        path: "/",
        component: () => import("../layouts/LoginLayout.vue"),
        children: [
            {
                path: "",
                name: "loginDefault",
                component: () => import("pages/Login.vue"),
            },
            {
                path: "login",
                name: "login",
                component: () => import("pages/Login.vue"),
            },
            {
                path: "register",
                name: "register",
                component: () => import("pages/Register.vue"),
            },
        ],
    },
    {
        path: "/",
        component: () => import("layouts/MainLayout.vue"),
        children: [{ path: "/", component: () => import("pages/Index.vue") }],
        meta: {
            requiresAuth: true,
        },
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: "/:catchAll(.*)*",
        component: () => import("pages/Error404.vue"),
    },
];

export default routes;
