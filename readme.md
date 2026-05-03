# dJournal

dJournal is a personal management app built with Node.js, Express, EJS, and Bootstrap.

The current version supports journal entries. The planned direction is to grow it into a broader personal app with journals, todos, plans, and private notes.

## Features

- Add journal entries with a title and text
- View saved journal entries
- Edit existing journal entries
- Delete journal entries
- Store journal data locally in a JSON file

## Tech Stack

**Frontend:** EJS, Bootstrap

**Backend:** Node.js, Express

**Storage:** Local JSON file

## Project Structure

```text
src/
  app.js             Express app setup
  server.js          Server startup
  controllers/       Request and response handlers
  repositories/      Local JSON file storage
  routes/            Express route definitions
  services/          Journal business logic
  utils/             Helper functions
  views/             EJS templates
index.js             App entry point
```

## Installation

Clone the repository:

```bash
git clone https://github.com/Prithvi-Raj-Chauhan/dJournal.git
cd dJournal
```

Install dependencies:

```bash
npm install
```

Start the app:

```bash
npm start
```

The app runs at:

```text
http://localhost:3000
```

## Development Notes

Journal data is stored in `data/data.json`. The `data` folder is ignored by Git, so each local setup keeps its own journal entries.

The app keeps route definitions, request handlers, business logic, and JSON storage in separate folders so new features can be added without making one large file handle everything.
