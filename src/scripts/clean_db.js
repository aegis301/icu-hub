// script to clean the database and drop each table in it
//
const { db } = require('@vercel/postgres');

async function cleanDB(client) {
    try {
        // drop the "employees" table if it exists
        const dropEmployees = await client.sql`
        DROP TABLE IF EXISTS employees;
        `;
    
        console.log(`Dropped "employees" table`);
    
        // drop the "teams" table if it exists
        const dropTeams = await client.sql`
        DROP TABLE IF EXISTS teams;
        `;
    
        console.log(`Dropped "teams" table`);
    
        // drop the "shift_templates" table if it exists
        const dropShiftTemplates = await client.sql`
        DROP TABLE IF EXISTS shift_templates;
        `;
    
        console.log(`Dropped "shift_templates" table`);
    
        return {
        dropEmployees,
        dropTeams,
        dropShiftTemplates,
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