import { s3 } from "../config/config.js";
import generateId from "../middlewares/generatorId.js";

const uploadToS3 = async (file, role, type, name, i1, i2) => {
    try {
      if (!file) {
        throw new Error('File is required');
      }
  
      const date = new Date();
      const uniqueId = generateId();
      const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const fileExtension = file.originalname.split('.').pop();
      
      let key = '';
      switch (role) {
        case 'super-admin':
          key = `CRM_07-02-2025/superadmin/${name}/${type}/${yearMonth}/${type}_${uniqueId}.${fileExtension}`;
          break;
        case 'client':
          key = `CRM_07-02-2025/clients/${name}/${type}/${yearMonth}/${type}_${uniqueId}.${fileExtension}`;
          break;
        case 'sub-client':
          key = `CRM_07-02-2025/clients/${i1}/subClients/${name}/${type}/${yearMonth}/${type}_${uniqueId}.${fileExtension}`;
          break;
        case 'employee':
          key = `CRM_07-02-2025/clients/${i1}/employees/${name}/${type}/${yearMonth}/${type}_${uniqueId}.${fileExtension}`;
          break;
        default:
          key = `CRM_07-02-2025/others/${type}/${yearMonth}/${type}_${uniqueId}.${fileExtension}`;
      }
  
      const params = {
        Bucket: s3.config.bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      };
  
      const data = await s3.upload(params).promise();
      return data.Location;
    } catch (error) {
      console.error('S3 Upload Error:', error);
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  };

export default uploadToS3;