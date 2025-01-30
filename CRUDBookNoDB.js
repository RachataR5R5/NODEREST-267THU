// Description: CRUD Book No DB
// npm install express
// Run this file with node CRUDBookNoDB.js
// Test with Postman

// ใช้ dotenv เพื่อโหลดข้อมูล environment variable จากไฟล์ .env
require("dotenv").config();

// นำเข้า express library
const express = require("express");

// สร้างแอป express
const app = express();

// กำหนดให้แอปสามารถแปลงข้อมูล JSON ที่มาจาก request body ได้
app.use(express.json());

// route สำหรับ root path ที่จะส่งข้อความทักทายกลับไป
app.get("/", (req, res) => {
  res.send("Welcome to the Book API");
});

// ตัวอย่างข้อมูลหนังสือที่ใช้สำหรับทดสอบ (ในที่นี้ไม่มีฐานข้อมูล)
let books = [
  {
    id: 1,
    title: "Book 1",
    author: "Author 1",
  },
  {
    id: 2,
    title: "Book 2",
    author: "Author 2",
  },
  {
    id: 3,
    title: "Book 3",
    author: "Author 3",
  },
];

// route สำหรับดึงข้อมูลหนังสือทั้งหมด
app.get("/books", (req, res) => {
  // ส่งข้อมูลทั้งหมดของหนังสือกลับไปในรูปแบบ JSON
  res.json(books);
});

// route สำหรับดึงข้อมูลหนังสือโดยใช้ id
app.get("/books/:id", (req, res) => {
  // ค้นหาหนังสือจาก id ที่ระบุใน URL
  const book = books.find((b) => b.id === parseInt(req.params.id));
  // หากไม่พบให้ตอบกลับสถานะ 404 และข้อความว่าไม่พบหนังสือ
  if (!book) return res.status(404).send("Book not found");
  // ส่งข้อมูลของหนังสือที่พบกลับไป
  res.json(book);
});

// route สำหรับเพิ่มหนังสือใหม่
app.post("/books", (req, res) => {
  // สร้างหนังสือใหม่จากข้อมูลที่ส่งมาใน body
  const book = {
    id: books.length + 1, // ตั้ง id โดยใช้จำนวนของหนังสือที่มีอยู่แล้วบวก 1
    title: req.body.title, // ใช้ข้อมูล title จาก body
    author: req.body.author, // ใช้ข้อมูล author จาก body
  };
  // เพิ่มหนังสือใหม่เข้าไปในอาเรย์ books
  books.push(book);
  // ส่งข้อมูลของหนังสือที่เพิ่มไปแล้วกลับไป
  res.send(book);
});

// route สำหรับแก้ไขข้อมูลหนังสือ
app.put("/books/:id", (req, res) => {
  // ค้นหาหนังสือที่ต้องการแก้ไขจาก id
  const book = books.find((b) => b.id === parseInt(req.params.id));
  // หากไม่พบให้ตอบกลับสถานะ 404 และข้อความว่าไม่พบหนังสือ
  if (!book) return res.status(404).send("Book not found");

  // แก้ไขข้อมูลของหนังสือ
  book.title = req.body.title;
  book.author = req.body.author;
  // ส่งข้อมูลของหนังสือที่แก้ไขแล้วกลับไป
  res.send(book);
});

// route สำหรับลบหนังสือ
app.delete("/books/:id", (req, res) => {
  // ค้นหาหนังสือที่ต้องการลบจาก id
  const book = books.find((b) => b.id === parseInt(req.params.id));
  // หากไม่พบให้ตอบกลับสถานะ 404 และข้อความว่าไม่พบหนังสือ
  if (!book) return res.status(404).send("Book not found");

  // ค้นหาตำแหน่งของหนังสือในอาเรย์ และลบออก
  const index = books.indexOf(book);
  books.splice(index, 1); // ลบหนังสือออกจากอาเรย์
  // ส่งข้อมูลของหนังสือที่ถูกลบกลับไป
  res.send(book);
});

// กำหนดพอร์ตสำหรับให้เซิร์ฟเวอร์ทำงาน
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
