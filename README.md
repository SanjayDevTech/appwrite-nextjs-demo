# Appwrite NextJS Demo

This is a demo project for [Appwrite](https://appwrite.io) and [NextJS](https://nextjs.org/) integration.

## Setting up project

### 1. Clone the project

```bash
git clone https://github.com/SanjayDevTech/appwrite-nextjs-demo 
```

### 2. Choose the node package manager

- npm
- yarn
- pnpm


### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open the project

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Setting up Appwrite

### 0. Up and running Appwrite

Follow the [Appwrite installation guide](https://appwrite.io/docs/installation) to get Appwrite up and running on your machine.

### 1. Create a project

Create a new project in Appwrite console.

### 2. Create a database

Create a new database in Appwrite console.

### 3. Create a collection

Create a new collection in Appwrite console.

With permission:
  - users:
    - create
    - read

With Attribute:
  - author: string, required
  - content: string, required
  - image: string, required

With index:
  - content: fulltext

### 4. Create a storage bucket

Create a new storage bucket in Appwrite console.

With permission:
  - users:
    - create
    - read

## Configure Appwrite in the project

### 1. Create a .env.local file

Create a new file named `.env.local` in the root of the project.
Use `sample.env` as a reference.

### 2. Get the Appwrite project details

Go to the Appwrite console and get the following details from the project you created.

- host
- project id
- database id
- collection id
- bucket id
