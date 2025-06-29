const Topic = require('../models/Topic');
const uploadFileToCloudinary = require('../utilities/FileUpload');
require('dotenv').config();


const createTopic = async (req, res) => {
    try {
        console.log("Entered in createTopic")
        const { level, title , subject, imageUrl, pdfUrl}  = req.body

         //validation
    if(!level || !title || !subject ){
        return res.status(400).json({
            message:"All fields are required!",
    
        })
    }

    if(!imageUrl || !pdfUrl){
        return res.status(400).json({
            message:"Image and PDF URLs are required!",
        })  
    }

    // const image = req.files.image;
    // const pdf = req.files.pdf;

    // if(!image || !pdf){
    //     return res.status(400).json({
    //         message:"Files are missing",
            
    //     })
    // }

    //upload files to cloudinary
    // const uploadImage = await uploadFileToCloudinary(image, process.env.FOLDER_NAME);
    // const uploadPdf = await uploadFileToCloudinary(pdf, process.env.FOLDER_NAME);

    //create entry in the DB
    const topic = await Topic.create({
        level,
        subject,
        title,
        imageUrl: imageUrl,
        pdfUrl: pdfUrl
        // imageUrl:uploadImage.secure_url,
        // pdfUrl: uploadPdf.secure_url
    })

    console.log("Topic created");

    res.status(201).json({
        message: "Topic created successfully",
        topic
    })
    } catch (error) {
        res.status(500).json({
            message: "Error creating topic",
            error:error.message
        })
    }

}

module.exports = createTopic;