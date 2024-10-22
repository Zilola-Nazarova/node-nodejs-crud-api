<h3 align="center"><b>NODEJS CRUD API</b></h3>

The task: https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md  
The corresponding lesson: https://github.com/rolling-scopes-school/tasks/blob/master/node/modules/crud-api/README.md

<a name="readme-top"></a>

# 📗 Table of Contents

- [📖 About the Project](#about-project)
  - [🛠 Built With](#built-with)
    - [Tech Stack](#tech-stack)
    - [Key Features](#key-features)
- [🚀 Live Demo ](#live-demo)
- [💻 Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
  - [Install](#install)
  - [Usage](#usage)
  - [Run tests](#run-tests)
- [🔭 Future Features](#future-features)
- [🙏 Acknowledgements](#acknowledgements)


# 📖 Node.js CRUD API <a name="about-project"></a>

This is a simple CRUD API using in-memory database underneath. The project was created as part of my studies at RS School. 


## 🛠 Built With <a name="built-with"></a>

### Tech Stack <a name="tech-stack"></a>

<details>
  <summary>Server</summary>
  <ul>
    <li><a href="https://nodejs.org/en">Node.js</a></li>
  </ul>
</details>

<details>
<summary>Packages</summary>
  Only `nodemon`, `dotenv`, `cross-env`, `typescript`, `ts-node`, `ts-node-dev`, `eslint` and its plugins, `webpack-cli`, `webpack` and its plugins, `prettier`, `uuid`, `@types/*` as well as libraries used for testing
</details>


### Key Features <a name="key-features"></a>

- **CRUD operations API**
- **in-memory database (array of objects)**
- **error-handling**
- **development/production modes**

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## 🚀 Live Demo <a name="live-demo"></a>

- The Live Demo will be added after completing next steps for this app.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## 💻 Getting Started <a name="getting-started"></a>

To get a local copy up and running, follow these steps.

### Prerequisites

In order to run this project you need:

- GitHub account;
- Git installed on your OS;
- VSCode (or another code editor);
- [Node.js and npm](https://nodejs.org/) 22.x.x version installed;
- [Postman](https://www.postman.com/) (or another tool) to test API endpoints.

### Setup

Clone this repository to your desired folder:

Login to your GitHub account. Clone this repository to your desired folder:
> cd my-folder
> git clone git@github.com:Zilola-Nazarova/node-nodejs-crud-api.git

Define the port number in .env file:
> echo "PORT='5000'" > .env

### Install

Install the dependencies:
> npm install

### Usage

To run the server in development mode:
> npm run start:dev
To run the server in production mode:
> npm run start:dev  

Open [http://localhost:5000](http://localhost:5000) to view it in your browser.

### Run tests

To run tests, run the following command:
> npm run test  

or  
> npm run test:verbose  

You can also check linter errors by running these commands:
> npm run lint

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## 🔭 Future Features <a name="future-features"></a>

- [ ] **write tests for API**
- [ ] **implement horizontal scaling for application**
- [ ] **implement Typescript**

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## 🙏 Acknowledgments <a name="acknowledgements"></a>

This project was developed as part of the [RSSchool](https://rs.school/courses/aws-devops) AWS DevOps course. I would like to express my gratitude to the RSSchool team for their guidance and support throughout the learning journey.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
