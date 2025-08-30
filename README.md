# ResQ: A Mental Wellness Support System

ResQ is a comprehensive mental health evaluation and guidance support system designed to assist users in monitoring their mental well-being, practicing self-expression, engaging in cognitive exercises, and connecting with relevant support resources. The application aims to provide a compassionate and interactive platform for personal growth and mental health management.

Through daily check-ins, journaling, creative outlets, and access to a curated library of resources, ResQ helps users understand their emotional patterns, track progress, and access professional help when needed.

## Features

*   **Secure User Authentication:** Seamless sign-up and sign-in powered by Clerk.
*   **Personalized Dashboard:** A quick overview of daily progress, wellness scores, and motivational quotes.
*   **Daily Checklist:** Track and complete daily mental wellness activities like journaling, creative tasks, video summaries, and reading.
*   **Mood Check-ins:** Regularly log and track your emotional state with an emoji-based scale and optional notes.
*   **Journaling & Thought Capture:** Express thoughts and feelings through a detailed journal or quick thought entries, with AI-driven sentiment analysis and keyword extraction.
*   **Creative Canvas:** A digital drawing board (powered by Excalidraw) to visually express emotions, thoughts, or issues, with AI insights.
*   **Cognitive Exercises:** Engage in interactive exercises designed to improve memory, attention, and problem-solving skills, with performance tracking and recommendations.
*   **Self-Help Library:** Access a curated collection of public domain books and motivational videos for personal growth and learning, including an integrated reader and video player.
*   **Wellness Quizzes:** Participate in daily and weekly quizzes to assess various aspects of mental well-being and receive personalized insights.
*   **Historical Overview (My Days):** View a timeline of past activities, including journal entries, drawings, and cognitive exercises, grouped by date.
*   **Professional Support Resources:** Access a dedicated page with Indian emergency mental health helplines and links to reputable organizations for finding therapists and support.
*   **Theme Toggle:** Switch between light and dark modes for a personalized viewing experience.
*   **Google Translator:** Translate the application content into various Indian languages for enhanced accessibility.

## Technologies Used

### Frontend

*   **React.js:** A JavaScript library for building user interfaces.
*   **Vite:** A fast build tool that provides an instant development server and bundles code for production.
*   **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
*   **React Router DOM:** For declarative routing in React applications.
*   **Clerk:** For robust and secure user authentication and management.
*   **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
*   **Radix UI:** Unstyled, accessible component primitives for building high-quality design systems.
*   **Excalidraw:** For interactive whiteboard and drawing functionalities.
*   **Axios / Fetch API:** For making HTTP requests to the backend.
*   **date-fns:** A comprehensive date utility library.
*   **Sonner:** For elegant toast notifications.
*   **Lucide React:** A collection of beautiful and customizable SVG icons.

### Backend

*   **Express.js:** A fast, unopinionated, minimalist web framework for Node.js.
*   **TypeScript:** For type-safe backend development.
*   **Prisma:** A next-generation ORM for Node.js and TypeScript, used for database access and migrations.
*   **PostgreSQL:** A powerful, open-source relational database.
*   **Clerk (`@clerk/clerk-sdk-node`):** For secure backend authentication and user management.
*   **Google Generative AI (`@google/generative-ai`):** For integrating AI capabilities, likely for generating insights from user input.
*   **cors:** Middleware to enable Cross-Origin Resource Sharing.
*   **dotenv:** For loading environment variables from a `.env` file.
*   **helmet:** Express.js middleware for setting various HTTP headers to enhance security.
*   **morgan:** HTTP request logger middleware for Node.js.
*   **Zod:** A TypeScript-first schema declaration and validation library.
*   **date-fns:** For handling date and time operations.

## Project Structure

The project is organized into `frontend` and `backend` directories, each with its own specific responsibilities.

```
.
├── backend/
│   ├── dist/                 # Compiled JavaScript output
│   ├── prisma/               # Prisma schema and migrations
│   │   ├── migrations/
│   │   └── schema.prisma     # Database schema definition
│   ├── src/
│   │   ├── index.ts          # Backend entry point
│   │   ├── routes/           # API route handlers (e.g., alerts.ts, checklist.ts)
│   │   └── utils/            # Utility functions (e.g., prisma.ts)
│   ├── docker-compose.yml    # Docker configuration for services
│   ├── package.json          # Backend dependencies and scripts
│   └── tsconfig.json         # TypeScript configuration for backend
├── frontend/
│   ├── src/
│   │   ├── App.tsx           # Main React application component and routing
│   │   ├── components/       # Reusable UI components (e.g., ThemeToggle.tsx)
│   │   ├── lib/              # Frontend utility functions (e.g., api.ts)
│   │   ├── pages/            # Individual application pages (e.g., Dashboard.tsx, Journal.tsx)
│   │   ├── styles.css        # Tailwind CSS and global styles
│   │   └── main.tsx          # Frontend entry point
│   ├── package.json          # Frontend dependencies and scripts
│   └── tsconfig.json         # TypeScript configuration for frontend
├── package-lock.json
└── README.md                 # Project README file
```

