# Factored Technical Assessment

This project has been developed for the technical assessment at Factored.

## Description

This app is a login and register page that allows you to register an user, go to its profile page, create skills for them and be able to view the skills created in a table and a spyder chart according to their levels of knowledge.

## Getting Started

### Prerequisites

Before you can run the application, you need to have Docker installed on your computer. Docker is a tool that allows you to run applications in containers, which makes it easy to run applications without worrying about setting up your computer environment.

To install Docker, follow the instructions for your operating system on the official Docker website: [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/). **You must keep the Docker window open or at least, leave it running in the background when doing the step 4 from the following section.** 

When you install Docker, you must open it, in case it shows a message to update wsl, you can take two ways to do it:
1. Open a command promt or terminal by opening any directory, right clicking your mouse and choosing the `Open in Terminal` option. Then write the following command: `wsl --update` and after it's done then open the Docker Desktop application.
2. In case this doesn't work, click on the following link [Windows Kernel Package](https://learn.microsoft.com/es-es/windows/wsl/install-manual#step-4---download-the-linux-kernel-update-package) and follow the instructions to install it.

### Running the application

Once you have done all explain in the Prerequisites section above, follow these steps to run the application:

1. Download the project files from GitHub: [https://github.com/lbte/factored-login.git](https://github.com/lbte/factored-login.git)
    * When you go to the links page, click the green button that says `<> Code`.
    * Select the option that says `Download ZIP`.

2. Unzip the downloaded file to a directory of your choice.
    * To unzip a file in Windows, follow these steps:
        1. Right-click on the compressed file.
        2. Select "Extract All" from the context menu.
        3. Choose a destination folder to extract the contents of the compressed file.
        4. Click the "Extract" button.

3. Open a terminal or command prompt and navigate to the directory where you unzipped the project files, or open the terminal or command prompt inside of that directory by right clicking your mouse and choosing the `Open in Terminal` option.

4. Run the following command to start the application: 

    `docker-compose up`

    This will start the application and display logs in the terminal, **this might take a while, please BE PATIENT (keep the terminal or console open until you want to stop running the application)**.

6. Open a web browser and go to [http://localhost:3000](http://localhost:3000). This will open the web application in your browser.

    That's it! You can now use the web application to register, login, create skills for the user that's logged in and see them in a spyder chart.

7. Whenever you want the application to stop running, go back to the terminal or command line and press the key combination `Ctrl + C`.

### Important considerations

The things you can do with this application are login and seeing the users profile page or in case you don't have an account, you're able to register the user and inmediately log in to see their profile, when you are on the profile screen you can see the users main information and a random avatar, as well as a skills table that you can  manage to add more or update the existing ones, which allow the creation of a Spyder type chart according to each skills level. Besides, you can also logout with the button that appears on the profile and go back to the login screen.

In case you don't want to create a new user, you can log in with two **dummy users** that have been already created, these are their credentials to log in:
* **Email 1:** laura@gmail.com or **Email 2:** juan@gmail.com
* **Password for both:** 12345678

## Author

Laura Vanesa Bustamante Hurtado

## Credits

* The frontend was built using [React](https://react.dev).
* For the styling of the components the [Bulma CSS Framework](https://bulma.io) was used.
* The backend was built using [FastAPI](https://fastapi.tiangolo.com).
* For the database management [SQLAlchemy](https://www.sqlalchemy.org) with SQLite  was used. 
* Docker was used to containerize the application.
* Based on [Rithmic](https://www.youtube.com/@iamrithmic) and [IndianCoders](https://www.youtube.com/@IndianCoders) Tutorials on Youtube.