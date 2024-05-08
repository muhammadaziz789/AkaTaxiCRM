import { dashboardList } from "./dashboard";
import { driverList } from "./drivers";
import { passengerList } from "./passenger";
import { infoLists } from './infos';
import { adminList } from './admins';
import {settingList} from './settings';

export const routeList = [...dashboardList, ...passengerList, ...driverList, ...infoLists, ...adminList, ...settingList]