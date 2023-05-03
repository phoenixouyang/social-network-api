const { connect, connection } = require('mongoose');

const connectionString = 
    process.emitWarning.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialDB';

    connect(connectionString);

    module.exports = connection;