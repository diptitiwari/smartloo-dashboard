import {
  ServiceMaker,
  methods
} from "./index";

// eslint-disable-next-line import/prefer-default-export
export const siteInfo = () => ServiceMaker("/sites?page=1", methods.GET);

export const getToken = id => ServiceMaker(`/sites/data/token?site_id=${id}`, methods.GET);

export const SiteMetadata = () => ServiceMaker("/iotdata/site", methods.GET, {}, "SmartLooSite");

export const SiteSensors = () => ServiceMaker("/iotdata/site/sensors", methods.GET, {}, "SmartLooSite");

export const WaterLevel = () => ServiceMaker("/iotdata/site/water_level?window=1&unit=day&minute_resolution=60", methods.GET, {}, "SmartLooSite");

export const Sensors = () => ServiceMaker("/iotdata/site/sensors", methods.GET, {}, "SmartLooSite");

export const Usage = () => ServiceMaker("/iotdata/site/usage?window=7&unit=day", methods.GET, {}, "SmartLooSite");

export const Feedback = () => ServiceMaker("/iotdata/site/feedback?window=7&unit=day", methods.GET, {}, "SmartLooSite");

export const CustomAttrs = () => ServiceMaker("/sites/custom_attrs", methods.GET);

export const getCustomAtt = () => ServiceMaker("/iotdata/sites/custom_attrs", methods.GET);
