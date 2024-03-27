const hbs = require('nodemailer-express-handlebars')
const nodemailer = require('nodemailer');
const User = require('../models/user.model')
const path = require('path')


const sendEmailtoTeacher = async (teacher, student, timetable) => {

    const userInfo = await User.findByPk(parseInt(teacher.dataValues.user_Id))

    const transporter = nodemailer.createTransport({
        port: 465,
        Service: process.env.MAIL_SERVICE,
        host: "smtp.gmail.com",
        auth: {
            user: "orderlessons@gmail.com",
            pass: "nkvy qjyk yujj sewq"
        }
    });

    
    
    const handlebarOptions = {
        viewEngine: {
            partialsDir: path.resolve(__dirname,'../views/emailTemplates'),
            defaultLayout: false,
        },
        viewPath: path.resolve(__dirname,'../views/emailTemplates'),
    };

    transporter.use('compile', hbs(handlebarOptions))

     const mailOptions = {
        from: "orderlessons@gmail.com", // sender address
        template: "email", // the name of the template file, i.e., email.handlebars
        to: student.dataValues.email,
        subject: `You have a new Class, ${userInfo.dataValues.firstName}`,
        context: {
            username: userInfo.dataValues.firstName,
            studentName: student.dataValues.firstName +" "+  student.dataValues.lastName,
            date: timetable.dataValues.date,
            time: timetable.dataValues.time
        }
    }
    try {
        await transporter.sendMail(mailOptions);
      } catch (error) {
        console.log(`Nodemailer error sending email`, error);
      }
}


module.exports= sendEmailtoTeacher