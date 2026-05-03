# dJournal

dJournal is a simple personal journal web app built with Node.js, Express, EJS, and Bootstrap. It lets you create, view, edit, and delete journal entries from a single page.

The project is currently focused on journaling. The broader idea is to grow it into a personal management app with journals, todo lists, and private notes.

## Features

- Create journal entries with a title and body text
- View entries in reverse chronological order
- Edit existing entries
- Delete entries
- Store journal data locally in a JSON file
- Render pages on the server with EJS
- Style the interface with Bootstrap

## Tech Stack

- **Runtime:** Node.js
- **Server:** Express
- **Views:** EJS
- **Styling:** Bootstrap
- **Storage:** Local JSON file

## Project Structure

```text
dJournal/
|-- controllers/
|   `-- journalController.js   # Reads and writes journal data
|-- routes/
|   `-- journals.js            # Journal routes and request handling
|-- utils/
|   `-- date.js                # Date formatting helper
|-- views/
|   `-- index.ejs              # Main journal page
|-- index.js                   # Express app entry point
|-- package.json
`-- README.md
```

When the app runs, it creates a `data/data.json` file if one does not already exist. This file stores journal entries locally and is ignored by Git.

## Getting Started

### Prerequisites

Install Node.js before running the app.

You will also need `nodemon` for the current start script:

```bash
npm install -g nodemon
```

Alternatively, you can change the start script to use `node index.js`.

### Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd dJournal
npm install
```

Start the app:

```bash
npm run start
```

Then open:

```text
http://localhost:3000
```

## Available Routes

| Method | Route | Description |
| --- | --- | --- |
| GET | `/` | Show all journal entries |
| POST | `/` | Create a new journal entry |
| GET | `/edit/:id` | Load an entry into the edit form |
| POST | `/edit/:id` | Save changes to an entry |
| GET | `/delete/:id` | Delete an entry |

## Data Format

Journal entries are saved in `data/data.json` using timestamp-based IDs.

Example:

```json
{
  "journals": {
    "1714750123456": {
      "title": "Today",
      "text": "Started working on dJournal.",
      "date": "03-05-2026",
      "id": "1714750123456"
    }
  }
}
```

## Planned Improvements

- Add todo list functionality
- Add private or secret notes
- Improve the user interface
- Add validation for empty journal entries
- Use proper HTTP methods for delete actions
- Add tests
- Replace JSON storage with a database if the app grows

## License

This project uses the ISC license.
