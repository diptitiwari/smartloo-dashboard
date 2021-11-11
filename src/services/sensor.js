import { ServiceMaker, methods } from "./index";

export const sensorByMacId = data => ServiceMaker("/sensors/info", methods.POST, data);

export const sensorList = () => ServiceMaker("/sensors/?page=1", methods.GET);

export const sensorType = () => ServiceMaker("/sensors/types", methods.GET);
