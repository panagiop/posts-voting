## Getting Started

### Local development
For local development create a ```.env``` file as follows:
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=6b87d831cf000cc9755b9869cabe514d8bfc0e241e5f2ec4dc83a5e0d004bbeb
POSTGRES_USER=test1234
POSTGRES_PASSWORD=hajksdg7ASFAT
POSTGRES_DB=post-votes-db
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}?schema=public&connect_timeout=500"
```

Make sure a PostgreSQL is installed and after that create a DB with the above credentials

Then, run the local development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### For Production 
For production create a ```.env.prod``` file as follows:
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=6b87d831cf000cc9755b9869cabe514d8bfc0e241e5f2ec4dc83a5e0d004bbeb
POSTGRES_USER=test1234
POSTGRES_PASSWORD=hajksdg7ASFAT
POSTGRES_DB=post-votes-db
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}?schema=public&connect_timeout=500"
```
Note: postgres in ```DATABASE_URL``` is the name of db service in docker-compose.yml.

Then run:
```docker-compose up --build```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
