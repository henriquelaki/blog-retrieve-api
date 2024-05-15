# Blog API

This project is a simple RESTful API that returns a detailed list of blog posts, structured as a JSON response. The API fetches blog entries, authors, and comments from external endpoints and allows users to request a paginated set of blog posts.

## Features

- Fetches blog posts from an external API.
- Includes author details for each blog post.
- Includes comments for each blog post.
- Supports pagination through query parameters.
- Returns appropriate HTTP status codes for errors.

## Requirements

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/henriquelaki/blog-retrieve-api.git
    or
    git clone git://github.com/henriquelaki/blog-retrieve-api.git
    ```

2. Navigate to the project directory:

    ```bash
    cd blog-retrieve-api
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

## Usage

1. Start the server:

    ```bash
    npm start
    ```

2. The API will be running at `http://localhost:3000`.

3. For development, you can use `nodemon` to automatically restart the server on code changes:

    ```bash
    npm run start:watch
    ```

## API Endpoints

### Get Paginated Blog Posts

- **URL**: `/posts`
- **Method**: `GET`
- **Query Parameters**:
  - `start` (required): The start index of the paginated results (0-indexed).
  - `size` (required): The number of blog posts to return.

- **Response**:
  - **200**: A list of paginated blog posts with author details and comments.
  - **400**: Missing or invalid query parameters.
  - **404**: No posts found for the specified pagination parameters.
  - **500**: An error occurred while fetching the blog posts.

- **Example Request**:

    ```bash
    curl -X GET http://localhost:3000/posts?start=10&size=10
    ```

- **Example Response**:

    ```json
    [
      {
        "userId": 2,
        "id": 11,
        "title": "et ea vero quia laudantium autem",
        "body": "delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus",
        "user": {
          "id": 2,
          "name": "Ervin Howell",
          "username": "Antonette",
          "email": "Shanna@melissa.tv",
          ...
        },
        "comments": [
          {
            "postId": 11,
            "id": 51,
            "name": "molestias et odio ut commodi omnis ex",
            "email": "Laurie@lincoln.us",
            "body": "perferendis quae facere",
            ...
          },
          ...
        ]
      },
      ...
    ]
    ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.