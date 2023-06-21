# MyApartments
Apartments_application
Make sure you have Docker and Docker Compose installed on your system. If not, you can download and install them from the official Docker website.

Open the Command Prompt (CMD) on your computer. You can do this by pressing the Windows key, typing "CMD," and selecting the Command Prompt from the search results.

Navigate to the directory where your Docker Compose file is located. You can use the cd command followed by the directory path to change the directory. For example, if your Docker Compose file is located in the "MyApartments" folder on your desktop, you would use the following command:

`cd C:\Users\YourUsername\Desktop\MyApartments`




Once you're in the correct directory, run the following command in the Command Prompt:

`docker-compose up`



This command tells Docker Compose to start the services defined in your Docker Compose file.

Docker Compose will start pulling and building the necessary Docker images, and then it will start the containers. The output in the Command Prompt will show the logs from the running containers.

After the containers have started successfully, you should be able to access your application by opening a web browser and entering the following URL:


`http://localhost:3000`



backend container:
`http://localhost:8000`

mongo container:
`http://localhost:27017`

## Demo Video
[![Alt text ](https://img.youtube.com/vi/4DD_Y1F81GE/0.jpg)](https://youtu.be/4DD_Y1F81GE)



