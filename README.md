# Basic Chat Room Application

This is a chat room application built with React Native for the frontend and FastAPI for the backend. The application allows users to create chat rooms and exchange messages in real-time.

## Features

- Create a new chat room
- Join an existing chat room
- Send and receive messages in real-time

## Technologies Used

- React Native
- FastAPI
- PostgreSQL (for database storage)

## Prerequisites

Before running the application, ensure that you have the following installed:

- Node.js
- React Native CLI
- Python
- PostgresSQL
- Pipenv (Python package manager)
- Android Studio Application or a physical mobile device

## Getting Started

To get started to use the application, readers need to first make sure to clone the repository first

### Backend Setup

1. Open a terminal window
2. Navigate to the backend directory and execute `pipenv install --dev` to install all the backend dependencies
3. Update the database configuration in `backend/app/database.py` to match your database settings.
4. execute `uvicorn main:app --reload` to run the FastAPI application.

Note: Database migrations are automatically handled by a code in the `database.py` file.

### Frontend Setup

> We recommend using Android Studio to emulate two mobile devices simultaneously for testing the chat application.

1. Open a new terminal window
2. Navigate to frontend directory and execute `npm install` to install all the frontend dependencies
3. execute `npm run android` and connect to a physical device to test the app

#### Using Android Studio

If you're using Android Studio and want to run the application on two devices simultaneously, follow the steps below:

Note: Ensure that you have at least two emulator devices installed in your Android Studio.
  
1. Open two terminal windows and make sure both terminal windows are in the frontend directory
2. In the first terminal window, execute `npx react-native start` to start the development server. 
3. In the second terminal window, execute `npx react-native run-android` to run the app on one of your emulator devices. 
4. After the application has started, launch the other emulator device from **Android Studio**. 
5. . In the terminal where you executed `npx react-native run-android`, run `npx react-native run-android --deviceId <device_id>` to run the app on the second emulator device.

You can obtain the `<device_id>` by executing `adb devices` in any terminal window.

## Attachments

### Homescreen View

![HomeScreen](https://github.com/diazlp/fastapi-chat-app/assets/37856850/5873531b-f63c-4cf6-aac3-f6d94f7bad6c)

### Chatroom View

![Chatroom View](https://github.com/diazlp/fastapi-chat-app/assets/37856850/6570c437-76f8-4ce6-a11f-a5ecd553f475)

