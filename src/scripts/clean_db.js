// script to clean the database and drop each table in it
//
const { db } = require('@vercel/postgres');

async function cleanDB(client) {
    try {
        // drop the "concepts" table if it exists
        const dropConcepts = await client.sql`
        DROP TABLE IF EXISTS concepts;
        `;
        return {
        dropConcepts
        };
    } catch (error) {
        console.error('Error cleaning database:', error);
        throw error;
    }
    }

async function main() {
    const client = await db.connect();
    console.log('Connected to database');
    await cleanDB(client);
    console.log('Cleaned database');
    await client.end();
}

main().catch((err) => {
    console.error(
      'An error occurred while attempting to seed the database:',
      err,
    );
  });