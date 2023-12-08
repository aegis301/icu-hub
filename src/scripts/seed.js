const { db } = require('@vercel/postgres');
const { v4: uuidv4 } = require('uuid');
const {
  concepts
} = require('../app/lib/placeholder-data.js');

async function seedConcepts(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "employees" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS concepts (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "concepts" table`);

    // Insert data into the "employees" table
    const insertedConcepts = await Promise.all(
      concepts.map(async (concept) => {
        return client.sql`
        INSERT INTO concepts (id, name)
        VALUES (${concept.id}, ${concept.name});
      `;
      }),
    );

    console.log(`Seeded ${insertedConcepts.length} concepts`);

    return {
      createTable,
      employees: insertedConcepts,
    };
  } catch (error) {
    console.error('Error seeding concepts:', error);
    throw error;
  }
}

function assign_ids(data) {
  data.map((item) => {
    item.id = uuidv4();
    return item;
  });
}

async function main() {
  const client = await db.connect();
  console.log('Connected to Postgres');
  // map new ids for employees
  assign_ids(concepts);

  await seedConcepts(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});