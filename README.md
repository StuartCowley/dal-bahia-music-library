# Music Library API

The Music Library API is a powerful tool for managing and organizing your music collection. It provides a set of endpoints that allow you to perform various operations such as adding, updating, deleting and retrieving music information.

## Features

- Create artists and albums.
- Retrieve information about artists and albums.
- Update artists and albums.
- Delete existing artist and album details.

## Installation

1. Clone the repository:

`git clone https://github.com/dsbahia/music-library.git`

2. Install the dependencies:

`npm install`

3. Start the PostgreSQL database using Docker:

`docker run --name music-library-db -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres`

4. Store your environment variables:

- Check the .env.example file to see what should be included.
- Create your own .env file.
- Enter your database's credentials.
- Create a .env.test file to create a separate database for testing.
- Re-enter the credentials but assign a different name to PGDATABASE.
- Make sure both .env and .env.test files are listed in the .gitignore file so they can't be shared.

5. Run the intregrated tests (optional):

`npm test`

6. Start the server:

`npm start`

## Communicating with the API

To communicate with the Music Library API, you'll need to use JSON (JavaScript Object Notation) for request and response bodies. Here are examples of how to structure the JSON data for different requests:

1. Creating an artist:

Send a POST request to /artists with the following JSON data:

`{
    "name": "Avicii",
    "genre": "Electronic Dance Music"
}`

2. Creating an album associated with an artist:

Send a POST /artists/:artistId/albums with the following JSON data:

`{
  "name": "Stories",
  "year": 2015,
  "artistId": 1
}`

Please note that artistId refers to the ID of the artist associated with the album.

## Tools Used

The Music Library API is built using the following tools and technologies:

- [Express](https://expressjs.com): A fast and minimalist web framework for Node.js.
- [PostgreSQL](https://www.postgresql.org): A powerful, open-source relational database management system.
- [postgres-migrations](https://github.com/theoephraim/node-postgres-migrations): A database migration tool for PostgreSQL.
- [Chai](https://www.chaijs.com): A versatile assertion library for Node.js.
- [Mocha](https://mochajs.org): A feature-rich JavaScript test framework.
- [Supertest](https://github.com/visionmedia/supertest): A library for testing HTTP servers.
- [Nodemon](https://nodemon.io): A utility that automatically restarts the server when file changes are detected.
- [dotenv](https://github.com/motdotla/dotenv): A module that loads environment variables from a `.env` file.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request. 

## License

This project is licensed under the [MIT License.](https://opensource.org/license/mit/)

## Acknowledgments

This project was created during the awesome March 2023 [Command Shift Software Developer Bootcamp](https://www.commandshift.co/) and i'd like to thank the following lecturers for their support and wisdom:

- Dragoș-Robert Neagu
- Will Hodgkinson
- Ryan James Smillie
- Ahmed Mire
- Lisa Heffernan