## Setup Instructions

Follow these instructions to set up and run the ResQ project locally.

### Prerequisites

Before you begin, ensure you have the following installed:

*   **Node.js** (LTS version recommended)
*   **npm** or **Yarn** (npm is used in these instructions)
*   **Docker** and **Docker Compose** (for easy PostgreSQL setup)
*   **Clerk Account:** You will need to create an account at [Clerk](https://clerk.com/) to obtain API keys for authentication.
*   **Google Cloud Project & Generative AI API Key:** For AI functionalities, you'll need a Google Cloud Project and an API key for the Generative AI API.

### 1. Environment Variables

Create `.env` files in both the `backend` and `frontend` directories based on the provided examples.

#### `backend/.env` example:

```
DATABASE_URL="postgresql://user:password@localhost:5432/resq_db"
PORT=4000
CLERK_SECRET_KEY=sk_test_********************
CLERK_WEBHOOK_SECRET=whsec_********************
GOOGLE_API_KEY=YOUR_GOOGLE_GENERATIVE_AI_API_KEY
```

#### `frontend/.env` example:

```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_********************
VITE_API_URL=http://localhost:4000/api
```

**Replace placeholder values (`sk_test_*****`, `pk_test_*****`, `YOUR_GOOGLE_GENERATIVE_AI_API_KEY`) with your actual keys from Clerk and Google Cloud.**

### 2. Database Setup (PostgreSQL with Docker)

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Start the PostgreSQL database using Docker Compose:
    ```bash
    docker-compose up -d postgres
    ```
    This will start a PostgreSQL container.
3.  Install backend dependencies and generate Prisma client:
    ```bash
    npm install
    npx prisma generate
    ```
4.  Run Prisma migrations to set up the database schema:
    ```bash
    npx prisma migrate dev --name init
    ```
    You will be prompted to apply the migration. Confirm by typing `y`.
5.  Seed the database with initial data (optional, but recommended for development):
    ```bash
    npm run prisma:seed
    ```

### 3. Backend Setup

1.  From the `backend` directory, if you haven't already, install dependencies:
    ```bash
    npm install
    ```
2.  Start the backend development server:
    ```bash
    npm run dev
    ```
    The backend will run on `http://localhost:4000` (or your specified `PORT`).

### 4. Frontend Setup

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install frontend dependencies:
    ```bash
    npm install
    ```
3.  Start the frontend development server:
    ```bash
    npm run dev
    ```
    The frontend will typically run on `http://localhost:5173` (or another available port).

### 5. Clerk Webhooks (Important for User Profile Sync)

To ensure user profiles are synchronized between Clerk and your backend, you'll need to set up a Clerk webhook.

1.  Go to your Clerk Dashboard.
2.  Navigate to **Webhooks**.
3.  Add a new endpoint.
    *   **Endpoint URL:** `http://localhost:4000/api/clerk-webhook` (or your backend's URL followed by `/api/clerk-webhook`).
    *   **Select Events:** Choose `User created` and `User updated`. You might also want `User deleted` depending on your needs.
4.  Copy the **Webhook Secret** and add it to your `backend/.env` file as `CLERK_WEBHOOK_SECRET`.

**Note:** For production deployment, ensure your webhook URL is publicly accessible.

## Usage

Once both the frontend and backend servers are running:

1.  Open your web browser and navigate to the frontend URL (e.g., `http://localhost:5173`).
2.  You will be greeted by the **Landing Page**.
3.  **Sign Up** or **Sign In** using your Clerk account. New users will be guided through an **Onboarding** process.
4.  Explore the various features from the **Dashboard**, including:
    *   **Daily Checklist** for tracking activities.
    *   **Mood Check** to log your emotional state.
    *   **Journal** and **Canvas** for self-expression.
    *   **Cognitive Exercises** to boost mental faculties.
    *   **Library** for self-help resources.
    *   The **Appointment** page for professional support resources.
5.  Utilize the **Theme Toggle** in the top right corner to switch between light and dark modes.
6.  Use the **Language** button (Google Translator) to translate the page into various Indian languages.

## Contributing

Contributions are welcome! If you have suggestions for improvements, new features, or bug fixes, please feel free to:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add new feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

Please ensure your code adheres to the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


