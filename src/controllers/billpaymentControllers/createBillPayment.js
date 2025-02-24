import Joi from "joi";
import BillPayment from "../../models/billPaymentModel.js";
import Bill from "../../models/billModel.js";
import Account from "../../models/accountModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        body: Joi.object({
            bill: Joi.string().required(),
            date: Joi.date().required(),
            amount: Joi.number().required(),
            account: Joi.string().required(),
            reference: Joi.string().optional(),
            description: Joi.string().optional(),
            // paymentReceipt: Joi.string().optional().allow('', null)
        })
    }),
    handler: async (req, res) => {
        try {
            const { bill, date, amount, account, reference, description } = req.body;

            // Find the bill in bill model
            const billData = await Bill.findOne({
                where: {
                    id: bill
                }
            });

            if (!billData) {
                return responseHandler.error(res, "Bill not found");
            }

            // Find the account in account model
            const accountData = await Account.findOne({
                where: {
                    id: account
                }
            });

            if (!accountData) {
                return responseHandler.error(res, "Account not found");
            }

            const billPayment = await BillPayment.create({
                bill,
                date,
                amount,
                account,
                reference,
                description,
                created_by: req.user?.username
            });

            // Update the bill total
            const updatedTotal = billData.total - amount;
            await billData.update({ total: updatedTotal });

            // Update account opening balance
            const updatedBalance = accountData.opening_balance - amount;
            await accountData.update({ opening_balance: updatedBalance });

            return responseHandler.success(res, "Bill payment created successfully", billPayment);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
};
