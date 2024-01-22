## Edblock
Edblock is a peer-to-peer file-sharing service for students and teachers. Read more about the project [here](https://github.com/KobeZ123/spotify-playlist-maker)
## How the App Works
First, the user needs to create an account. The user is either a student or teacher. 

<img width="619" alt="Screen Shot 2024-01-19 at 9 09 22 PM" src="https://github.com/SuryaPatil/thirdweb-app/assets/78182536/fd9d1987-bb7a-413f-9dc2-2fd7e3c359f4">

Once the user has an account, they can login:

<img width="643" alt="Screen Shot 2024-01-19 at 9 12 23 PM" src="https://github.com/SuryaPatil/thirdweb-app/assets/78182536/07cbd1dc-1682-4fbc-8661-47211491036b">

Once the user is logged in, they can see all their classes:

<img width="984" alt="Screen Shot 2024-01-22 at 9 05 32 AM" src="https://github.com/SuryaPatil/thirdweb-app/assets/78182536/2c27c928-3c35-4ea4-8667-293e84e9be1b">

Click on a class to view its webpage: 

<img width="1129" alt="Screen Shot 2024-01-22 at 8 57 09 AM" src="https://github.com/SuryaPatil/thirdweb-app/assets/78182536/ce1ae41f-4403-48e1-bd6e-52e270b50aff">

Click "Post" to make a post. Optionally share a file by uploading it to IPFS. 

<img width="1003" alt="Screen Shot 2024-01-22 at 9 21 41 AM" src="https://github.com/SuryaPatil/thirdweb-app/assets/78182536/e3582e12-78df-4fe9-a760-eb26cfc45903">

We can see the post with the file's IPFS URL. 
<img width="1059" alt="Screen Shot 2024-01-22 at 9 45 06 AM" src="https://github.com/SuryaPatil/thirdweb-app/assets/78182536/b0265f20-1787-4244-9276-f2c160761359">

## Getting Started

Create a project using this example:

```bash
npx thirdweb create --template next-typescript-starter
```

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

On `pages/_app.tsx`, you'll find our `ThirdwebProvider` wrapping your app, this is necessary for our [hooks](https://portal.thirdweb.com/react) and
[UI Components](https://portal.thirdweb.com/ui-components) to work.

## Environment Variables

To run this project, you will need to add environment variables. Check the `.env.example` file for all the environment variables required and add it to `.env.local` file or set them up on your hosting provider.

## Deploy to IPFS

Deploy a copy of your application to IPFS using the following command:

```bash
yarn deploy
```

## Learn More

To learn more about thirdweb and Next.js, take a look at the following resources:

- [thirdweb React Documentation](https://docs.thirdweb.com/react) - learn about our React SDK.
- [thirdweb TypeScript Documentation](https://docs.thirdweb.com/typescript) - learn about our JavaScript/TypeScript SDK.
- [thirdweb Portal](https://docs.thirdweb.com) - check our guides and development resources.
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Templates](https://thirdweb.com/templates)

You can check out [the thirdweb GitHub organization](https://github.com/thirdweb-dev) - your feedback and contributions are welcome!

## Join our Discord!

For any questions, suggestions, join our discord at [https://discord.gg/thirdweb](https://discord.gg/thirdweb).
