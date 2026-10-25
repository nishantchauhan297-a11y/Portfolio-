# Nishant Chauhan | Personal Portfolio

A responsive personal portfolio website with project search, light/dark mode and an AI chatbot that answers questions about my skills and projects.

**Live website:** ADD YOUR VERCEL LINK HERE https://portfolio-two-liart-22.vercel.app/

## About

I'm a second-year B.Tech Computer Science and Engineering student at JECRC University, Jaipur (2025-2029). This site showcases the projects I have built while learning Python and web development.

## Sections

Home, About Me, Skills, Projects, Contact Information, AI Chatbot

## Projects shown

1. [Python Programs Collection](https://github.com/nishantchauhan297-a11y/Python-Programs-Collection): factorial, Fibonacci and structure-to-dictionary programs
2. [Messy Python Code Improvement](https://github.com/nishantchauhan297-a11y/Messy-Python-Code-improvement): messy script improved with AI assistance
3. [Bug Fixing Using Cursor AI](https://github.com/nishantchauhan297-a11y/Bug-fixing-using-Cursor-Ai): buggy program found and corrected with Cursor
4. [Interactive Quiz Application](https://github.com/nishantchauhan297-a11y/Interactive-Quiz-Application-): browser quiz with scoring
5. [Book Reading List Application](https://github.com/nishantchauhan297-a11y/Book-Reading-List-Application-): reading list app with a deployed link

## Features

- Personalised, responsive layout (desktop and mobile) with a mobile menu
- Project cards with title, description, technologies, GitHub link and live link
- **Project search**: type a name or technology (e.g. "Python", "Quiz", "Book") and results update instantly
- **Technology filter buttons** and a "no results" message
- **Light / dark mode toggle** that remembers your choice
- **AI chatbot** answering questions grounded in my portfolio information; shows a friendly error message if the API request fails

## Technologies

HTML, CSS, JavaScript, Node.js serverless function (Vercel), Groq API (Llama 3.3), Git, GitHub, Vercel, Cursor AI

## Project structure

```
index.html     page structure
style.css      styles, light/dark themes, responsive layout
script.js      profile rendering, project search/filter, theme toggle
chat.js        chatbot interface (calls /api/chat)
api/chat.js    serverless function that calls the Groq API with the secret key
data.js        all personal details, projects and chatbot facts (edit this to update the site)
vercel.json    includes data.js in the serverless function
assets/        profile photo
```

## How the chatbot works

1. The chat box in `chat.js` sends the visitor's question to `/api/chat`.
2. `api/chat.js` runs on Vercel. It builds instructions from `data.js` (profile, projects and extra project notes) and sends them with the question to the Groq API.
3. The model answers only from that portfolio information, and the reply is shown in the chat.
4. The API key is stored in a Vercel environment variable, so it never appears in the code or on GitHub.

## Setup instructions

### Run locally

1. Clone the repo:
   ```bash
   git clone https://github.com/nishantchauhan297-a11y/portfolio.git
   cd portfolio
   ```
2. Open `index.html` in a browser to see the website (the chatbot needs step 3).
3. To test the chatbot, install the [Vercel CLI](https://vercel.com/docs/cli), copy `.env.example` to `.env`, put your own Groq API key in it, then run:
   ```bash
   vercel dev
   ```

### Deploy on Vercel

1. Push this repo to GitHub.
2. On vercel.com choose **Add New → Project** and import the repo (default settings, no build command).
3. Go to **Settings → Environment Variables** and add `LLM_API_KEY` with your Groq API key (get one at console.groq.com/keys). Optionally set `LLM_PROVIDER=groq`.
4. Redeploy so the variable takes effect.

## Contact

- Email: nishantchauhan297@gmail.com
- GitHub: [nishantchauhan297-a11y](https://github.com/nishantchauhan297-a11y)
- Location: Jaipur, Rajasthan, India
