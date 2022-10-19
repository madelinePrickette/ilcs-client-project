# Independent Living Care Services 

## Table of Contents

- [Description](#description)
- [Built With](#built-with)
- [Prerequisites](#prerequisite)
- [Installation](#installation)
- [Usage](#usage)
    

## Description

ILCS App is a digital time tracking application that has an online dashboard for employees and for management. The app allows employees to submit or edit their work time sheets. It also includes organization tools for management to use to view, edit and filter employees time sheets. This was developed to be used internally by Independent Living Care Services (ILCS), which is a small company that provides in-home personal care at multiple locations across the Twin Cities.

## Built With

<a href="https://www.w3schools.com/w3css/defaulT.asp"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" height="40px" width="40px" /></a>
<a href="https://www.w3schools.com/html/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" height="40px" width="40px" /></a>
<a href="https://www.w3schools.com/js/default.asp"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" height="40px" width="40px" /></a>
<a href="https://www.postgresql.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" height="40px" width="40px" /></a>
<a href="https://reactjs.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" height="40px" width="40px" /></a>
<a href="https://redux.js.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" height="40px" width="40px" /></a>
<a href="https://material-ui.com/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/materialui/materialui-original.svg" height="40px" width="40px" /></a>
<a href="https://nodejs.org/en/"><img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-plain.svg" height="40px" width="40px" /></a>
## Getting Started

This project should be able to run in your favorite IDE. I used VS code while building it. 
<a href="https://code.visualstudio.com/"><img src="https://github.com/devicons/devicon/blob/master/icons/vscode/vscode-original-wordmark.svg" height="40px" width="40px" /></a>

### Prerequisites
Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)

### Installation

1. Fork the repository
2. Copy the SSH key in your new repository
3. In your terminal type...  `git clone {paste SSH link}`
4. Navigate into the repository's folder in your terminal
5. Open VS Code (or editor of your choice) and open the folder
6. In the terminal of VS Code run `npm install` to install all dependencies
    (this is important to the name npm packages that are required to run this app.)
7.  Create a `.env` file at the root of the project and navigate to sendGrid:
        1. Create or log into your account on https://signup.sendgrid.com/
        2. Verify your preferred email and generate new API Key for this email address (see sendGrid docs here:  https://docs.sendgrid.com/ui/managing-contacts/email-address-validation )
        3. Update your .env file with the appropriate keys:
            SENDGRID_API_KEY= {paste your new API key}
            SENDGRID_EMAIL= {paste your verified email address}
8. Create a database named `ilcs` in PostgresSQL
If you would like to name your database something else, you will need to change `ilcs` to the name of your new database name in `server/modules/pool.js` file
9. The queries in the database.sql file are set up to create all the necessary tables that you need to test the app. Copy and paste those queries in the SQL query of the database.
10. Run `npm run server` in your VS Code terminal
11. Open a second terminal by clicking the + button and run `npm run client`

## Usage

Once everything is installed and running it should open in your default browser - if not, navigate to http://localhost:3000/#/.

Video walkthrough of application usage: https://youtu.be/19Gy76iGe44

## Deployment
- Login Credentials for Heroku have been provided in the hand off document.
- In the case that you do not have the first admin account already made, you can run a sql statement to create a default admin account with the following code:

  INSERT INTO "user" ("first_name", "last_name", "username", "password", "clearance_level", "email", "pic", "user_active")
    VALUES ('admin', 'admin', 'admin', '$2a$10$npLEwUF31FvznQ31BJhcP.93tCLQfY2SwfJy8/Mp.AkNvq57B9vGW', 1, '', 'https://img1.wsimg.com/isteam/ip/f5ad5135-b36c-45d3-9295-11605642e560/ILClogo.PNG/:/rs=w:248,h:208,cg:true,m/cr=w:248,h:208/qt=q:95', true);

  This will create the first admin account used for creating clients, employees, and other admins. Username: admin, Password: password.