const db = require('./db');
const fs = require('fs');
const path = require('path');

const initDb = async () => {
    try {
        console.log('Connecting to Aiven PostgreSQL to create table...');
        console.log('Using Host:', process.env.DB_HOST);
        console.log('Using Port:', process.env.DB_PORT);

        const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');

        await db.query(schema);
        console.log('✅ Success: "users" table created or already exists.');

        process.exit(0);
    } catch (err) {
        console.error('❌ Error creating table:');
        console.error(err);
        process.exit(1);
    }
};

initDb();
