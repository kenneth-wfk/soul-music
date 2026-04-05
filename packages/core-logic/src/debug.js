const { Client, Databases, Storage } = require('node-appwrite');
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '../../../.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) env[match[1].trim()] = match[2].trim().replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
});

const client = new Client()
    .setEndpoint(env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(env.APPWRITE_API_KEY);

const databases = new Databases(client);

async function run() {
    try {
        console.log('Sending list DBs...');
        const dbs = await databases.list();
        console.log('Databases:', dbs.databases.map(d => d.$id));
        
        for (const db of dbs.databases) {
            console.log('Collections for', db.$id);
            const colls = await databases.listCollections(db.$id);
            for (const c of colls.collections) {
                console.log(`  - ${c.$id} (${c.name})`);
                const attrs = await databases.listAttributes(db.$id, c.$id);
                console.log(`      Attributes: ${attrs.total}`);
            }
        }
    } catch (e) {
        console.error(e);
    }
}
run();
