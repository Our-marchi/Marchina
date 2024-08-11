const { db } = require('../../database/index');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;


const signUp = async (req, res) => {
    try {
        const { firstName,  email, role, password } = req.body;
        console.log('Signup request received:', req.body)

        const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[^_\s]{6,}$/.test(password);
        const existingUser = await db.User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).send({ message: 'Email already in use' });
        }

        if (!isPasswordValid) {
            return res.status(400).send({ message: 'Password does not meet the criteria' });
        }

        const newUser = await db.User.create({
            firstName,
            lastName:"lastName",
            email,
            role,
            password: await bcrypt.hash(password, 10),
            adress: 'Ariana',
            status: 'active'
        });
const secret = "hellohibye"

        const token = jwt.sign(
            { 
                userid: newUser.userid, 
                email: newUser.email,
                firstName: newUser.firstName,
                role: newUser.role,
                adress: newUser.adress,
                status: newUser.status,
                lastName: newUser.lastName
            },secret)
          
        console.log('JWT signed successfully')
        res.status(201).send(token);
    } catch (err) {
        console.error('Detailed error in signUp:', err);
       
    }
};

const logIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await db.User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).send({ message: 'Email not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userid: user.userid, email: user.email, firstName: user.firstName , role: user.role , adress: user.adress , status: user.status , lastName: user.lastName }, secret);
        res.send({ token });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Server error', error: err.message });
    }
};

const deleteuser = async (req, res) => {
    try {
        let id = req.params.userid;

        await db.User.destroy({
            where: {
                userid: id
            }
        });

        res.status(200).send('Deleted user item with ID:' + id);
    } catch (error) {
        console.error('Error deleting user item:', error);
        res.status(500).send({ error: 'An error occurred while deleting user item' });
    }
};

const updateUser = async (req, res) => {
    try {
        const id = req.params.userid;
        const { role } = req.body; // Get the role from the request body

        const user = await db.User.findOne({ where: { userid: id } });

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        user.role = role; // Update the role
        await user.save();

        res.send({ message: 'User role updated successfully', user });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Server error', error: err.message });
    }
};
const makeAdmin = async (req, res) => {
    try {
        const id = req.params.userid;
        const user = await db.User.findOne({ where: { userid: id } });

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        user.role = 'admin';
        await user.save();

        res.send({ message: 'Hello admin', user });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'you can/t be an admin , serve side', error: err.message });
    }
};
const updatePassword = async (req, res) => {
    try {
        const { email, currentPassword, newPassword } = req.body;
        const user = await db.User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[^_\s]{6,}$/.test(newPassword);
        if (!isPasswordValid) {
            return res.status(400).send({ message: 'New password does not meet the criteria' });
        }

        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isCurrentPasswordValid) {
            return res.status(401).send({ message: 'Current password is incorrect' });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await db.User.update({ password: hashedNewPassword }, { where: { userid: user.userid } });

        res.send({ message: 'Password updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Server error', error: err.message });
    }

   
};
const getAllUsers = async (req, res) => {
    const users = await db.User.findAll();
    res.send(users);
};

module.exports = { makeAdmin,signUp, logIn, deleteuser, updateUser, updatePassword, getAllUsers };