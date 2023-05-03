const express = require('express');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();