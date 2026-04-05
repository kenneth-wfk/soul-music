# Appwrite Database Operations & Migrations

This monorepo utilizes an infrastructure-as-code pattern to bootstrap and manage the Appwrite backend services for the Soulfest platform. The core initialization script resides at `packages/core-logic/src/bootstrap.js`.

## How Schema Evolution (Migrations) Works

Because we built `bootstrap.js` as an **idempotent** script with robust `try/catch` checks, handling database changes is extremely safe and straightforward.

### 1. Adding New Attributes or Collections (Additive Changes)
If you need to expand your schema (e.g., adding `dateOfBirth` to your users), simply add the new attribute definition array inside the `COLLECTIONS` registry located in `packages/core-logic/src/bootstrap.js`:

```javascript
{ type: 'datetime', key: 'dateOfBirth', required: false }
```

Once saved, simply run the bootstrap command in your terminal from the root of the project:
```bash
node packages/core-logic/src/bootstrap.js
```

The script will scan the live database, bypass any existing attributes safely (logging `- Attribute already exists`), and when it hits your missing `dateOfBirth` field, it will inject it directly into the remote Appwrite backend **without touching or erasing your existing user data!**

### 2. Modifying or Deleting Attributes (Destructive Changes)
If you need to rename a field or completely delete an attribute, it is safest to perform this action manually inside the **Appwrite Cloud web console**. 

Because deleting an attribute actively destroys all the underlying data for that column in MariaDB, Appwrite requires you to aggressively confirm the deletion. 
1. Delete the attribute through the Appwrite dashboard.
2. Remove the corresponding attribute from the `bootstrap.js` file to keep your local codebase in sync with the remote source-of-truth.

### 3. Data Safety Guarantees
Running the `bootstrap.js` script will **only** alter infrastructure: schema structures, permissions, and indexes. None of the checkout orders, generated tickets, stored images, or user profiles currently residing in your Appwrite instance will be purged or modified by running the script.

By maintaining our database structure defined in actual code, anyone setting up the backend locally or across different deployment tiers can instantly reconstruct the entire database simply by executing `bootstrap.js` alongside their scoped `.env.local` keys!
