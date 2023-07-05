const express = require ("express")
const familyModel = require ("../Model/model")
const fs = require('fs');


//function to create a new family profile
const family = async (req,res)=>{
    const {fatherName, motherName, children} = req.body;
    const familyProfile = new familyModel({
        fatherName,
        motherName,
        children,
        childrenImages: req.files[ "childrenImages" ][ 0 ].filename,
        children: req.files[ "children" ].map((child)=>child.filename),
    });

    try{
       const familyInfo = await familyProfile.save();
        if(familyInfo){
        res.status(201).json({
            message: 'family info has been created succesfully',
            data: familyInfo
        })
    }else{
        res.status(400).json({
            message: 'family info could not be created',
        })

    }

    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

//function to get one family information
async function oneFamily(req,res){
    try{
        const familyId = req.params.id;
        const FamilyInfo = await familyModel.findById(familyId)
        if(!FamilyInfo){
            res.status(404).json({
                message: "family information not found",

            })
        }else{
            res.status(200).json({
                message: "family information found",
                data: FamilyInfo
            })
        }
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

//function to get all
const allFamily=async(req,res)=>{
    try{
        const allFamily = await familyModel.find()
        if(allFamily.length === 0){
        res.status(404).json({
            message: " No family information found ",
        })

    }else{
        res.status(200).json({
            message: "All Family information created successfully",
            data: allFamily

        })
    }

    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

//function to update family information
const update = async(req,res)=>{
    const familyId = req.params.id;
    const familyInfo = await familyModel.findById(familyId);
    
    try{
        const {fatherName, motherName, children } = req.body;
        const updateFields = {
            fatherName: fatherName || familyInfo.fatherName,
            motherName: motherName || familyInfo.motherName,
            chlidren: children || familyInfo.children,
            childrenImages: familyInfo.childrenImages,
        };

        //check to see if the childrenImages is to be updated
        if(req.files && req.files["childrenImages"]){
            const oldChildrenImagesPath = `uploads/${familyInfo.childrenImages}`;

            //Deleting an existing old images
            if(fs.existsSync(oldChildrenImagesPath)){
                fs.unlinkSync(oldChildrenImagesPath);
            }
        
        updateFields.childrenImages = req.files.childrenImages[0].filename;
    }

    const update = await familyModel.findByIdAndUpdate(familyId,updateFields,
        {new: true}
);
 console.log(update)

 if(update){
    res.status(200).json({
        message: 'family information updated successfully',
        data: update
    });

 }else{
    res.status(404).json({
        message: "no family information found",
    })
 }

}catch(error){
    res.status(500).json({
        message: error.message,
    })
}
}


 

module.exports =
{
    family,
    oneFamily,
    allFamily,
    update
}