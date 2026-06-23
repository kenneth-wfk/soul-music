const { Client, Databases, Storage, ID, Permission, Role, Type } = require('node-appwrite');
const fs = require('fs');
const path = require('path');

// Naive dotenv parser for the workspace root .env.local
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
const storage = new Storage(client);

const DB_ID = 'soulfest_db';

const COLLECTIONS = [
    {
        id: 'customer_profiles',
        name: 'Customer Profiles',
        attributes: [
            { type: 'string', key: 'userId', size: 100, required: true },
            { type: 'string', key: 'email', size: 255, required: true },
            { type: 'string', key: 'fullName', size: 255, required: false },
            { type: 'string', key: 'phoneNumber', size: 50, required: false },
            { type: 'boolean', key: 'isGuest', required: true, default: true }
        ],
        indexes: [
            { key: 'idx_userId', type: 'unique', attributes: ['userId'] },
            { key: 'idx_email', type: 'unique', attributes: ['email'] }
        ]
    },
    {
        id: 'newsfeed',
        name: 'Newsfeed',
        attributes: [
            { type: 'string', key: 'postId', size: 50, required: true },
            { type: 'string', key: 'title', size: 255, required: true },
            { type: 'string', key: 'content', size: 5000, required: true }, 
            { type: 'string', key: 'author', size: 100, required: true },
            { type: 'datetime', key: 'publishedAt', required: true }
        ],
        indexes: [
            { key: 'idx_postId', type: 'unique', attributes: ['postId'] }
        ]
    },
    {
        id: 'newsfeed_images',
        name: 'Newsfeed Images',
        attributes: [
            { type: 'string', key: 'lineId', size: 50, required: true },
            { type: 'string', key: 'postId', size: 50, required: true },
            { type: 'string', key: 'imageUrl', size: 1000, required: true },
            { type: 'boolean', key: 'isCoverImage', required: true, default: false }
        ],
        indexes: [
            { key: 'idx_lineId', type: 'unique', attributes: ['lineId'] },
            { key: 'idx_postId', type: 'key', attributes: ['postId'] }
        ]
    },
    {
        id: 'items',
        name: 'Items',
        attributes: [
            { type: 'string', key: 'itemId', size: 50, required: true },
            { type: 'string', key: 'eventId', size: 50, required: true },
            { type: 'string', key: 'name', size: 100, required: true },
            { type: 'string', key: 'description', size: 1000, required: false },
            { type: 'string', key: 'itemType', size: 20, required: true },
            { type: 'string', key: 'imageUrl', size: 1000, required: false },
            { type: 'float', key: 'price', required: true },
            { type: 'integer', key: 'totalQty', required: true },
            { type: 'integer', key: 'remainingQty', required: true }
        ],
        indexes: [
            { key: 'idx_itemId', type: 'unique', attributes: ['itemId'] },
            { key: 'idx_eventId', type: 'key', attributes: ['eventId'] }
        ]
    },
    {
        id: 'orders',
        name: 'Orders',
        attributes: [
            { type: 'string', key: 'orderId', size: 50, required: true },
            { type: 'string', key: 'orderNo', size: 50, required: true },
            { type: 'datetime', key: 'orderDate', required: true },
            { type: 'string', key: 'userId', size: 100, required: true },
            { type: 'integer', key: 'totalQuantity', required: true },
            { type: 'float', key: 'totalAmount', required: true },
            { type: 'string', key: 'bankSlipFileId', size: 100, required: false },
            { type: 'string', key: 'status', size: 50, required: true },
            { type: 'string', key: 'remarks', size: 2000, required: false },
            { type: 'datetime', key: 'cancelledAt', required: false }
        ],
        indexes: [
            { key: 'idx_orderId', type: 'unique', attributes: ['orderId'] },
            { key: 'idx_userId', type: 'key', attributes: ['userId'] }
        ]
    },
    {
        id: 'order_items',
        name: 'Order Items',
        attributes: [
            { type: 'string', key: 'orderItemId', size: 50, required: true },
            { type: 'string', key: 'orderId', size: 50, required: true },
            { type: 'string', key: 'itemId', size: 50, required: true },
            { type: 'integer', key: 'quantity', required: true },
            { type: 'float', key: 'price', required: true }
        ],
        indexes: [
            { key: 'idx_orderItemId', type: 'unique', attributes: ['orderItemId'] },
            { key: 'idx_orderId', type: 'key', attributes: ['orderId'] }
        ]
    },
    {
        id: 'tickets',
        name: 'Tickets',
        attributes: [
            { type: 'string', key: 'ticketId', size: 50, required: true },
            { type: 'string', key: 'ticketNo', size: 50, required: true },
            { type: 'string', key: 'orderId', size: 50, required: true },
            { type: 'string', key: 'userId', size: 100, required: true },
            { type: 'string', key: 'itemId', size: 50, required: true },
            { type: 'string', key: 'itemName', size: 150, required: true },
            { type: 'string', key: 'qrCodeData', size: 500, required: true },
            { type: 'boolean', key: 'isScanned', required: true, default: false }
        ],
        indexes: [
            { key: 'idx_ticketId', type: 'unique', attributes: ['ticketId'] },
            { key: 'idx_orderId', type: 'key', attributes: ['orderId'] },
            { key: 'idx_userId', type: 'key', attributes: ['userId'] }
        ]
    }
];

