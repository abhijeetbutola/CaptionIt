Video Captioner
A simple React + Vite + TailwindCSS app that lets users:

Load any video via URL (HTML5 videos or YouTube embeds)

Add timed captions through a form (start/end timestamps + text)

Display captions both in-page and in native fullscreen

Clean, modern UI with configurable glassmorphic styles

🔧 Tech Stack
Vite for fast dev builds

React (19+) as the UI framework

TypeScript for type safety

TailwindCSS for utility-first styling

ReactPlayer (for YouTube/Vimeo/HTML5 uniform playback)

🚀 Getting Started
Clone this repo:

git clone https://github.com/your-username/video-captioner.git
cd video-captioner

Install dependencies:
npm install

# or

yarn

Run in development mode:
npm run dev

# or

yarn dev
Build for production:

npm run build

Preview the production build locally:
npm run preview

🗂️ Project Structure

📦 public # Static HTML entrypoint
└── index.html
📦 src
┣ 📂 components # Reusable React components
┃ ┣ ┣ CaptionForm.tsx
┃ ┃┃ VideoInput.tsx  
 ┃ ┃┃ VideoPlayer.tsx  
 ┃ ┃┗ ErrorBoundary.tsx
┃┗ (others...)
┣ 📜 App.tsx # Main layout and state
┗ 📜 index.tsx # ReactDOM render
├── tailwind.config.js
├── tsconfig.json
└── package.json
