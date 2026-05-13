import { connect } from 'mongoose'
import { config } from 'dotenv'
import { ArticleModel } from './models/ArticleModel.js'
import { UserModel } from './models/UserModel.js'

config()

const articles = [
    {
        title: "Getting Started with React: A Complete Beginner's Guide",
        category: "Technology",
        content: `React is a powerful JavaScript library for building user interfaces. Developed and maintained by Meta, it has become one of the most popular front-end tools in the world.

## Why React?

React's component-based architecture allows developers to build complex UIs from small, isolated pieces of code called components. Each component manages its own state, making your app easier to develop and maintain.

## Key Concepts

**1. JSX**
JSX is a syntax extension that lets you write HTML-like code inside JavaScript. It makes your components intuitive and readable.

**2. Components**
Everything in React is a component. Functional components are the modern standard — simple JavaScript functions that return JSX.

**3. State & Props**
State is internal data managed by a component. Props are data passed from parent to child components. Together, they make your UI dynamic and interactive.

**4. Hooks**
Hooks like useState and useEffect let you add state and side effects to functional components without writing class components.

## Getting Started

Install React using Vite:
\`\`\`
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
\`\`\`

React's ecosystem is vast — from routing with React Router to state management with Zustand or Redux. Start small, learn the fundamentals, and build your way up!`
    },
    {
        title: "Understanding JavaScript Promises and Async/Await",
        category: "Technology",
        content: `Asynchronous programming is at the heart of modern JavaScript. Whether you're fetching data from an API or reading files, understanding Promises and async/await is essential.

## What is a Promise?

A Promise is an object representing the eventual completion or failure of an asynchronous operation. It can be in one of three states: **pending**, **fulfilled**, or **rejected**.

\`\`\`javascript
const fetchData = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Data loaded!"), 1000);
});

fetchData.then(data => console.log(data));
\`\`\`

## Async/Await

Async/await is syntactic sugar over Promises. It makes asynchronous code look and behave more like synchronous code.

\`\`\`javascript
const getData = async () => {
    try {
        const res = await fetch('https://api.example.com/data');
        const json = await res.json();
        console.log(json);
    } catch (err) {
        console.error(err);
    }
};
\`\`\`

## Why It Matters

Without async programming, your browser would freeze while waiting for network requests. Promises and async/await keep your app responsive and your code clean.

Master these concepts and you'll be able to work confidently with any modern JavaScript framework or library.`
    },
    {
        title: "The Art of Minimalism: Living with Less",
        category: "Lifestyle",
        content: `In a world of constant noise and endless consumption, minimalism offers a refreshing alternative — a deliberate choice to own less, do less, and focus on what truly matters.

## What is Minimalism?

Minimalism is not about deprivation. It's about intentionality. It's the practice of removing everything that doesn't add value to your life, so that what remains can shine.

## Benefits of a Minimalist Lifestyle

**Mental Clarity**
Clutter in your environment creates clutter in your mind. A clean, simple space fosters focus, creativity, and calm.

**Financial Freedom**
When you stop buying things you don't need, you save more, stress less, and gain control over your finances.

**More Time**
Fewer possessions mean less time cleaning, organizing, and maintaining. You free up hours each week for what you love.

**Environmental Impact**
Consuming less directly reduces your environmental footprint. It's one of the most effective things an individual can do for the planet.

## Getting Started

Start with one drawer. Remove everything that doesn't serve a purpose. Then move to a room. The momentum builds naturally.

Ask yourself for every item: *Does this add value to my life?* If the answer isn't a clear yes, let it go.

Minimalism is a journey, not a destination. Begin small, be patient, and enjoy the incredible lightness of less.`
    },
    {
        title: "Node.js and Express: Building Your First REST API",
        category: "Technology",
        content: `Building a REST API with Node.js and Express is one of the most practical skills a full-stack developer can have. Let's walk through building one from scratch.

## Setting Up

\`\`\`bash
mkdir my-api && cd my-api
npm init -y
npm install express dotenv
\`\`\`

## Creating the Server

\`\`\`javascript
import express from 'express'
import { config } from 'dotenv'

config()
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ message: 'API is running!' })
})

app.listen(process.env.PORT || 4000, () => {
    console.log('Server started')
})
\`\`\`

## REST Principles

A good REST API follows these conventions:
- **GET** — retrieve data
- **POST** — create data
- **PUT/PATCH** — update data
- **DELETE** — remove data

## Adding Routes

Organize your routes into separate files using Express Router. This keeps your codebase clean and scalable as your app grows.

## Error Handling

Always add centralized error handling middleware at the end of your app to catch and format errors consistently.

With Express, you can build powerful, production-ready APIs quickly. Combine it with MongoDB and you have the backbone of a full MERN application.`
    },
    {
        title: "MongoDB Essentials: A Practical Introduction",
        category: "Technology",
        content: `MongoDB is a NoSQL database that stores data in flexible, JSON-like documents. It's the backbone of the MERN stack and one of the most widely used databases today.

## Why MongoDB?

Unlike traditional relational databases, MongoDB doesn't require a fixed schema. This makes it ideal for applications where data structure evolves rapidly.

## Core Concepts

**Documents**
A document is a record in MongoDB — similar to a row in SQL, but much more flexible. Documents are stored in BSON format (Binary JSON).

**Collections**
A collection is a group of documents — similar to a table in SQL. Collections don't enforce a schema by default.

**Databases**
Each MongoDB server can host multiple databases, each containing multiple collections.

## Basic Operations

\`\`\`javascript
// Insert
await UserModel.create({ name: 'Alice', email: 'alice@example.com' })

// Find
const users = await UserModel.find({ isActive: true })

// Update
await UserModel.findByIdAndUpdate(id, { name: 'Bob' })

// Delete
await UserModel.findByIdAndDelete(id)
\`\`\`

## Mongoose

Mongoose is the most popular ODM (Object Document Mapper) for MongoDB in Node.js. It adds schema validation, middleware, and a powerful query API on top of the native MongoDB driver.

Start with MongoDB Atlas — the cloud-hosted version — for easy setup and free tier hosting perfect for development and small production apps.`
    },
    {
        title: "How to Stay Productive While Working From Home",
        category: "Lifestyle",
        content: `Remote work is here to stay. But without the structure of an office, staying productive can be a real challenge. Here are proven strategies to help you thrive.

## Create a Dedicated Workspace

Your brain associates environments with behaviors. A dedicated desk — even in a corner of your room — signals your brain that it's time to work. Avoid working from your bed or couch.

## Set a Consistent Schedule

Start and end work at the same time every day. This routine preserves the boundary between work and personal life — something that easily blurs at home.

## The Pomodoro Technique

Work in focused 25-minute blocks followed by 5-minute breaks. After four cycles, take a longer break. This rhythm maintains concentration while preventing burnout.

## Eliminate Digital Distractions

Turn off non-essential notifications during work hours. Use tools like Focus Mode, Cold Turkey, or simply put your phone face-down in another room.

## Stay Connected

Remote work can be isolating. Schedule regular video calls with your team. Even a 10-minute casual check-in maintains the social bonds that fuel collaboration.

## Move Your Body

Without the commute or office movement, remote workers sit more than ever. Schedule short walks, stretch breaks, or workouts. Physical movement directly improves mental performance.

Working from home is a skill. Like any skill, it improves with practice and the right habits.`
    },
    {
        title: "Introduction to Tailwind CSS: Utility-First Styling",
        category: "Technology",
        content: `Tailwind CSS has transformed how developers write styles. Instead of writing custom CSS, you apply pre-built utility classes directly in your HTML. The result? Faster development and more consistent UIs.

## The Utility-First Approach

Traditional CSS requires you to name classes, write separate style files, and switch context constantly. Tailwind keeps everything in one place.

\`\`\`html
<!-- Traditional CSS -->
<div class="card">Hello</div>

<!-- Tailwind CSS -->
<div class="bg-white rounded-xl shadow-md p-6">Hello</div>
\`\`\`

## Key Benefits

**Speed**
No more naming things. Just describe what you want visually and move on.

**Consistency**
Tailwind's design system gives you a curated set of spacing, colors, and typography values that work harmoniously together.

**Responsive Design**
Prefix any utility with a breakpoint to make it responsive: \`md:text-xl\`, \`lg:grid-cols-3\`.

**Dark Mode**
Add dark variants with the \`dark:\` prefix: \`dark:bg-gray-900\`.

## Getting Started

\`\`\`bash
npm install tailwindcss @tailwindcss/vite
\`\`\`

Configure it in your \`vite.config.js\` and import it in your CSS file.

Tailwind has a learning curve, but once it clicks, you'll find it hard to go back to writing traditional CSS.`
    },
    {
        title: "The Science of Sleep: Why Rest is Your Superpower",
        category: "Health",
        content: `We live in a culture that glorifies hustle and devalues sleep. But science is clear: sleep is not laziness. It's a biological necessity that drives performance, health, and happiness.

## What Happens When You Sleep?

Sleep is an active process. During deep sleep, your brain clears metabolic waste, consolidates memories, and repairs cellular damage. Your immune system strengthens, and hormones that regulate hunger and mood are balanced.

## The Consequences of Sleep Deprivation

Chronic poor sleep is linked to:
- Increased risk of heart disease and diabetes
- Impaired cognitive function and memory
- Weakened immune response
- Mood disorders including depression and anxiety
- Higher rates of accidents

## How Much Sleep Do You Need?

Most adults need **7–9 hours** per night. Teenagers need more. The myth of being a "short sleeper" who functions on 5 hours applies to less than 1% of the population.

## Tips for Better Sleep

**Consistency**: Go to bed and wake up at the same time every day — even weekends.

**Darkness**: Your body produces melatonin in response to darkness. Dim lights 1–2 hours before bed.

**Cool Room**: Core body temperature drops during sleep. A cool room (65–68°F) promotes deeper sleep.

**No Screens**: Blue light from screens suppresses melatonin. Use night mode or avoid screens before bed.

Treat sleep as a non-negotiable. It's the foundation everything else is built on.`
    }
]

const seedArticles = async () => {
    try {
        await connect(process.env.DB_URL)
        console.log('✅ Connected to MongoDB Atlas')

        // Use admin as the author
        const admin = await UserModel.findOne({ email: 'admin@gmail.com' })
        if (!admin) {
            console.error('❌ Admin user not found. Run seedAdmin.js first.')
            process.exit(1)
        }

        // Check existing count
        const existingCount = await ArticleModel.countDocuments()
        if (existingCount > 0) {
            console.log(`⚠️  ${existingCount} articles already exist. Skipping seed.`)
            console.log('   Delete existing articles first if you want to re-seed.')
            process.exit(0)
        }

        const docs = articles.map(a => ({ ...a, author: admin._id }))
        await ArticleModel.insertMany(docs)

        console.log(`🎉 ${articles.length} articles seeded successfully!`)
        articles.forEach((a, i) => console.log(`   ${i + 1}. [${a.category}] ${a.title}`))
        process.exit(0)
    } catch (err) {
        console.error('❌ Seed failed:', err.message)
        process.exit(1)
    }
}

seedArticles()
