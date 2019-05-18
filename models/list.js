const mongoose = require("mongoose")
const passportLocalMongoose = require('passport-local-mongoose')
const listSchema = new mongoose.Schema({

	 title:{
	 	type: String,
		require: 'Please fill the Title!'
	 },

	 listCreatedDate:{
		type: Date,
		default: Date.now
	 },

	 todos:[{
	 	index:{
		 	type: Number
	    },
	 	name:{
		 	type: String,
			require: 'Please fill the Name!'
	    },

	    completed:{
			type:Boolean,
			default: false
	    },

		todoCreatedDate:{
			type: Date,
			default: Date.now
		}

	 }],

	 collaborators:[{
		id : String,
		canView : {
			type: Boolean,
			default: true },
		canCreate : {
			type: Boolean,
			default: false },
		canEdit : {
			type: Boolean,
			default: false },
		canDelete : {
			type: Boolean,
			default: false },
		canChangeOrder : {
			type: Boolean,
			default: false },
	}]
})

const List = mongoose.model('List', listSchema)

var UserSchema  =  new mongoose.Schema(
       {
       	 username:String,
         password:String,
         mail: String, 
         lists:[listSchema]
      });

UserSchema.plugin(passportLocalMongoose);
let User = mongoose.model("User",UserSchema);



module.exports =  User