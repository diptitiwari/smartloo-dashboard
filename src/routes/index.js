/* ============
 * Routes File
 * ============
 *
 * The routes and redirects are defined in this file.
 */

export default [
  {
    path: "/home",
    name: "home.index",
    redirect: "/dashboard",
    meta: {
      auth: true
    }
  },
  {
    path: "/dashboard",
    name: "home.dashboard",
    component: () => import("@/containers/DefaultContainer.vue"),
    meta: { auth: true, label: "Dashboard" },
    children: [
      {
        path: "",
        name: "map",
        component: () => import("@/views/Home/Dashboard/Index.vue"),
        meta: {
          auth: true,
          label: "Map"
        }
      },
      {
        path: "site-details/:id",
        name: "site-details",
        component: () => import("@/views/Home/SiteDetails/index.vue"),
        meta: {
          auth: true,
          label: "Site Details"
        }
      },
      {
        path: "user-register",
        name: "home.user-register",
        component: () => import("@/views/Home/Register/Index.vue"),
        meta: {
          auth: true
        }
      },
      {
        path: "sensors",
        name: "home.sensors",
        component: () => import("@/views/Home/Sensor/SensorList.vue"),
        meta: {
          auth: true
        }
      },
      {
        path: "firmware",
        name: "home.firmware",
        component: () => import("@/views/Home/Firmware/Index.vue"),
        meta: {
          auth: true
        }
      },
      {
        path: "site-register",
        name: "home.site-register",
        component: () => import("@/views/Home/SiteRegister/Index.vue"),
        meta: {
          auth: true
        }
      }
    ]
  },
  {
    path: "/section-register",
    name: "home.section-register",
    component: () => import("@/views/Home/Section/Index.vue"),
    meta: {
      auth: true
    }
  },
  {
    path: "/settings",
    name: "home.settings",
    component: () => import("@/views/Home/Settings/Index.vue"),
    meta: {
      auth: true
    }
  },
  {
    path: "/account",
    name: "account.index",
    component: () => import("@/views/Account/Index.vue"),
    meta: {
      auth: true
    }
  },
  {
    path: "/login",
    name: "login.index",
    component: () => import("@/views/Auth/Login/Index.vue"),
    meta: {
      guest: true
    }
  },
  {
    path: "/register",
    name: "register.index",
    component: () => import("@/views/Auth/Register/Index.vue"),
    meta: {
      guest: true
    }
  },
  {
    path: "/verify",
    name: "verify.index",
    component: () => import("@/views/Auth/Verify/Index.vue"),
    meta: {
      guest: true
    }
  },
  {
    path: "/error",
    name: "error.index",
    component: () => import("@/views/Other/Error/Index.vue")
  },

  {
    path: "/thankyou",
    name: "thankyou.index",
    component: () => import("@/views/Other/Thankyou/Index.vue")
  },

  {
    path: "/",
    name: "index",
    redirect: "/home"
  },

  {
    path: "/*",
    redirect: "/error"
  }
];
