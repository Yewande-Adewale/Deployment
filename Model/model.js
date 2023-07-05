const mongoose = require('mongoose')

const familySchema = mongoose.Schema({
    fatherName: {
            type: String,
            required: true
},
    motherName: {
            type: String,
            required: true
},
    children: { 
        type: Array,
        required: true
},
    childrenImages: {
        type: Array,
        required: true
}

}, {timestamps: true})

const familyModel = mongoose.model("Family", familySchema)

module.exports = familyModel