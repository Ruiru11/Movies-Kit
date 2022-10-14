This project is an application skeleton for a typical [Node.js](https://nodejs.org/) web app.

## Getting Started

To get you started you can simply clone the repository:

```
git clone https://github.com/Ruiru11/Movies-Kit.git
```

and install the dependencies

```
npm install
```

### Prerequisites

A number of node.js tools is necessary to initialize and test the project. You must have node.js and its package manager (npm) installed. You can get them from [http://nodejs.org/](http://nodejs.org/). The tools/modules used in this project are listed in package.json and include express, mongodb and mongoose.

#### MongoDB

The project uses MongoDB as a database. If you are on Mac and using Homebrew package manager the installation is as simple as `brew install mongodb`.

### Start the MongoDB server

First we need to create the `db` directory where the database files will live in. In your terminal navigate to the `root` of your system by doing `cd ..` until you reach the top directory.You can run `mongo` this will open an interactive shell . To create a new database type `use then name of your database` e.g `use harvest`.

### Run the Application

    npm run dev
