require('dotenv').config();
const mongoose = require( 'mongoose' );


mongoose.connect( 'mongodb://localhost/FamilyProfile' ).then( () => {
    console.log("Database connection successful")
} ).catch( () => {
    console.log("Database connection failed")
});