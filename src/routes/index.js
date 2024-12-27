import express from "express";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import roleRoutes from "./roleRoutes.js";
import clientRoutes from "./clientRoutes.js";
import employeeRoutes from "./employeeRoutes.js";
import departmentRoutes from "./departmentRoutes.js";
import designationRoutes from "./designationRoutes.js";
import attendanceRoutes from "./attendanceRoutes.js";
import leaveRoutes from "./leaveRoutes.js";
import permissionRoutes from "./permissionRoutes.js";
import subscriptionRoutes from "./subscriptionRoutes.js";
import rolePermissionRoutes from "./rolePermissionRoutes.js";
import announcementRoutes from "./announcementRoutes.js";
import eventRoutes from "./eventRoutes.js";
import projectRoutes from "./projectRoutes.js";
import meetingRoutes from "./meetingRoutes.js";
import subClientRoutes from "./subClientRoutes.js";
import featureRoutes from "./featureRoutes.js";
import taskCalendarRoutes from "./taskcalendarRoutes.js";
import currencyRoutes from "./currencyRoutes.js";
import branchRoutes from "./branchRoutes.js";
import superAdminRoutes from "./superAdminRoutes.js";
import leadRoutes from "./leadRoutes.js";
import taskRoutes from "./taskRoutes.js";
import countriesRoutes from "./countriesRoutes.js";
import dealRoutes from "./dealRoutes.js";
import tagRoutes from "./tagRoutes.js";

const router = express.Router();


router.use('/auth', authRoutes);
router.use('/super-admin', superAdminRoutes);
router.use('/roles', roleRoutes);
router.use('/clients', clientRoutes);
router.use('/sub-clients', subClientRoutes);
router.use('/employees', employeeRoutes);
router.use('/users', userRoutes);
router.use('/departments', departmentRoutes);
router.use('/designations', designationRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/leaves', leaveRoutes);
router.use('/permissions', permissionRoutes);
router.use('/role-permissions', rolePermissionRoutes);
router.use('/subscriptions', subscriptionRoutes);
router.use('/announcements', announcementRoutes);
router.use('/events', eventRoutes);
router.use('/projects', projectRoutes);
router.use('/meetings', meetingRoutes);
router.use('/features', featureRoutes);
router.use('/taskcalendars', taskCalendarRoutes);
router.use('/currencies', currencyRoutes);
router.use('/branches', branchRoutes);
router.use('/leads', leadRoutes);
router.use('/tasks', taskRoutes);
router.use('/countries', countriesRoutes);
router.use('/deals', dealRoutes);
router.use('/tags', tagRoutes);

export default router;
