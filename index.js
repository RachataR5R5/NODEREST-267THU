// โหลดไลบรารี dotenv เพื่อให้สามารถใช้ตัวแปรแวดล้อมจากไฟล์ .env ได้
require("dotenv").config();

// นำเข้าไลบรารี Express ซึ่งเป็นเฟรมเวิร์กสำหรับสร้างเซิร์ฟเวอร์เว็บด้วย Node.js
const express = require("express");

// สร้างอ็อบเจ็กต์แอปพลิเคชัน Express
const app = express();

// กำหนดหมายเลขพอร์ตที่เซิร์ฟเวอร์จะใช้
// ถ้ามีการกำหนดค่า PORT ในไฟล์ .env หรือในตัวแปรแวดล้อมของระบบ จะใช้ค่านั้น
// ถ้าไม่มีค่า PORT จะใช้ค่าเริ่มต้นคือ 3000
const port = process.env.PORT || 3000;

// กำหนดเส้นทาง (route) สำหรับการร้องขอแบบ GET ที่ path "/"
// เมื่อมีการเรียก http://localhost:<port>/ (เช่น http://localhost:3000/)
// ฟังก์ชัน callback จะทำงาน และส่งข้อความ "Hello World!" กลับไปยังผู้ใช้
app.get("/", (req, res) => {
  // ส่งข้อความ "Hello World!" เป็นการตอบกลับไปยัง client
  res.send("Hello World!");
});

// สั่งให้แอปพลิเคชันเริ่มต้นทำงานและรอรับการร้องขอที่พอร์ตที่กำหนด
app.listen(port, () => {
  // แสดงข้อความใน console เพื่อบอกว่าตอนนี้เซิร์ฟเวอร์กำลังทำงานอยู่ที่พอร์ตไหน
  console.log(`Server is listening on http://localhost:${port}`);
});



