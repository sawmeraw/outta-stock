const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotnev").config();
const app = express();

//CORS
app.use(cors());
