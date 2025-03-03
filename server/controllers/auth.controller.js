const BaseController = require("./Base.controller.js");
const db = require("../models");
const { Op, where } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserRepo = require("../repos/UserRepo.js");
const { validateLoginUser } = require("../validators/AuthValidator.js");
const { jwtSecret } = require("../config/config.js");
const crypto = require("crypto");
const transporter = require("../utils/email.js");
const { constants } = require("../utils/constant.js");

//ibad: do not create custom response in controller, delete password from response

class AuthController extends BaseController {
  // constructor() {
  //   super();
  // }

  // will refactor
  signToken = (userResponse) => {
    return jwt.sign({ data: userResponse }, jwtSecret, {
      expiresIn: constants.expiresIn,
    });
  };

  loginUser = async (req, res) => {
    const validationResult = validateLoginUser(req?.body);

    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }

    const { email, password } = req.body;

    const customQuery = {
      where: { email },
    };

    const user = await UserRepo?.findUserWithInclude(customQuery);

    if (!user) {
      return this.errorResponse(res, "User not found", 400);
    }

    const passwordMatch = await bcrypt.compare(password, user?.password);

    if (!passwordMatch) {
      return this.errorResponse(res, "Invalid credentials", 400);
    }

    user.password = undefined;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    let token = this.signToken(JSON.stringify(user));

    return this.successResponse(res, { user, token }, "login Successful");
  };

  signUpUser = async (req, res) => {
    const { contactNo, password, ...otherFields } = req.body;

    const userExist = await UserRepo?.findUser({
      email: otherFields.email,
    });

    if (userExist) {
      return this.errorResponse(res, "User already exist", 400);
    }

    const newPassword = await bcrypt.hash(
      password,
      Number(constants.saltRounds)
    );

    otherFields.password = newPassword;

    const user = await UserRepo?.createUser(otherFields);

    if (!user) return this.errorResponse(res, "User not created", 400);

    user.password = undefined;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    return this.successResponse(res, user, "User created successfully");
  };

  changePassword = async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;

    if (!email || !newPassword || !oldPassword) {
      return this.validationErrorResponse(
        res,
        "Email, old password, and new password are required"
      );
    }

    if (oldPassword === newPassword) {
      return this.errorResponse(
        res,
        "New Password should not equal to old Password",
        200
      );
    }

    const customQuery = {
      email,
      include: [
        {
          model: db.Role,
          as: "role",
          attributes: ["name"],
        },
        {
          model: db.Designation,
          as: "designation",
          attributes: ["name"],
        },
      ],
    };

    const user = await UserRepo?.findUserWithInclude(customQuery);

    if (!user) {
      return this.errorResponse(res, "User not found", 200);
    }

    const passwordMatch = await bcrypt.compare(oldPassword, user?.password);

    if (!passwordMatch) {
      return this.errorResponse(res, "Invalid old password", 401);
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      Number(process.env.SALT_ROUNDS)
    );

    const updatedUser = await UserRepo?.updateUser(
      { password: hashedPassword },
      user?.id
    );

    user.isNewUser = false;

    const userObject = updatedUser.toJSON();

    delete userObject.password;
    delete userObject.resetPasswordToken;
    delete userObject.resetPasswordExpires;

    return this.successResponse(
      res,
      userObject,
      "Password changed successfully"
    );
  };

  forgetPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
      return this.validationErrorResponse(res, "Email is required");
    }

    const customQuery = {
      where: { email },
    };

    const user = await UserRepo?.findUserWithInclude(customQuery);

    if (!user) {
      return this.errorResponse(res, "User not found", 200);
    }

    const resetToken = crypto.randomBytes(constants.hexCode).toString("hex");

    const encryptedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = encryptedToken;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;

    await user.save({
      validateBeforeSave: false,
    });

    const resetLink = `${constants.frontEndUrl}/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Password reset link",
      html: `
        <body
          style="
            padding: 0;
            margin: 0;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
              Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
              sans-serif;
          "
        >
          <div>
            <div
              style="
                display: flex;
                justify-content: center;
                background-color: rgb(241, 241, 241);
                padding-bottom: 1rem;
                padding-top: 1rem;
              "
            >
              <img src="../images/Solcoders-Logo.png" style="width: 10rem" />
            </div>
            <div style="padding-left: 2rem; padding-right: 2rem; padding-top: 1rem">
              <h1 style="font-size: 40px">Reset Passsword</h1>
              <p style="font-size: 18px">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam, odio.
              </p>
              <p style="font-size: 18px">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. In quisquam
                corporis accusantium provident, natus nesciunt? Nisi dicta, sit
                sapiente et cum harum commodi distinctio, voluptas earum consectetur
                dolorum voluptate voluptatem saepe dignissimos aliquam sint nobis
                iste, nam fuga obcaecati fugit.
              </p>
              <a 
              href="${resetLink}" 
              style="
                display: inline-block;
                font-size: 12px;
                color: white;
                background-color: red;
                text-decoration: none;
                padding: 8px 16px;
                border-radius: 5px;
              "
              target="_blank"
              rel="noopener noreferrer"
            >
              Reset Password
            </a>    
              </p>
            </div>
          </div>
        </body>
        `,
    };

    await transporter.sendMail(mailOptions);

    return this.successResponse(res, {}, "Resent link sent successful");
  };

  resetPasswordWithToken = async (req, res) => {
    const { token } = req.query;
    const { newPassword } = req.body;

    if (!token || !newPassword) {
      return this.validationErrorResponse(
        res,
        "Token and new password are required"
      );
    }

    const encryptedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const customQuery = {
      resetPasswordToken: encryptedToken,
      resetPasswordExpires: {
        [Op.gt]: Date.now(),
      },
    };

    const user = await UserRepo?.findUser(customQuery);

    if (!user || user?.resetPasswordExpires < Date.now()) {
      return this.errorResponse(res, "Token is invalid or has expired", 400);
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      Number(process.env.SALT_ROUNDS)
    );

    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user?.save();
    await UserRepo?.updateUser({ isNewUser: false }, user?.id);

    return this.successResponse(res, {}, "Password reset successfully");
  };
}

module.exports = new AuthController();
