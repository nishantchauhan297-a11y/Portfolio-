/* ============================================================
   EDIT THIS FILE ONLY. Everything on the website is built from it.
   Fill in the fields marked  <-- YOUR DETAILS  and nothing else
   needs to change in index.html / script.js / style.css.
   ============================================================ */

const PROFILE = {
  // ---------- Task 1: personal details ----------  <-- YOUR DETAILS
  name: "Nishant Chauhan",
  role: "Aspiring Developer",     // short title shown on the Home section
  tagline: "I build small, useful programs and learn something new with every project.",
  photo: "assets/profile.jpg",    // put your photo at portfolio/assets/profile.jpg
  intro: "I'm a second-year B.Tech student in Computer Science and Engineering at JECRC University, Jaipur. I enjoy learning programming by building small projects, from Python programs to interactive web apps, and I use AI tools like Cursor to write, debug and improve my code. I'm looking to keep growing my skills and build more real-world projects.",
  location: "Jaipur, Rajasthan, India",

  education: [
    { title: "B.Tech in Computer Science and Engineering (2nd Year)", place: "JECRC University, Jaipur", years: "2025 - 2029" }
  ],

  skills: [
    "Python", "HTML", "CSS", "JavaScript", "Git & GitHub", "Cursor AI", "Vercel"
  ],

  github: "nishantchauhan297-a11y",
  email: "nishantchauhan297@gmail.com",
  linkedin: "",                   // optional full URL, leave "" to hide
  phone: ""                       // optional, leave "" to hide
};

/* ---------- Task 2: the five required projects ----------
   repo  = repository name on your GitHub account
   live  = deployed link (leave "" if none). The Book Reading List
           project must have a live link, as required by the brief. */
const PROJECTS = [
  {
    title: "Python Programs Collection",
    description:
      "A set of core Python programs: factorial, Fibonacci series, and a structure-to-dictionary conversion, with an updated README documenting each program.",
    tech: ["Python", "Git", "README"],
    repo: "Python-Programs-Collection",
    live: ""
  },
  {
    title: "Messy Python Code Improvement",
    description:
      "A deliberately messy Python script cleaned up with AI assistance: clearer names, better structure, comments and simpler logic, with the same behaviour.",
    tech: ["Python", "AI Assistance", "Refactoring"],
    repo: "Messy-Python-Code-improvement",
    live: ""
  },
  {
    title: "Bug Fixing Using Cursor AI",
    description:
      "An incorrect, buggy program that was diagnosed and corrected using Cursor AI, with notes on what was wrong and how it was fixed.",
    tech: ["Python", "Cursor AI", "Debugging"],
    repo: "Bug-fixing-using-Cursor-Ai",
    live: ""
  },
  {
    title: "Interactive Quiz Application",
    description:
      "A browser-based quiz app (Lecture 10) that asks questions one at a time, checks answers and shows the final score.",
    tech: ["HTML", "CSS", "JavaScript", "Quiz"],
    repo: "Interactive-Quiz-Application-",
    live: ""
  },
  {
    title: "Book Reading List Application",
    description:
      "A reading list app (Lecture 11) for adding books and tracking what to read. The README includes the deployed link.",
    tech: ["HTML", "CSS", "JavaScript", "Book", "Vercel"],
    repo: "Book-Reading-List-Application-",
    live: ""                       // <-- YOUR DETAILS: deployed reading-list URL
  }
];

/* ---------- Task 6: extra facts for the chatbot ----------
   The chatbot answers ONLY from PROFILE, PROJECTS and the notes below.
   Write real details here so answers to questions like "What was corrected
   in the buggy code project?" or "How does the reading list work?" are accurate.  <-- YOUR DETAILS */
const CHATBOT_NOTES = {
  pythonPrograms: "The collection is one file, programs.py. Factorial is written with a loop and with recursion and rejects negative numbers. Fibonacci returns the first N numbers of the series by repeatedly adding the previous two. Structure-to-dictionary converts a list of (key, value) tuples, two parallel lists (using zip) and an object's attributes (using vars) into dictionaries. The README explains each program and shows the expected output.",
  messyCode: "The original script calculated each student's average, best mark and grade but used one-letter names like f, g and h, manual loops, deeply nested if/else, string joining with +, and an unused import. With AI assistance it was rewritten with clear function names, sum() and max(), flat if checks, f-strings and docstrings, and an empty-list check. The output is exactly the same as before.",
  bugFix: "The program had three bugs. find_max started from 0, so a list of only negative numbers returned 0; it now starts from the first item. average divided by len + 1, giving 15 instead of 20; it now divides by len. count_vowels ignored capital vowels, so Education gave 4 instead of 5; it now lowercases the text first. Cursor AI helped explain each wrong result, and assert checks in fixed.py prove the fixes.",
  quizApp: "The quiz has 7 multiple-choice questions on web development, Python and Git, stored as an array in script.js. It shows one question at a time with a progress counter and score, turns the correct answer green and a wrong pick red, and ends with a final score screen and a Try again button. Built with HTML, CSS and JavaScript in Lecture 10.",
  readingList: "The reading list lets you add a book with a title and author, mark it read or unread, remove it, and filter by All, To Read and Read. A summary shows total, read and remaining books. Books are saved in the browser's localStorage so they stay after refresh. Built with HTML, CSS and JavaScript in Lecture 11 and deployed on Vercel; the live link is in the project card and README.",
  other: "Nishant is a second-year B.Tech CSE student at JECRC University, Jaipur (2025-2029). He uses Cursor AI to write and debug code."
};
