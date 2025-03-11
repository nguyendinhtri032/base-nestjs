# Huca API

## Features
- **Authentication**: Authentication with Firebase.
- **Affiliate**: Affiliate management.

## Technologies

**Huca API** is crafted using powerful technologies:

- **[NestJS](https://nestjs.com/)**: A framework for building efficient server-side apps.
- **[Firebase](https://firebase.google.com/)**: Firebase is a platform developed by Google for creating mobile and web applications.
- **[Fastify](https://fastify.io/)**: Fastify is a web framework for Node.js that is designed to be fast, minimalistic, and flexible.
- **[TypeORM](https://typeorm.io/)**: Helps us manage the database in an organized way.
- **[MySQL](https://www.mysql.com/)**: Stores all the data without needing a complex setup.

## Getting Started

Follow these steps to set up **Huca API** on your system:

1. **Install Dependencies**: Navigate to the project directory and run `npm install`.
2. **Create Environment File**: Copy the `.env.example` file to `.env` and update the environment variables accordingly: `cp .env.example .env`
3. **Service Account**: Create a service account from Firebase and add the credentials to the root project folder `serviceAccount.json`.
4. **Launch the App**:
   - For development: `npm run start:dev`
   - For production: `npm run start:prod`
5. **Make Migration**
   - npm run migration:create --name=migrationName
## License

**Huca API** is not open-sourced.
