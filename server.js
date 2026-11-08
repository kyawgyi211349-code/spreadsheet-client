const express = require('http'); // (သို့မဟုတ် const express = require('express');)
const fs = require('fs');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const DATA_FILE = path.join(__dirname, 'spreadsheet_data.json');

// ၁။ ဆာဗာစတင်ချိန်မှာ ယခင်သိမ်းထားသော Data ရှိမရှိ စစ်ဆေးပြီး ပို့ပေးရန်
app.get('/api/spreadsheet', (req, res) => {
  if (fs.existsSync(DATA_FILE)) {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    try {
      res.json(JSON.parse(data));
    } catch (err) {
      res.json([]);
    }
  } else {
    res.json([]);
  }
});

// ၂။ Socket.io ချိတ်ဆက်မှုနှင့် Auto-save လုပ်ဆောင်ချက်
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Client ဘက်က ဇယားကွက် အချက်အလက် ပို့လာတဲ့အခါ
  socket.on('save_sheet', (sheetData) => {
    // spreadsheet_data.json ဖိုင်ထဲသို့ အလိုအလျောက် ရေးသားသိမ်းဆည်းခြင်း
    fs.writeFile(DATA_FILE, JSON.stringify(sheetData, null, 2), (err) => {
      if (err) {
        console.error('Error saving data:', err);
      } else {
        // အခြားချိတ်ဆက်ထားသော User တွေဆီသို့ပါ Data အသစ်ကို ချက်ချင်း ဖြန့်ဝေပေးခြင်း (Real-time sync)
        socket.broadcast.emit('update_sheet', sheetData);
      }
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});