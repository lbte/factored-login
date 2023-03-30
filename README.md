# Factored Technical Assessment

This project has been developed for the technical assessment at Factored.

## Description

This app is a login and register page that allows you to register an user, go to its profile page, create skills for them and be able to view the skills created in a table and a spyder chart according to their levels of knowledge.

## Getting Started

### Prerequisites

Before you can run the application, you need to have Docker installed on your computer. Docker is a tool that allows you to run applications in containers, which makes it easy to run applications without worrying about setting up your computer environment.

To install Docker, follow the instructions for your operating system on the official Docker website: [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)

### Running the application

Once you have Docker installed, follow these steps to run the application:

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

4. Run the following command to build the Docker image to be able to start the application: `docker build -t my-app .`

5. Then run the following command to run that image and start the application: `docker run`

    This will start the application and display logs in the terminal.

6. Open a web browser and go to [http://localhost:3000](http://localhost:3000). This will open the web application in your browser.

That's it! You can now use the web application to register, login, create skills for the user that's logged in and see them in a spyder chart.


## Authors

Laura Bustamante


## Credits

* The frontend was built using [React](https://react.dev).
* The backend was built using [FastAPI](https://fastapi.tiangolo.com).
* Docker was used to containerize the application.
* Based on [Rithmic](https://www.youtube.com/@iamrithmic) and [IndianCoders](https://www.youtube.com/@IndianCoders) Tutorials on Youtube.