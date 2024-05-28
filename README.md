# Websocket demo

This application contains single page containing editor which is synchronized with all clients visiting that page.

This application is only frontend side of the project.

## Prerequisites

Before running this application you need to configure websocket server to synchronize clients. The simple way to setup websocket server is to use `y-websocket`

```
HOST=localhost PORT=1234 npx y-websocket
```

## Getting Started

Follow below steps to run project locally:

1. Install Dependancies:
    ```
    npm install
    ```

2. Configure environment variables specified in .env.example

3. Finally run development server:
    ```
    npm run dev
    ```

## Deployment

Follow below steps to deploy project on production server:

1. Install Dependancies:
    ```
    npm install
    ```

2. Configure environment variables specified in .env.example

3. Build application and Deploy
    ```
    npm run build
    ```
    This will generate static files for application inside `dist` and can be deploy on any server
4. _*(optional)*_ For testing purpose, we can use below command:
    ```
    npm run preview
    ```

