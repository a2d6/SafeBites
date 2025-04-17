# SafeBites

## About
SafeBites is a mobile application designed to help users detect allergens in food products. By scanning product names, users can instantly identify potential allergens and make informed decisions about their food choices.

## Features
- Product allergen scanning
- User allergen profile management
- Real-time allergen detection
- Cross-platform mobile application

## Project Structure
- `/SafeBitesApp` - Frontend React Native application
- `/SafeBitesAppBackend` - Backend Python Flask server

## Setup Instructions

### Frontend Setup (SafeBitesApp)
1. Navigate to the frontend directory:
```bash
cd Safebites_APP
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npx expo start
```

### Backend Setup (SafeBitesAppBackend)
1. Open a new terminal and navigate to the backend directory:
```bash
cd SafeBitesAppBackend
```

2. Create a `.env` file with the following variables:
```env
MONGO_URL="your_mongodb_connection_string"
OPENAI_API_KEY="your_openai_api_key"
```

3. Start the Python server:
```bash
python index.py
```

## Environment Variables
Make sure to create `.env` files in both frontend and backend directories with the necessary environment variables:

### Backend (.env)
Required environment variables for the backend:
- `MONGO_URL`: Your MongoDB connection string
- `OPENAI_API_KEY`: Your OpenAI API key

## Note
- Make sure you have Node.js and Python installed on your system
- Keep your API keys secure and never commit them to version control
- The backend server must be running for the mobile app to function properly