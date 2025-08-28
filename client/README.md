# Pheydrus GPT Clone

A clean, modern ChatGPT-like interface that connects to an Azure Function App proxy server.

## Features

- ✨ Clean, modern chat interface
- 🔗 Connection to Azure Function App proxy server
- 🆕 New chat functionality
- 📱 Responsive design
- 🚀 Ready for Vercel deployment

## Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to the local URL shown in the terminal

## Deployment to Vercel

### Prerequisites
- Vercel account (free tier available)
- Git repository with your code

### Steps

1. **Push your code to GitHub/GitLab/Bitbucket**

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "New Project"
   - Import your repository
   - **Important:** Set the root directory to `client` (since this is where your app is)

3. **Deploy:**
   - Vercel will automatically detect it's a Vite/React app
   - Build and deploy automatically
   - Your app will be available at a Vercel URL

### Why This Works
- The `client` folder contains a complete, standalone React app
- Vercel automatically detects Vite projects
- No additional configuration needed
- The proxy server connection is already configured in the code

## Project Structure

```
client/
├── src/
│   ├── components/          # Reusable UI components
│   ├── routes/             # Page components
│   ├── layouts/            # Layout components
│   ├── lib/                # Utility functions
│   ├── App.jsx            # Main app component
│   └── main.jsx           # App entry point
├── public/                 # Static assets
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
└── vercel.json            # Vercel deployment config
```

## Technologies Used

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **React Markdown** - Markdown rendering for chat responses
- **CSS Modules** - Scoped styling

## Proxy Server

The app connects to your Azure Function App proxy server at:
```
https://plutofunctionapp-dyfvhpatbmc7dyg5.eastus2-01.azurewebsites.net/api/chat
```

This URL is configured in the components and doesn't need environment variables since it's set on Azure.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## License

Private project