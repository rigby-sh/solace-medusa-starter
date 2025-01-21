<h1 align="center">
  <a href="https://solace-medusa-starter.vercel.app/de"><img width="300" alt="Solace Logo" src="https://github.com/user-attachments/assets/d53d1a00-f94a-4ff5-ad05-892ed86d8d9d"></a>
  <br>
  <br>
  DTC furniture eCommerce starter
  <br>
</h1>

<p align="center">Solace is a sleek and modern DTC furniture eCommerce starter built on <a href="https://medusajs.com/" target="_blank">Medusa 2.0</a> and <a href="https://nextjs.org/docs" target="_blank">Next.js 14</a>. It offers a complete suite for launching an online store, including a product grid with filtering, user profiles, order history, multi-step checkout with Stripe integration, product search, and customizable product pages. Integrated with <a href="https://github.com/strapi/strapi" target="_blank">Strapi CMS</a>, it offers pre-built content models for easy website editing.</p>

&nbsp;

<p align="center">
  <video src="https://github.com/user-attachments/assets/4ca7743c-c922-4b4b-bc1a-2f5bec0df35b" controls="controls" muted="muted" playsinline="playsinline">
</video>
</p>

## Table of Contents

- [Prerequisites](#prerequisites)
- [Overview](#overview)
  - [Features](#features)
  - [Demo](#demo)
- [Quickstart](#quickstart)
- [Resources](#resources)
- [Contributors](#contributors)

&nbsp;

## Prerequisites

- **MedusaJS 2.0 backend**. If this hasn't been set up yet, please use the following:
  - Our prepared repository: <a href="https://github.com/rigby-sh/solace-medusa-starter-api">Medusa 2.0 API <img width="20" alt="GitHub Logo" src="https://github.com/user-attachments/assets/b0657cbf-bbc1-40f1-99a7-8d60da97abac"></a>
  - [Medusa 2.0 Documentation](https://docs.medusajs.com/v2)
    > **Important**: If you're not using our prepared API repository, remember to:
    >
    > - Copy the folder from [Repo Link](https://github.com/rigby-sh/solace-medusa-starter-api/tree/main/src/api/store) and paste it to your API project
    > - Copy the Middlewares file from [Repo Link](https://github.com/rigby-sh/solace-medusa-starter-api/tree/main/src/api) and paste it to your API project
    >
    > These files are required for the search engine and filter logic to work properly. Without them, the search and filtering functionality will not be available.
- **A CMS management system like Strapi**. If this hasn't been set up yet, please use the following:
  - Our prepared repository: <a href="https://github.com/rigby-sh/solace-medusa-starter-strapi">Strapi <img width="20" alt="GitHub Logo" src="https://github.com/user-attachments/assets/b0657cbf-bbc1-40f1-99a7-8d60da97abac"></a>
  - [Strapi Documentation](https://docs.strapi.io/dev-docs/intro)
    > **Important**: After setting up Strapi, configure the revalidation webhook:
    >
    > 1. Set `STRAPI_WEBHOOK_REVALIDATION_SECRET` in your Next.js `.env` (you can generate a secure value using `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
    > 2. In Strapi admin panel: Settings → Webhooks → Create new webhook
    > 3. Configure webhook:
    >    - URL: `{your-frontend-url}/api/strapi-revalidate?secret={YOUR-STRAPI_WEBHOOK_REVALIDATION_SECRET}`  
    >      Example: `http://localhost:8000/api/strapi-revalidate?secret=30747ea915627411fa275b9e3e6cafd199f9c5b221696b644509c02510ebe979`
    >    - No additional headers needed
    >    - Enable Entry and Media events (Create, Update, Delete)

&nbsp;

## Overview

#### Features

The storefront has been designed to meet all the requirements of modern e-commerce stores.

- **Full user profile functionality**
  - Order history
  - Profile settings
  - Shipping details
  - Password resetting
- **Shopping cart**
  - Add/remove products
  - Apply promotional codes
- **Checkout**
  - A complete 3-step checkout process
  - Payment support via Stripe
  - Mail notifications after order placement
- **About Us, Blog, Privacy Policy, and Terms and Conditions pages**
  - Fully customizable through the CMS.
- **Product search functionality** based on keywords.
- **Product pages**
- **Collections and categories**
- **Two themes support**
  - Dark
  - Light
- **Next.js 14 support**

#### Demo

#### User Profile

![User-profile](https://github.com/user-attachments/assets/b8c4f874-c383-4d2b-8135-2e1dc4435743)

&nbsp;

#### Cart

![Cart](https://github.com/user-attachments/assets/5cad2031-4ddc-4766-a6d8-5ccab873bd94)

&nbsp;

#### Checkout

![Checkout](https://github.com/user-attachments/assets/4a655836-f13d-4906-b733-f1595153be99)

&nbsp;

#### Search

![Search](https://github.com/user-attachments/assets/1941a053-37fa-4a8f-ae7a-96fbcb15118e)

&nbsp;

#### Product Page

![Product page](https://github.com/user-attachments/assets/fd134d2b-6656-4fe1-aea7-25316a65a1f3)

&nbsp;

## Quickstart

### `Clone the repository`

```

git clone https://github.com/rigby-sh/solace-medusa-starter.git

```

### `Install packages`

```

npm install

```

### `Envs`

Create a .env file and add environment variables listed below.

```

NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=YOUR_MEDUSA_PUBLISHABLE_KEY
NEXT_PUBLIC_MEDUSA_BACKEND_URL=YOUR_MEDUSA_BACKEND_URL
NEXT_PUBLIC_DEMO_MODE=BOOLEAN_VALUE
NEXT_PUBLIC_STRAPI_URL=YOUR_STRAPI_URL
NEXT_PUBLIC_STRAPI_READ_TOKEN=YOUR_STRAPI_READ_TOKEN
NEXT_PUBLIC_CDN_SPACE_DOMAIN=YOUR_CDN_SPACE_DOMAIN
NEXT_PUBLIC_SPACE_DOMAIN=YOUR_SPACE_DOMAIN
NEXT_PUBLIC_SPACE_ENDPOINT=YOUR_SPACE_ENDPOINT
STRAPI_WEBHOOK_REVALIDATION_SECRET=YOUR_STRAPI_WEBHOOK_REVALIDATION_SECRET

```

### `Develop`

Start your application with autoReload enabled

```

npm run dev

```

### `Build`

Build the project to generate the production version preview

```

npm run build

```

### `Start`

Run the preview version of the project

```

npm run start

```

&nbsp;

## Deploying the project with Vercel

Deploying your application on Vercel is a quick and straightforward process that allows for easy management and scaling of your project. To deploy your project, click the button below to start the process. Vercel will guide you through the configuration steps and connect to your repository.

[![Deploy](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rigby-sh/solace-medusa-starter)

&nbsp;

## Resources

#### Learn more about Medusa

- [Website](https://www.medusajs.com/)
- [GitHub](https://github.com/medusajs)
- [Medusa 2.0 Documentation](https://docs.medusajs.com/v2)

#### Learn more about Next.js

- [Website](https://nextjs.org/)
- [GitHub](https://github.com/vercel/next.js)
- [Documentation](https://nextjs.org/docs)

#### Learn more about Strapi

- [Website](https://strapi.io/)
- [GitHub](https://github.com/strapi/strapi)
- [Documentation](https://docs.strapi.io/)

&nbsp;

> [!IMPORTANT] > **Image Usage Disclaimer**: The images used in this starter are for preview purposes only. They are licensed exclusively for use within this demo and cannot be used in any commercial applications or redistributed. If you intend to use this starter for your own store, please replace all images with assets that are appropriately licensed for your project.

&nbsp;

## Contributors

<a href = "https://github.com/rigby-sh/solace-medusa-starter/network/dependencies">
  <img src = "https://contrib.rocks/image?repo=rigby-sh/solace-medusa-starter"/>
</a>
