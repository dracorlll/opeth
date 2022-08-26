# Prerequisites

- Nodejs: https://nodejs.org/en/download/
- MySQL: https://www.mysql.com/downloads/
- Redis: https://redis.io/download/

# Installation

Clone the repository and install all the dependencies of 3 application.

```bash
git clone https://github.com/dracorlll/opeth.git
cd opeth
npm run build
```

Create the .env file for all 3 application and fill in the required information.

Example .env file for root directory:

```bash
ACCESS_TOKEN_SECRET=secret
CLIENT_SERVICE=http://localhost:3001/api
BOOKS_SERVICE=http://localhost:3002/api
PORT=3000
REDIS_URL=redis://default:redispw@localhost:49155
```

Example .env file for client-service directory:

```bash
DB_NAME=client-service
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
ACCESS_TOKEN_SECRET=secret
REFRESH_TOKEN_SECRET=secret
PORT=3001
ALLOWED_IP=localhost
```

Example .env file for book-service directory:

```bash
DB_NAME=book-service
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
PORT=3002
ALLOWED_IP=localhost
```

Create a database for each service.

```bash
# login to mysql
mysql -u your_username -p
# then create database
# db name should match with DB_NAME in the .env variables
CREATE DATABASE client-service;
CREATE DATABASE book-service;
```

To verify whether you have created the database successfully, you can use this command:

```bash
SHOW DATABASES;
```

Your output will be similar to this:

```bash
+--------------------+
|      Database      |
+--------------------+
| client-service     |
| book-service       |
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
```

Quit the mysql shell by typing `QUIT`.

```bash
QUIT;
```

# Run

Open 3 different terminal and run the following command in each terminal.

```bash
cd opeth
npm run start
npm start --prefix client-service
npm start --prefix book-service
```

# Routes

### Search Books

Searching books by title, author or keyword.

```bash
GET /api/search
```

Query Parameters:

```bash
title:
author: 
keyword: 
startIndex: # default 0
maxResults: #default value 10, max 40
```

### Register

Creates a new user.

```bash
POST /api/register
```

Body:

```bash
{
    "email": "email",
    "password": "password"
}
```

### Login

Login to the application.

```bash
POST /api/login
```

Body:

```bash
{
    "email": "email",
    "password": "password"
}
```

### Refresh Token

Refresh the access token.

```bash
POST /api/token
```

Body:

```bash
{
    "refreshToken": "refreshToken"
}
```

### Add Bookmark

Add a bookmark to the bookmarks list.

```bash
POST /api/add
```

Headers:

```bash
x-access-token: accessToken
```

Body:

```bash
{
    "title" : "title",
    "id": "book id"
}
```

### List Bookmarks

Add a bookmark to the bookmarks list.

```bash
GET /api/list
```

Headers:

```bash
x-access-token: accessToken
```

Query Parameters:

```bash
startIndex: # default 0
maxResults: #default value 10, max 40
```

### Remove Bookmark

Remove a bookmark from the bookmarks list.

```bash
DELETE /api/remove
```

Headers:

```bash
x-access-token: accessToken
```

Path Parameters:

```bash
bookId
```




