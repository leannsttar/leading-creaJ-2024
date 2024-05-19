import express from "express";
import userRoutes from "../src/routes/register-route";
import cors from "cors";
import { auth } from "./middleware/auth";

const app = express();
app.use(cors());
app.use(express.json());

// la ruta de los usuarios en cuestión (solo el registro)
app.use("/api/users", userRoutes);

app.listen(5000, () => {
  console.log(`Servidor funcionando en el puerto ${5000}`);
});

// const prisma = new PrismaClient()

// async function main() {
//     const newUser = await prisma.users.delete({
//         where: {
//             email: "tick@brawl.com",

//         }
//     })
//     console.log(newUser)
// }

// main()
