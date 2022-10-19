# Independent Living Care Services 

## Table of Contents

- [Description](#description)
- [Built With](#built-with)
- [Prerequisites](#prerequisite)
- [Installation](#installation)
- [Usage](#usage)
    

## Description

Star Pet is a searchable database that seemlessly links animal actors, their owners, other contacts, and current and former animal acting jobs. This was developed to be used internally by The Animal Connection, which is a full service animal actor casting company that has providing trained animal actors to the Midwest's film, television, and advertising communities since 1984.

## Built With

<a href="https://www.w3schools.com/w3css/defaulT.asp"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" height="40px" width="40px" /></a>
<a href="https://www.w3schools.com/html/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" height="40px" width="40px" /></a>
<a href="https://www.w3schools.com/js/default.asp"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" height="40px" width="40px" /></a>
<a href="https://www.postgresql.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" height="40px" width="40px" /></a>
<a href="https://reactjs.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" height="40px" width="40px" /></a>
<a href="https://redux.js.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" height="40px" width="40px" /></a>
<a href="https://www.figma.com/?fuid="><img src="https://github.com/devicons/devicon/blob/master/icons/figma/figma-original.svg" height="40px" width="40px" /></a>
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

Video walkthrough of application usage: https://www.youtube.com/watch?v=HRonNTkScl0

## Deployment
- Login Credentials for Heroku have been provided in the hand off document.
- If you need make changes you wish to push to the deployed app, you must login, go into the pet-star section, go to the deploy tab, and then manually deploy. You can reconfigure this to redeploy automatically if you wish, which is on the same page.
- Environment variables are kept on Heroku in the Settings tab, just click the Reveal Config Vars button
- To set up the DB, we used Postico, just plug the information from Heroku into a new favorite. The Information for this can be found in the Resources tab, by clicking the Postgres add on. From there it will bring you to a new page where you will go into the settings tab and click view credentials. 

- If you'd like to create new users (also a hacky way to change password) you must:
1. Go into the user router
1. Uncomment the route
1. Push changes and redeploy app
1. Register User
1. Comment out the route back in VSCode
1. Push changes
1. Redeploy