const BUCKETS = [
    { id: 'bankSlips', name: 'BankSlips' },
    { id: 'newsGallery', name: 'NewsGallery' }
];


function handleAppwriteError(e, entityType, entityName, parentName = null, throwError = false) {
    if (e.code === 409 || e.code === 400 || (e.message && e.message.includes('already exists'))) {
        if (parentName) {
            console.log(`  - ${entityType} '${entityName}' already exists in ${parentName}.`);
        } else {
            console.log(`- ${entityType} '${entityName}' already exists.`);
        }
    } else {
        if (throwError) {
            console.error(e);
            throw e;
        } else {
            if (parentName) {
                console.error(`! Failed to create ${entityType.toLowerCase()} '${entityName}' in ${parentName}: [${e.code}] ${e.message}`);
            } else {
                console.error(`! Failed to create ${entityType.toLowerCase()} '${entityName}': [${e.code}] ${e.message}`);
            }
        }
    }
}

async function createAttribute(dbId, collId, attr) {
    try {
        if (attr.type === 'string') {
            await databases.createStringAttribute(dbId, collId, attr.key, attr.size, attr.required, attr.default);
        } else if (attr.type === 'integer') {
            await databases.createIntegerAttribute(dbId, collId, attr.key, attr.required, 0, 9999999, attr.default);
        } else if (attr.type === 'float') {
            await databases.createFloatAttribute(dbId, collId, attr.key, attr.required, 0.0, 9999999.99, attr.default);
        } else if (attr.type === 'boolean') {
            await databases.createBooleanAttribute(dbId, collId, attr.key, attr.required, attr.default);
        } else if (attr.type === 'datetime') {
            await databases.createDatetimeAttribute(dbId, collId, attr.key, attr.required, attr.default);
        }
        console.log(`✓ Attribute '${attr.key}' created for ${collId}.`);
    } catch (e) {
        handleAppwriteError(e, 'Attribute', attr.key, collId, false);
    }
}

async function createIndex(dbId, collId, index) {
    try {
        await databases.createIndex(dbId, collId, index.key, index.type, index.attributes);
        console.log(`✓ Index '${index.key}' created for ${collId}.`);
    } catch (e) {
        handleAppwriteError(e, 'Index', index.key, collId, false);
    }
}

async function bootstrap() {
    console.log('🚀 Starting Appwrite Bootstrap...');
    
    // 1. Create DB
    try {
        const dbs = await databases.list();
        if (dbs.databases.some(d => d.$id === DB_ID)) {
            console.log(`- Database '${DB_ID}' already exists.`);
        } else {
            await databases.create(DB_ID, 'Soulfest Database');
            console.log(`✓ Database '${DB_ID}' created.`);
        }
    } catch (e) {
        console.error(e);
        throw e;
    }

    // Wait a brief moment to ensure DB propagates
    await new Promise(r => setTimeout(r, 1000));

    // 2. Create Collections & Attributes
    for (const coll of COLLECTIONS) {
        try {
            const permissions = [
                Permission.read(Role.any()),
                Permission.create(Role.users()),
                Permission.update(Role.users()),
                Permission.delete(Role.users())
            ];
            await databases.createCollection(DB_ID, coll.id, coll.name, permissions);
            console.log(`✓ Collection '${coll.id}' created.`);
        } catch (e) {
            handleAppwriteError(e, 'Collection', coll.id, null, true);
        }

        // Wait a little bit for collection creation to settle (Appwrite async worker)
        await new Promise(res => setTimeout(res, 500));

        // Create Attributes
        for (const attr of coll.attributes) {
            await createAttribute(DB_ID, coll.id, attr);
        }
        
        // Wait for attributes to be Available before making indexes (mandatory Appwrite delay)
        console.log(`Waiting for attributes to be ready before creating indexes in ${coll.id}...`);
        await new Promise(res => setTimeout(res, 3000));
        
        for (const index of coll.indexes) {
            await createIndex(DB_ID, coll.id, index);
        }
    }

    // 3. Create Storage Buckets
    for (const bucket of BUCKETS) {
        try {
            const permissions = [
                Permission.read(Role.any()),
                Permission.create(Role.users()),
                Permission.update(Role.users()),
                Permission.delete(Role.users())
            ];
            await storage.createBucket(bucket.id, bucket.name, permissions, false, false, undefined, ['pdf', 'png', 'jpg', 'jpeg']);
            console.log(`✓ Bucket '${bucket.id}' created.`);
        } catch (e) {
            handleAppwriteError(e, 'Bucket', bucket.id, null, true);
        }
    }

    console.log('🎉 Bootstrap complete!');
}

bootstrap().catch(console.error);
