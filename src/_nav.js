export default {
  items: [
    {
      title: true,
      name: "Dashboard"
    },
    {
      name: "Home",
      url: "/dashboard",
      icon: "fa fa-home",
      roleNames: ["superadmin", "admin", "general", "officer", "supervisor"]
    },
    {
      name: "Users",
      url: "/dashboard/user-register",
      icon: "fa fa-users",
      roleNames: ["superadmin", "admin", "general", "officer", "supervisor"]
    },
    {
      name: "Sensors",
      url: "/dashboard/sensors",
      icon: "fa fa-thermometer-half",
      roleNames: ["superadmin", "admin"]
    },
    {
      name: "Firmware",
      url: "/dashboard/firmware",
      icon: "fa fa-object-ungroup",
      roleNames: ["superadmin"]
    },
    {
      name: "Register Site",
      url: "/dashboard/site-register",
      icon: "fa fa-user",
      roleNames: ["superadmin", "admin"]
    }
  ]
};
