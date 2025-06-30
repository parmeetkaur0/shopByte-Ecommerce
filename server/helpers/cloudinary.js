const cloudinary = require("cloudinary").v2;
const multer = require("multer");

   cloudinary.config({ 
        cloud_name: 'dxooh5ues', 
        api_key: '961935115478774', 
        api_secret: 'IPJzTmq3GsMXmQoCVbWCkHV8rl8' // Click 'View API Keys' above to copy your API secret
    });
    

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };
