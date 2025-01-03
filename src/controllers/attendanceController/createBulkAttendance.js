import Joi from "joi";
import XLSX from "xlsx";
import Attendance from "../../models/attendanceModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        files: Joi.object({
            file: Joi.object({
                mimetype: Joi.string().valid(
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    'application/vnd.ms-excel'
                ).required()
            }).required()
        })
    }),

    handler: async (req, res) => {
        try {
            if (!req.files || !req.files.file) {
                return responseHandler.badRequest(res, "Please upload an Excel file");
            }

            const workbook = XLSX.read(req.files.file.data);
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const data = XLSX.utils.sheet_to_json(worksheet);

            if (data.length === 0) {
                return responseHandler.badRequest(res, "Excel file is empty");
            }

            const attendanceRecords = data.map(row => ({
                department: row.department,
                employee: row.employee.split(',').map(emp => emp.trim()), // Assuming employees are comma-separated
                startDate: new Date(row.startDate),
                startTime: row.startTime,
                endDate: new Date(row.endDate),
                endTime: row.endTime,
                late: row.late || null,
                halfDay: row.halfDay || null,
                working_from: row.working_from || null,
                comment: row.comment || null,
                created_by: req.user?.username
            }));

            const attendance = await Attendance.insertMany(attendanceRecords);

            responseHandler.created(res, "Bulk attendance marked successfully", {
                totalRecords: attendance.length,
                attendance
            });

        } catch (error) {
            console.log(error);
            responseHandler.error(res, "Error processing bulk attendance: " + error.message);
        }
    }
};