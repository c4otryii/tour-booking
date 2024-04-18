import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
        try {

                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(req.body.password, salt);

                const newUser = new User({
                        username: req.body.username,
                        email: req.body.email,
                        password: hash,
                        photo: req.body.photo
                });

                await newUser.save();

                res.status(200).json({ success: true, message: 'Created successfully' });

        } catch (err) {
                res.status(500).json({ success: false, message: 'Create failed' });
        }
};

export const login = async (req, res) => {
        const { email, password } = req.body;

        try {
                const user = await User.findOne({ email });
                // nếu người dùng không tồn tại
                if (!user) {
                        return res.status(404).json({ success: false, message: 'User not found!' });
                }
                // nếu người dùng tồn tại thì kiểm tra mật khẩu
                const checkCorrectPassword = await bcrypt.compare(
                        req.body.password,
                        user.password
                );
                // nếu mật khẩu không đúng
                if (!checkCorrectPassword) {
                        return res.status(401).json({ success: false, message: 'Email or Password is incorrect' });
                }

                const { password: userPassword, role, ...rest } = user._doc;
                // hàm khởi tạo token với jwt
                const token = jwt.sign(
                        { id: user._id, role: user.role },
                        process.env.JWT_SECRET_KEY,
                        { expiresIn: '15d' }
                );
                // tạo 1 cookie chứa thông tin truy cập và tả về phản hồi JSON cho người dùng
                res.cookie('accessToken', token, {
                        httpOnly: true,
                        expiresIn: '15d'
                }).status(200).json({
                        token,
                        data: { ...rest },
                        role
                });
        } catch (error) {
                res.status(500).json({ success: false, message: 'Failed to login' });
        }
};
