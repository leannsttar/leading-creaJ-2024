import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);

  const hashedPassword = await bcrypt.hash(password, 10);
  const confirmationToken = uuidv4();

  try {
    const user = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
        image:
          "https://res.cloudinary.com/dv79d6y4e/image/upload/f_auto,q_auto/avatarDefault",
        confirmed: false,
        confirmationToken: confirmationToken,
      },
    });

    const confirmationUrl = `http://localhost:5000/api/users/confirm?token=${confirmationToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Confirmación de Registro",
      html: `
   <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #000;
      margin: 0;
      padding: 0;
      color: #fff;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #1a1a1a;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
      text-align: center;
    }
    .header img {
      width: 100px;
      margin-bottom: 20px;
    }
    .header h1 {
      font-size: 24px;
      margin: 0;
      color: #fff;
    }
    .content p {
      font-size: 16px;
      color: #ccc;
      margin: 20px 0;
    }
    .button {
      display: inline-block;
      padding: 15px 30px;
      font-size: 18px;
      color: #000;
      background-color: #fff;
      text-decoration: none;
      border-radius: 4px;
      font-weight: bold;
    }
    .footer {
      margin-top: 30px;
      font-size: 14px;
      color: #666;
    }
    .footer p {
      margin: 5px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://res.cloudinary.com/dv79d6y4e/image/upload/v1724385713/ir0dprqg5sbztbzqdjdb.png" alt="Logo">
      <h1>Confirmación de Registro</h1>
    </div>
    <div class="content">
      <p>Hola ${name},</p>
      <p>Gracias por registrarte en nuestro sitio. Para completar el registro, por favor confirma tu correo electrónico haciendo clic en el siguiente enlace:</p>
      <a href="${
        process.env.FRONTEND_URL
      }/verifyAccount?token=${confirmationToken}" class="button">Confirmar Correo</a>
    </div>
    <div class="footer">
      <p>Si no te has registrado en nuestro sitio, por favor ignora este mensaje.</p>
      <p>&copy; ${new Date().getFullYear()} Leading. Todos los derechos reservados.</p>
    </div>
  </div>
</body>
</html>

  `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .json({ error: "Error al enviar el correo de confirmación" });
      }
      res.status(201).json({
        message:
          "Usuario creado. Por favor, revisa tu correo para confirmar tu cuenta.",
      });
    });
  } catch (error) {
    res.status(400).json({ error: "Algo pasó" });
    console.log(error);
  }
};

export const resendEmail = async (req, res) => {
  const { email, name } = req.body;

  try {
    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    if (user.confirmed) {
      return res.status(400).json({ error: "El correo ya está confirmado" });
    }

    const confirmationToken = user.confirmationToken;
    const confirmationUrl = `http://localhost:5000/api/users/confirm?token=${confirmationToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Confirmación de Registro",
      html: `
      <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #000;
      margin: 0;
      padding: 0;
      color: #fff;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #1a1a1a;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
      text-align: center;
    }
    .header img {
      width: 100px;
      margin-bottom: 20px;
    }
    .header h1 {
      font-size: 24px;
      margin: 0;
      color: #fff;
    }
    .content p {
      font-size: 16px;
      color: #ccc;
      margin: 20px 0;
    }
    .button {
      display: inline-block;
      padding: 15px 30px;
      font-size: 18px;
      color: #000;
      background-color: #fff;
      text-decoration: none;
      border-radius: 4px;
      font-weight: bold;
    }
    .footer {
      margin-top: 30px;
      font-size: 14px;
      color: #666;
    }
    .footer p {
      margin: 5px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://res.cloudinary.com/dv79d6y4e/image/upload/v1724385713/ir0dprqg5sbztbzqdjdb.png  " alt="Logo">
      <h1>Confirmación de Registro</h1>
    </div>
    <div class="content">
      <p>Hola ${name},</p>
      <p>Gracias por registrarte en nuestro sitio. Para completar el registro, por favor confirma tu correo electrónico haciendo clic en el siguiente enlace:</p>
      <a href="${
        process.env.FRONTEND_URL
      }/verifyAccount?token=${confirmationToken}" class="button">Confirmar Correo</a>
    </div>
    <div class="footer">
      <p>Si no te has registrado en nuestro sitio, por favor ignora este mensaje.</p>
      <p>&copy; ${new Date().getFullYear()} Leading. Todos los derechos reservados.</p>
    </div>
  </div>
</body>
</html>
      `,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({ message: "Correo de confirmación reenviado con éxito" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al reenviar el correo de confirmación" });
    console.log(error);
  }
};
