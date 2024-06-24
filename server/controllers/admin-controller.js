const User = require("../models/user-model");
const Contact = require("../models/contactSchema");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, {password:0});
        console.log(users);
        if(!users || users.length === 0) {
            return res.status(404).json({message: "No Users Found"});
        }
      return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};


const getAllContacts = async (req,res) => {
    try {
        const contacts = await Contact.find();
        console.log(contacts);
        if (!contacts || contacts.lenghth === 0 ) {
            return res.status(404).json( { message: "No contacts Found "});
        }
        return res.status(200).json(contacts);
    } catch (error)
    {
        next(error);
    }
}; 

const deleteUserById = async (req,res) => {
    try {
        const id = req.params.id; //for getting id(parameter) from frontend
        await User.deleteOne({ _id: id});
        return res.status(200).json({message: "User Deleted Successfully"});
    } catch (error) {
        next(error);
    }
};

const getUserById = async (req,res) => {
    try {
        const id = req.params.id; //for getting id(parameter) from frontend
        const data = await User.findOne({_id:id}, {password: 0});
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

const updateUserById = async (req,res) => {
    try {
         const id = req.params.id;
         const updateUserData = req.body;

         const updatedData = await User.updateOne(
            {_id: id},
            {
                $set: updateUserData,
            }
         );
        return res.status(200).json(updatedData);
    } catch (error) {
        next(error);
    }
}

const deleteContactById = async (req,res) => {
    try {
        const id = req.params.id; //for getting id(parameter) from frontend
        await Contact.deleteOne({ _id: id});
        return res.status(200).json({message: "Contact Deleted Successfully"});
    } catch (error) {
        next(error);
    }
};


module.exports = {getAllUsers, getAllContacts, deleteUserById, getUserById, updateUserById,deleteContactById};