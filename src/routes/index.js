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
import sourcesRoutes from "./sourcesRoutes.js";
import labelRoutes from "./labelRoutes.js";
import contractRoutes from "./contractRoutes.js";
import projectReportRoutes from "./projectReportRoutes.js";
import invoiceRoutes from "./invoiceRoutes.js";
import expenseRoutes from "./expenseRoutes.js";
import paymentRoutes from "./paymentRoutes.js";
import milestoneRoutes from "./milestoneRoutes.js";
import notesRoutes from "./notesRoutes.js";
import activityRoutes from "./activityRoutes.js";
import productsRoutes from "./productsRoutes.js";
import pipelineRoutes from "./pipelineRoutes.js";
import dealRoutes from "./dealRoutes.js";
import quotationsRoutes from "./quotationsRoutes.js";
import proposalRoutes from "./proposalRoutes.js";
import ticketRoutes from "./ticketRoutes.js";
import jobApplicationRoutes from "./jobapplicationRoutes.js";
import jobRoutes from "./jobRoutes.js";
import skillRoutes from "./skillRoutes.js";
import interviewScheduleRoutes from "./interviewScheduleRoutes.js";
import messageRoutes from "./messageRoutes.js";
import appreciationRoutes from "./appreciationRoutes.js";
import trainingRoutes from "./trainingRoutes.js";
import employeeSalaryRoutes from "./employeeSalaryRoutes.js";
import stageRoutes from "./stageRoutes.js";
import notificationRoutes from "./notificationRoutes.js";
import customerRoutes from "./customerRoutes.js";
import salesQuotations from "./salesQuotations.js";
import salesInvoiceRoutes from "./salesInvoiceRoutes.js";
import salesRevenueRoutes from "./salesRevenueRoutes.js";
import salesCreditnoteRoutes from "./salesCreditnoteRoutes.js";
import inquiryRoutes from "./inquiryRoutes.js";
import orderRoutes from "./orderRoutes.js";
import billRoutes from "./billRoutes.js";
import leaveTypeRoutes from "./leaveTypeRoutes.js";
import documentTypeRoutes from "./documentTypeRoutes.js";
import payslipTypeRoutes from "./payslipTypeRoutes.js";
import allowanceOptionRoutes from "./allowanceOptionRoutes.js";
import loanOptionRoutes from "./loanOptionRoutes.js";
import deductionOptionRoutes from "./deductionOptionRoutes.js";
import goalTypeRoutes from "./goalTypeRoutes.js";
import trainingTypeRoutes from "./trainingTypeRoutes.js";
import awardTypeRoutes from "./awardTypeRoutes.js";
import terminationTypeRoutes from "./terminationTypeRoutes.js";
import jobCategoryRoutes from "./jobCategoryRoutes.js";
import jobStageRoutes from "./jobStageRoutes.js";
import performanceTypeRoutes from "./performanceTypeRoutes.js";
import competenciesRoutes from "./competenciesRoutes.js";
import jobonboardingrouter from "./jobonboardingrouter.js";

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/super-admin', superAdminRoutes);
router.use('/roles', roleRoutes);
router.use('/clients', clientRoutes);
router.use('/sub-clients', subClientRoutes);
router.use('/employees', employeeRoutes);
router.use('/users', userRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/leaves', leaveRoutes);
router.use('/permissions', permissionRoutes);
router.use('/role-permissions', rolePermissionRoutes);
router.use('/subscriptions', subscriptionRoutes);
router.use('/announcements', announcementRoutes);
router.use('/events', eventRoutes);
router.use('/projects', projectRoutes);
router.use('/project-reports', projectReportRoutes);
router.use('/features', featureRoutes);
router.use('/taskcalendars', taskCalendarRoutes);
router.use('/currencies', currencyRoutes);
router.use('/tasks', taskRoutes);
router.use('/countries', countriesRoutes);
router.use('/labels', labelRoutes);
router.use('/sources', sourcesRoutes);
router.use('/contracts', contractRoutes);
router.use('/invoices', invoiceRoutes);
router.use('/expenses', expenseRoutes);
router.use('/payments', paymentRoutes);
router.use('/milestones', milestoneRoutes);
router.use('/notes', notesRoutes);
router.use('/activities', activityRoutes);
router.use('/deals', dealRoutes);
router.use('/leads', leadRoutes);
router.use('/pipelines', pipelineRoutes);
router.use('/stages', stageRoutes);
router.use('/products', productsRoutes);
router.use('/quotations', quotationsRoutes);
router.use('/proposals', proposalRoutes);
router.use('/tickets', ticketRoutes);
router.use('/job-applications', jobApplicationRoutes);
router.use('/meetings', meetingRoutes);
router.use('/jobs', jobRoutes);
router.use('/skills', skillRoutes);
router.use('/interview-schedules', interviewScheduleRoutes);
router.use('/messages', messageRoutes);
router.use('/appreciations', appreciationRoutes);
router.use('/trainings', trainingRoutes);
router.use('/employeeSalary', employeeSalaryRoutes);
router.use('/notifications', notificationRoutes);
router.use('/customers', customerRoutes);
router.use('/sales-quotations', salesQuotations);
router.use('/sales-invoices', salesInvoiceRoutes);
router.use('/sales-revenue', salesRevenueRoutes);
router.use('/sales-creditnote', salesCreditnoteRoutes);
router.use('/inquiry', inquiryRoutes);
router.use('/orders', orderRoutes);
router.use('/bills', billRoutes);
router.use('/job-onboarding', jobonboardingrouter)


//HRM
router.use('/branches', branchRoutes);
router.use('/departments', departmentRoutes);
router.use('/designations', designationRoutes);
router.use('/leave-types', leaveTypeRoutes);
router.use('/document-types', documentTypeRoutes);
router.use('/payslip-types', payslipTypeRoutes);
router.use('/allowance-options', allowanceOptionRoutes);
router.use('/loan-options', loanOptionRoutes);
router.use('/deduction-options', deductionOptionRoutes);
router.use('/goal-types', goalTypeRoutes);
router.use('/training-types', trainingTypeRoutes);
router.use('/award-types', awardTypeRoutes);
router.use('/termination-types', terminationTypeRoutes);
router.use('/job-categories', jobCategoryRoutes);
router.use('/job-stages', jobStageRoutes);
router.use('/performance-types', performanceTypeRoutes);
router.use('/competencies', competenciesRoutes);


export default router;
