const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors') 
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with the actual origin of your client app
  credentials: true,
  methods:'GET'
};

const cookieParser = require('cookie-parser');

connectToMongo();
const app = express()
const port = 5000
app.use(cors(corsOptions))

app.use(cookieParser());

app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/auth'))
//app.use('/api/prefs', require('./routes/prefs'))


app.listen(port, () => {
  console.log(`user-prefs backend listening at http://localhost:${port}`)
})