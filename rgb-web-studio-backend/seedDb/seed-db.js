const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const faker = require("@faker-js/faker");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const path = require("path");
const File = require("../src/models/File");
const User = require("../src/models/User");

async function Seed() {
  const mockFile = fs.readFileSync("./seedDb/lorem_ipsum.pdf");
  const mockFileStat = fs.statSync("./seedDb/lorem_ipsum.pdf");

  await mongoose
    .connect(process.env.DB_CONNECTION)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Failed to connect to MongoDB", err));

  const addUser = async () => {
    const u = new User({ name: faker.fakerEN.person.fullName() });
    return await u.save();
  };

  const addFile = async (userId, amount) => {
    const data = await pdfParse(mockFile);
    const newDirectory = path.join(__dirname, `../src/uploads/user_${userId}`);
    const files = [];
    for (let i = 0; i < amount; i++) {
      const newFileName = `${faker.fakerEN.person.firstName()}.pdf`;
      const newPath = path.join(newDirectory, newFileName);
      if (!fs.existsSync(newDirectory)) {
        fs.mkdirSync(newDirectory, { recursive: true });
      }
      fs.copyFileSync("./seedDb/lorem_ipsum.pdf", newPath);
      const newFileData = {
        filename: newFileName,
        size: mockFileStat.size,
        pages: data.numpages,
        format: "application/pdf",
        path: newPath,
        user: userId,
      };
      const newFile = new File(newFileData);
      await newFile.save();
      files.push(newFile);
    }
    return files;
  };

  const u = await addUser();
  const files = await addFile(u._id, 7);
  u.files.push(...files.map((x) => x._id));
  await u.save();
  mongoose.connection.close();
}

Seed();
