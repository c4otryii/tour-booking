import User from '../models/Tour.js';


export const createUser = async (req, res) => {
        const newUser = new User(req.body);

        try {
                const savedUser = await newUser.save();
                res.status(200).json({
                        success: true,
                        message: "User created successfully",
                        data: savedUser
                });
        } catch (err) {
                res.status(500).json({
                        success: false,
                        message: "Failed to create User"
                });
        }
};

export const updateUser = async (req, res) => {

        const id = req.params.id

        try {
                const updateUser = await User.findByIdAndUpdate(id, {
                        $set: req.body
                }, { new: true })
                res.status(200).json({
                        success: true,
                        message: "Updated successfully",
                        data: updateUser
                });

        } catch (err) {
                res.status(500).json({
                        success: false,
                        message: "Updated failed",
                });
        }
};

export const deleteUser = async (req, res) => {
        const id = req.params.id

        try {
                await User.findByIdAndDelete(id);
                res.status(200).json({
                        success: true,
                        message: "Deleted successfully"
                });

        } catch (err) {
                res.status(500).json({
                        success: false,
                        message: "Deleted failed",
                });
        }
};

export const getSingleUser = async (req, res) => {
        const id = req.params.id

        try {
                const user = await User.findById(id);
                res.status(200).json({
                        success: true,
                        message: "Successful",
                        data: user
                });

        } catch (err) {
                res.status(404).json({
                        success: false,
                        message: "Not found User",
                });
        }
};

export const getAllUser = async (req, res) => {


        try {
                const users = await User.find({});

                res.status(200).json({
                        success: true,
                        message: "Successful",
                        data: users
                });
        } catch (err) {
                res.status(404).json({
                        success: false,
                        message: "Not found User",
                });
        }
};