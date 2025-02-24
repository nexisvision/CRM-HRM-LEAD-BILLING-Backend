import Joi from "joi";
import TransferAccount from "../../models/transferacconutModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        body: Joi.object({
            fromAccount: Joi.string().required(),
            toAccount: Joi.string().required(),
            amount: Joi.number().required(),
            date: Joi.date().required(),
            description: Joi.string().optional().allow('', null)
        })
    }),
    handler: async (req, res) => {
        try {
            const { fromAccount, toAccount, amount, date, description } = req.body;
            
            const sourceAccount = await TransferAccount.findOne({ where: { fromAccount } });
            if (!sourceAccount) {
                return res.status(400).json({
                    success: false,
                    message: "Source account not found"
                });
            }

            const destinationAccount = await TransferAccount.findOne({ where: { toAccount } });
            if (!destinationAccount) {
                return res.status(400).json({
                    success: false, 
                    message: "Destination account not found"
                });
            }

            if (sourceAccount.openingBalance < amount) {
                return res.status(400).json({
                    success: false,
                    message: "Insufficient balance in source account"
                });
            }

            // Update source account balance
            await sourceAccount.update({
                openingBalance: sourceAccount.openingBalance - amount
            });

            // Update destination account balance  
            await destinationAccount.update({
                openingBalance: destinationAccount.openingBalance + amount
            });

            const transfer = await TransferAccount.create({
                fromAccount,
                toAccount,
                amount,
                date,
                description,
                created_by: req.user?.username
            });

            return responseHandler.success(res, "Transfer completed successfully", transfer);

        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}