import {
  ServiceMaker,
  methods
} from "./index";

export const login = data => ServiceMaker("/users/customer/login", methods.POST, data);
export const register = data => ServiceMaker("/users/customer", methods.POST, data);

export const registerUser = data => ServiceMaker("/users", methods.POST, data);
export const registerSensor = data => ServiceMaker("/sensors", methods.POST, data);

export const registerSection = data => ServiceMaker("/sites/section", methods.POST, data);
