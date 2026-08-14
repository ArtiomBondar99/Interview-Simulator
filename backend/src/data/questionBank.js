// Curated starter question bank used to ground generateInterviewQuestions() (see
// ai.service.js and questionBank.service.js). This is a hand-authored starter set, not an
// exhaustive library -- any role that doesn't map to one of the 6 domains below, or a
// domain+level combo with no entries, simply falls back to pure AI generation, exactly as it
// worked before this bank existed (see questionBank.service.js's resolveBankDomain).
//
// The AI is instructed to treat these as inspiration -- select, rephrase, adapt, or combine
// them -- never to use them verbatim as a rule. Each level's array is deliberately spread
// across distinct topics (not many questions on one topic) so a random sample of ~6 stays
// varied; keep that property when adding more entries.
//
// Entry shape: { id, topic, question, difficulty: "easy" | "medium" | "hard" }
// `id` is bookkeeping only (kebab-case, unique within its domain+level array) -- it's stripped
// before ever reaching a prompt payload.

const questionBank = {
  backendNode: {
    junior: [
      { id: "node-jr-1", topic: "JavaScript fundamentals", question: "What is the difference between `==` and `===` in JavaScript, and which should you generally prefer?", difficulty: "easy" },
      { id: "node-jr-2", topic: "Event loop", question: "Can you explain, at a high level, how the Node.js event loop lets a single-threaded server handle many requests at once?", difficulty: "medium" },
      { id: "node-jr-3", topic: "Async/await", question: "What problem does `async`/`await` solve compared to plain callbacks?", difficulty: "easy" },
      { id: "node-jr-4", topic: "npm and tooling", question: "What is the difference between `dependencies` and `devDependencies` in package.json?", difficulty: "easy" },
      { id: "node-jr-5", topic: "REST APIs", question: "What HTTP method and status code would you use to create a new resource, and why?", difficulty: "easy" },
      { id: "node-jr-6", topic: "Error handling", question: "How would you handle an error thrown inside an async route handler in Express?", difficulty: "medium" },
      { id: "node-jr-7", topic: "Testing basics", question: "What's the difference between a unit test and an integration test?", difficulty: "easy" },
      { id: "node-jr-8", topic: "Git", question: "What's the difference between `git merge` and `git rebase`?", difficulty: "easy" },
      { id: "node-jr-9", topic: "SQL basics", question: "What is the difference between an INNER JOIN and a LEFT JOIN?", difficulty: "easy" },
      { id: "node-jr-10", topic: "Debugging", question: "Your Node.js server crashes with 'UnhandledPromiseRejection'. What does that mean and how would you track down the cause?", difficulty: "medium" },
    ],
    mid: [
      { id: "node-mid-1", topic: "Express middleware", question: "Walk me through what happens, step by step, when a request reaches an Express server with several middleware functions registered.", difficulty: "medium" },
      { id: "node-mid-2", topic: "Authentication", question: "What's the difference between session-based authentication and JWT-based authentication? What are the tradeoffs?", difficulty: "medium" },
      { id: "node-mid-3", topic: "Database transactions", question: "Why would you wrap two related database writes in a transaction? What could go wrong if you didn't?", difficulty: "medium" },
      { id: "node-mid-4", topic: "SQL indexes", question: "What is a database index, and what's the tradeoff of adding one?", difficulty: "medium" },
      { id: "node-mid-5", topic: "Caching", question: "When would you introduce a cache like Redis into a Node.js API, and what problems can a cache introduce?", difficulty: "medium" },
      { id: "node-mid-6", topic: "Concurrency", question: "Two users try to purchase the last unit of a product at the same time. What could go wrong, and how would you prevent it?", difficulty: "hard" },
      { id: "node-mid-7", topic: "API design", question: "How would you version a public REST API without breaking existing clients?", difficulty: "medium" },
      { id: "node-mid-8", topic: "Docker", question: "Why containerize a Node.js application instead of just running it directly on a server?", difficulty: "easy" },
      { id: "node-mid-9", topic: "Practical debugging", question: "Your API works fine locally but returns a 500 error only in production. How would you investigate?", difficulty: "medium" },
      { id: "node-mid-10", topic: "Error handling patterns", question: "How would you design centralized error handling for an Express application with many routes?", difficulty: "medium" },
    ],
    senior: [
      { id: "node-sr-1", topic: "System design", question: "How would you design a URL-shortener service that needs to scale to millions of requests per day?", difficulty: "hard" },
      { id: "node-sr-2", topic: "Database scaling", question: "Your users table has grown to 50 million rows and queries have gotten slow. Walk me through how you'd investigate and address it.", difficulty: "hard" },
      { id: "node-sr-3", topic: "Microservices vs monolith", question: "When would you recommend splitting a monolith into microservices, and when would you argue against it?", difficulty: "hard" },
      { id: "node-sr-4", topic: "Distributed systems", question: "What is eventual consistency, and when is it an acceptable tradeoff in a distributed system?", difficulty: "hard" },
      { id: "node-sr-5", topic: "Security", question: "How would you design an authentication system to be resilient against token theft?", difficulty: "hard" },
      { id: "node-sr-6", topic: "Observability", question: "How would you design logging, metrics, and tracing for a system made of several Node.js services?", difficulty: "hard" },
      { id: "node-sr-7", topic: "Concurrency at scale", question: "How would you safely process a queue of jobs with multiple worker instances without processing the same job twice?", difficulty: "hard" },
      { id: "node-sr-8", topic: "Architecture tradeoffs", question: "Describe a significant architectural decision you'd need to make early in a new project, and how you'd reason about the tradeoffs.", difficulty: "hard" },
      { id: "node-sr-9", topic: "Code review philosophy", question: "What do you look for in a code review beyond 'does it work'?", difficulty: "medium" },
      { id: "node-sr-10", topic: "Incident response", question: "Production is down and customers are affected. Walk me through how you'd handle the first ten minutes.", difficulty: "hard" },
    ],
  },

  pythonBackend: {
    junior: [
      { id: "py-jr-1", topic: "Python fundamentals", question: "What is the difference between a list and a tuple in Python?", difficulty: "easy" },
      { id: "py-jr-2", topic: "Comprehensions", question: "Can you write a list comprehension that squares every even number in a list?", difficulty: "easy" },
      { id: "py-jr-3", topic: "Virtual environments", question: "Why do we use virtual environments in Python projects instead of installing packages globally?", difficulty: "easy" },
      { id: "py-jr-4", topic: "Exception handling", question: "What's the difference between catching a specific exception and using a bare `except:`?", difficulty: "easy" },
      { id: "py-jr-5", topic: "REST basics", question: "In a framework like FastAPI or Flask, what's the role of a route decorator?", difficulty: "easy" },
      { id: "py-jr-6", topic: "Testing", question: "What does `pytest` do differently from just running your script manually to check it works?", difficulty: "easy" },
      { id: "py-jr-7", topic: "Git", question: "What does `git stash` do, and when would you use it?", difficulty: "easy" },
      { id: "py-jr-8", topic: "SQL basics", question: "What does the SQL `GROUP BY` clause do?", difficulty: "easy" },
      { id: "py-jr-9", topic: "The GIL", question: "What is the Global Interpreter Lock (GIL), at a basic level?", difficulty: "medium" },
      { id: "py-jr-10", topic: "Debugging", question: "Your Python script raises a `KeyError` you didn't expect. How would you go about debugging it?", difficulty: "easy" },
    ],
    mid: [
      { id: "py-mid-1", topic: "Async Python", question: "When would you reach for `asyncio` in a Python backend service, and when is it unnecessary?", difficulty: "medium" },
      { id: "py-mid-2", topic: "Framework tradeoffs", question: "What are the tradeoffs between FastAPI and Django for building a new API?", difficulty: "medium" },
      { id: "py-mid-3", topic: "ORMs", question: "What problem does an ORM like SQLAlchemy solve, and what's a downside of relying on it heavily?", difficulty: "medium" },
      { id: "py-mid-4", topic: "Authentication", question: "How would you implement token-based authentication in a Python API?", difficulty: "medium" },
      { id: "py-mid-5", topic: "Testing and mocking", question: "How would you test a function that calls an external API, without actually calling it in your test suite?", difficulty: "medium" },
      { id: "py-mid-6", topic: "Background tasks", question: "Why would you offload work to a background task queue like Celery instead of doing it inside the request handler?", difficulty: "medium" },
      { id: "py-mid-7", topic: "Caching", question: "How would you decide what to cache in a Python API, and for how long?", difficulty: "medium" },
      { id: "py-mid-8", topic: "Docker", question: "What would a Dockerfile for a typical Python web service need to handle correctly?", difficulty: "medium" },
      { id: "py-mid-9", topic: "API design", question: "How would you design pagination for an endpoint that can return millions of rows?", difficulty: "medium" },
      { id: "py-mid-10", topic: "Practical debugging", question: "A Python service works fine under light load but times out under heavy load. How would you investigate?", difficulty: "hard" },
    ],
    senior: [
      { id: "py-sr-1", topic: "GIL and multiprocessing", question: "Given the GIL, how would you actually achieve CPU-bound parallelism in a Python service?", difficulty: "hard" },
      { id: "py-sr-2", topic: "Scaling Python services", question: "How would you scale a Python API to handle 10x its current traffic?", difficulty: "hard" },
      { id: "py-sr-3", topic: "Distributed task queues", question: "How would you design a job queue system that guarantees a task runs at least once, even if a worker crashes mid-task?", difficulty: "hard" },
      { id: "py-sr-4", topic: "Security", question: "What are the most important security considerations when designing an API that accepts file uploads?", difficulty: "hard" },
      { id: "py-sr-5", topic: "Observability", question: "How would you instrument a Python service so you can quickly diagnose a production slowdown?", difficulty: "hard" },
      { id: "py-sr-6", topic: "Database scaling", question: "Your primary Postgres database is becoming a bottleneck for reads. What options would you consider, and what are the tradeoffs?", difficulty: "hard" },
      { id: "py-sr-7", topic: "Architecture decisions", question: "How would you decide whether a new piece of functionality belongs in the existing service or a new one?", difficulty: "hard" },
      { id: "py-sr-8", topic: "Concurrency models", question: "What's the difference between concurrency achieved through async I/O versus through multiprocessing, and when would you pick each?", difficulty: "hard" },
      { id: "py-sr-9", topic: "Mentoring", question: "How do you approach reviewing a junior engineer's pull request that works but has design issues?", difficulty: "medium" },
      { id: "py-sr-10", topic: "Incident response", question: "A deploy causes a spike in error rates. How would you decide between rolling back and fixing forward?", difficulty: "hard" },
    ],
  },

  frontendReact: {
    junior: [
      { id: "react-jr-1", topic: "React fundamentals", question: "What is the difference between props and state in React?", difficulty: "easy" },
      { id: "react-jr-2", topic: "Hooks basics", question: "What does the `useEffect` hook do, and when does its callback run?", difficulty: "easy" },
      { id: "react-jr-3", topic: "JSX", question: "Why can't you return two sibling elements from a component without wrapping them in something?", difficulty: "easy" },
      { id: "react-jr-4", topic: "Event handling", question: "How do you pass data from a child component back up to its parent?", difficulty: "easy" },
      { id: "react-jr-5", topic: "Conditional rendering", question: "What are a couple of ways to conditionally render an element in JSX?", difficulty: "easy" },
      { id: "react-jr-6", topic: "Lists and keys", question: "Why does React want a unique `key` prop when rendering a list, and what happens if you don't provide one?", difficulty: "medium" },
      { id: "react-jr-7", topic: "Fetching data", question: "How would you fetch data from an API when a component first mounts?", difficulty: "easy" },
      { id: "react-jr-8", topic: "Styling", question: "What are a couple of common approaches to styling components in a React app?", difficulty: "easy" },
      { id: "react-jr-9", topic: "Debugging", question: "A component isn't re-rendering when you expect it to. What would you check first?", difficulty: "medium" },
      { id: "react-jr-10", topic: "Git", question: "What's the purpose of a `.gitignore` file, and what should typically go in one for a React project?", difficulty: "easy" },
    ],
    mid: [
      { id: "react-mid-1", topic: "State management", question: "When would you reach for Context or a state management library instead of just component state?", difficulty: "medium" },
      { id: "react-mid-2", topic: "Performance", question: "What does `React.memo` do, and when might using it not actually help performance?", difficulty: "medium" },
      { id: "react-mid-3", topic: "Custom hooks", question: "What's the benefit of extracting logic into a custom hook instead of duplicating it across components?", difficulty: "medium" },
      { id: "react-mid-4", topic: "Routing", question: "How would you protect a route so only authenticated users can access it?", difficulty: "medium" },
      { id: "react-mid-5", topic: "Forms", question: "How would you handle validation for a form with several interdependent fields?", difficulty: "medium" },
      { id: "react-mid-6", topic: "Testing", question: "How would you test that clicking a button in a component triggers the expected behavior?", difficulty: "medium" },
      { id: "react-mid-7", topic: "Accessibility", question: "What's one accessibility issue that's easy to introduce by accident in a React app, and how would you avoid it?", difficulty: "medium" },
      { id: "react-mid-8", topic: "Build tooling", question: "What is code splitting, and why would you want it in a larger React app?", difficulty: "medium" },
      { id: "react-mid-9", topic: "API integration", question: "How would you handle a slow network request so the UI doesn't feel broken while it's in flight?", difficulty: "medium" },
      { id: "react-mid-10", topic: "Error boundaries", question: "What is an error boundary, and what can it not catch?", difficulty: "medium" },
    ],
    senior: [
      { id: "react-sr-1", topic: "Frontend architecture", question: "How would you structure a large React codebase so multiple teams can work in it without constantly stepping on each other?", difficulty: "hard" },
      { id: "react-sr-2", topic: "Performance deep-dive", question: "You need to render a list of 10,000 items smoothly. How would you approach it?", difficulty: "hard" },
      { id: "react-sr-3", topic: "Rendering strategies", question: "What are the tradeoffs between client-side rendering, server-side rendering, and static generation?", difficulty: "hard" },
      { id: "react-sr-4", topic: "Design systems", question: "What's the value of a shared component/design system, and what's a real cost of maintaining one?", difficulty: "medium" },
      { id: "react-sr-5", topic: "Testing strategy", question: "How would you decide the right mix of unit tests, integration tests, and end-to-end tests for a frontend application?", difficulty: "hard" },
      { id: "react-sr-6", topic: "State architecture", question: "How would you decide what belongs in global state versus local component state in a large application?", difficulty: "hard" },
      { id: "react-sr-7", topic: "Security", question: "What is XSS, and what are React's built-in protections against it, if any?", difficulty: "hard" },
      { id: "react-sr-8", topic: "Monorepo and tooling", question: "What are the tradeoffs of a monorepo for a frontend team versus multiple separate repositories?", difficulty: "hard" },
      { id: "react-sr-9", topic: "Mentoring", question: "How would you help a team improve consistency in how they write components, without slowing everyone down?", difficulty: "medium" },
      { id: "react-sr-10", topic: "Accessibility at scale", question: "How would you build accessibility into a team's workflow, rather than treating it as an afterthought?", difficulty: "hard" },
    ],
  },

  fullStack: {
    junior: [
      { id: "fs-jr-1", topic: "Client-server communication", question: "At a high level, what happens between a user clicking a button on a webpage and data showing up from the server?", difficulty: "easy" },
      { id: "fs-jr-2", topic: "REST basics", question: "What is the purpose of an HTTP status code, and can you give an example of a 2xx, a 4xx, and a 5xx?", difficulty: "easy" },
      { id: "fs-jr-3", topic: "Authentication flow", question: "At a basic level, how does a website remember that you're logged in as you navigate between pages?", difficulty: "medium" },
      { id: "fs-jr-4", topic: "CORS", question: "What is CORS, and why does a browser sometimes block a request that works fine from a tool like curl?", difficulty: "medium" },
      { id: "fs-jr-5", topic: "Environment variables", question: "Why would you store an API key in an environment variable instead of directly in your code?", difficulty: "easy" },
      { id: "fs-jr-6", topic: "Debugging across the stack", question: "A form submission isn't working. How would you figure out whether the problem is in the frontend or the backend?", difficulty: "medium" },
      { id: "fs-jr-7", topic: "Databases basics", question: "Why would you use a database instead of just storing data in a file?", difficulty: "easy" },
      { id: "fs-jr-8", topic: "Deployment", question: "What's the difference between your local development environment and a production environment?", difficulty: "easy" },
      { id: "fs-jr-9", topic: "Git", question: "How would you resolve a merge conflict when two people changed the same file?", difficulty: "easy" },
      { id: "fs-jr-10", topic: "HTTP basics", question: "What's the difference between a GET request and a POST request?", difficulty: "easy" },
    ],
    mid: [
      { id: "fs-mid-1", topic: "Feature design", question: "How would you design the API and database changes needed for a new 'favorite this item' feature?", difficulty: "medium" },
      { id: "fs-mid-2", topic: "API contracts", question: "How would you keep the frontend and backend in sync as an API's shape evolves over time?", difficulty: "medium" },
      { id: "fs-mid-3", topic: "State synchronization", question: "If two browser tabs are open to the same app, how would you keep them showing consistent data?", difficulty: "medium" },
      { id: "fs-mid-4", topic: "Caching across the stack", question: "Where might you introduce caching in a full-stack application, and what's the risk at each layer?", difficulty: "medium" },
      { id: "fs-mid-5", topic: "Authentication strategies", question: "What are the tradeoffs between cookie-based sessions, JWTs, and OAuth for a new application?", difficulty: "medium" },
      { id: "fs-mid-6", topic: "Testing across the stack", question: "How would you test a feature that spans a frontend form, a backend endpoint, and a database write?", difficulty: "medium" },
      { id: "fs-mid-7", topic: "CI/CD", question: "What would a reasonable CI pipeline check before allowing code to be merged?", difficulty: "medium" },
      { id: "fs-mid-8", topic: "Monitoring", question: "How would you know if a feature you shipped is actually broken for users, before they file a support ticket?", difficulty: "medium" },
      { id: "fs-mid-9", topic: "Error handling end-to-end", question: "A backend validation fails. How should that error travel from the database, through the API, to something useful on screen?", difficulty: "medium" },
      { id: "fs-mid-10", topic: "Performance across the stack", question: "A page feels slow. How would you figure out whether the bottleneck is the frontend, the network, or the backend?", difficulty: "hard" },
    ],
    senior: [
      { id: "fs-sr-1", topic: "System architecture", question: "How would you decide the overall architecture (monolith, modular monolith, microservices) for a new product from scratch?", difficulty: "hard" },
      { id: "fs-sr-2", topic: "Scaling", question: "Your product just got a huge spike in signups. What would you look at first to make sure the system holds up?", difficulty: "hard" },
      { id: "fs-sr-3", topic: "Rendering tradeoffs", question: "When would you choose server-side rendering over client-side rendering for a full-stack product, and why?", difficulty: "hard" },
      { id: "fs-sr-4", topic: "Security across the stack", question: "Where are the most common places security gets overlooked across a full-stack application?", difficulty: "hard" },
      { id: "fs-sr-5", topic: "Data consistency", question: "How would you keep data consistent between a primary database and a search index or cache that's derived from it?", difficulty: "hard" },
      { id: "fs-sr-6", topic: "Observability", question: "How would you design logging and tracing so you can follow one user's request across the entire stack?", difficulty: "hard" },
      { id: "fs-sr-7", topic: "Technical leadership", question: "How would you convince a team to pay down technical debt when the business wants new features?", difficulty: "medium" },
      { id: "fs-sr-8", topic: "Cost and complexity tradeoffs", question: "How do you decide when a simpler, less 'correct' solution is actually the right engineering call?", difficulty: "hard" },
      { id: "fs-sr-9", topic: "Incident response", question: "A critical bug reaches production and affects payments. Walk me through how you'd handle it end to end.", difficulty: "hard" },
      { id: "fs-sr-10", topic: "Process", question: "How would you structure code review and deployment practices for a growing full-stack team?", difficulty: "medium" },
    ],
  },

  devops: {
    junior: [
      { id: "devops-jr-1", topic: "Linux basics", question: "How would you find out which process is using a specific port on a Linux machine?", difficulty: "easy" },
      { id: "devops-jr-2", topic: "Docker basics", question: "What is the difference between a Docker image and a Docker container?", difficulty: "easy" },
      { id: "devops-jr-3", topic: "CI/CD concepts", question: "What is continuous integration, and what problem does it solve?", difficulty: "easy" },
      { id: "devops-jr-4", topic: "Networking basics", question: "What does DNS do, in simple terms?", difficulty: "easy" },
      { id: "devops-jr-5", topic: "Git", question: "What's the purpose of a branch, and why not just commit everything to main?", difficulty: "easy" },
      { id: "devops-jr-6", topic: "Secrets management", question: "Why shouldn't you commit an API key or password directly into a Git repository?", difficulty: "easy" },
      { id: "devops-jr-7", topic: "Cloud basics", question: "What's the difference between renting a server and using a 'serverless' function?", difficulty: "medium" },
      { id: "devops-jr-8", topic: "Monitoring basics", question: "What's the difference between a log and a metric?", difficulty: "easy" },
      { id: "devops-jr-9", topic: "Shell scripting", question: "What would a basic shell script to back up a folder and timestamp it look like, roughly?", difficulty: "medium" },
      { id: "devops-jr-10", topic: "Troubleshooting", question: "A website is returning 'connection refused'. What would you check first?", difficulty: "medium" },
    ],
    mid: [
      { id: "devops-mid-1", topic: "Docker Compose", question: "Why would you use Docker Compose instead of manually running several `docker run` commands?", difficulty: "medium" },
      { id: "devops-mid-2", topic: "CI/CD pipeline design", question: "What stages would you include in a CI/CD pipeline for a typical web application, in what order, and why?", difficulty: "medium" },
      { id: "devops-mid-3", topic: "Kubernetes basics", question: "At a high level, what problem does Kubernetes solve that plain Docker doesn't?", difficulty: "medium" },
      { id: "devops-mid-4", topic: "Infrastructure as code", question: "What's the benefit of defining infrastructure in code (e.g. Terraform) instead of clicking through a cloud console?", difficulty: "medium" },
      { id: "devops-mid-5", topic: "Load balancing", question: "What does a load balancer do, and what happens if one of the backend servers behind it goes down?", difficulty: "medium" },
      { id: "devops-mid-6", topic: "Deployment strategies", question: "What's the difference between a blue-green deployment and a rolling deployment?", difficulty: "medium" },
      { id: "devops-mid-7", topic: "Logging and monitoring", question: "How would you set up alerting so your team knows about an outage before customers do?", difficulty: "medium" },
      { id: "devops-mid-8", topic: "Security basics", question: "What's the principle of least privilege, and how would you apply it to a cloud environment?", difficulty: "medium" },
      { id: "devops-mid-9", topic: "Networking", question: "What's the difference between a public subnet and a private subnet in a cloud VPC?", difficulty: "medium" },
      { id: "devops-mid-10", topic: "Practical troubleshooting", question: "An application runs fine locally but fails to connect to the database once deployed inside Docker. What would you check?", difficulty: "medium" },
    ],
    senior: [
      { id: "devops-sr-1", topic: "Kubernetes architecture", question: "How would you design a Kubernetes cluster's architecture for a production workload that needs high availability?", difficulty: "hard" },
      { id: "devops-sr-2", topic: "Scaling infrastructure", question: "Traffic to your platform is expected to grow 10x over the next year. How would you plan the infrastructure for that?", difficulty: "hard" },
      { id: "devops-sr-3", topic: "High availability", question: "How would you design a system to survive an entire cloud region going down?", difficulty: "hard" },
      { id: "devops-sr-4", topic: "Cost optimization", question: "Your cloud bill has doubled in three months with no major traffic growth. How would you investigate?", difficulty: "hard" },
      { id: "devops-sr-5", topic: "Security architecture", question: "How would you design network and access controls for a multi-team cloud environment?", difficulty: "hard" },
      { id: "devops-sr-6", topic: "On-call and incident response", question: "How would you structure an on-call rotation and incident process for a growing engineering team?", difficulty: "medium" },
      { id: "devops-sr-7", topic: "Observability at scale", question: "How would you design observability (logs, metrics, traces) for a system made of dozens of services?", difficulty: "hard" },
      { id: "devops-sr-8", topic: "Infrastructure as code at scale", question: "How would you manage infrastructure-as-code across many environments without configuration drift?", difficulty: "hard" },
      { id: "devops-sr-9", topic: "Disaster recovery", question: "How would you design and test a disaster recovery plan for a critical production database?", difficulty: "hard" },
      { id: "devops-sr-10", topic: "Team practices", question: "How would you introduce better deployment practices to a team that currently deploys by SSHing into production?", difficulty: "medium" },
    ],
  },

  aiMl: {
    junior: [
      { id: "ml-jr-1", topic: "ML fundamentals", question: "In simple terms, what does it mean for a model to 'learn' from data?", difficulty: "easy" },
      { id: "ml-jr-2", topic: "Train/test split", question: "Why do we split data into a training set and a test set instead of training on everything?", difficulty: "easy" },
      { id: "ml-jr-3", topic: "Overfitting", question: "What is overfitting, and how would you notice it's happening?", difficulty: "easy" },
      { id: "ml-jr-4", topic: "Classification vs regression", question: "What's the difference between a classification problem and a regression problem? Give an example of each.", difficulty: "easy" },
      { id: "ml-jr-5", topic: "Metrics", question: "Why might accuracy be a misleading metric for a dataset where 95% of examples belong to one class?", difficulty: "medium" },
      { id: "ml-jr-6", topic: "Neural networks basics", question: "At a basic level, what is a neural network made of?", difficulty: "easy" },
      { id: "ml-jr-7", topic: "Data preprocessing", question: "Why would you normalize or scale numerical features before training a model?", difficulty: "medium" },
      { id: "ml-jr-8", topic: "Features", question: "What is a 'feature' in machine learning, and why does feature quality matter?", difficulty: "easy" },
      { id: "ml-jr-9", topic: "Supervised vs unsupervised", question: "What's the difference between supervised and unsupervised learning?", difficulty: "easy" },
      { id: "ml-jr-10", topic: "Tooling", question: "What is pandas typically used for in a machine learning workflow?", difficulty: "easy" },
    ],
    mid: [
      { id: "ml-mid-1", topic: "Model evaluation", question: "When would you care more about precision than recall, and vice versa?", difficulty: "medium" },
      { id: "ml-mid-2", topic: "Cross-validation", question: "Why would you use k-fold cross-validation instead of a single train/test split?", difficulty: "medium" },
      { id: "ml-mid-3", topic: "Regularization", question: "What problem does regularization address, and how does it help?", difficulty: "medium" },
      { id: "ml-mid-4", topic: "Embeddings", question: "What is an embedding, in simple terms, and why are they useful for text?", difficulty: "medium" },
      { id: "ml-mid-5", topic: "NLP basics", question: "What's the difference between tokenization and stemming/lemmatization?", difficulty: "medium" },
      { id: "ml-mid-6", topic: "LLM concepts", question: "At a high level, how does a large language model decide what word to generate next?", difficulty: "medium" },
      { id: "ml-mid-7", topic: "Prompt engineering", question: "What's the difference between zero-shot and few-shot prompting?", difficulty: "medium" },
      { id: "ml-mid-8", topic: "Model deployment basics", question: "What's different about serving a trained model in production compared to using it in a notebook?", difficulty: "medium" },
      { id: "ml-mid-9", topic: "Data pipelines", question: "Why would you build an automated data pipeline instead of manually preparing data each time you retrain?", difficulty: "medium" },
      { id: "ml-mid-10", topic: "Bias and fairness", question: "How could a model end up biased even if the training code has no explicit bias in it?", difficulty: "medium" },
    ],
    senior: [
      { id: "ml-sr-1", topic: "RAG architecture", question: "How would you design a retrieval-augmented generation (RAG) system for answering questions over a company's internal documents?", difficulty: "hard" },
      { id: "ml-sr-2", topic: "LLM evaluation", question: "How would you evaluate the quality of an LLM-based feature before shipping it, given that outputs are non-deterministic?", difficulty: "hard" },
      { id: "ml-sr-3", topic: "Fine-tuning vs prompting", question: "When would you fine-tune a model instead of relying on prompting or RAG, and what are the tradeoffs?", difficulty: "hard" },
      { id: "ml-sr-4", topic: "Production ML systems", question: "How would you design a production system to safely roll out a new model version without disrupting users?", difficulty: "hard" },
      { id: "ml-sr-5", topic: "Model monitoring", question: "How would you detect that a model's performance is degrading in production due to data drift?", difficulty: "hard" },
      { id: "ml-sr-6", topic: "Scaling ML infrastructure", question: "How would you design infrastructure to serve model inference at high throughput with low latency?", difficulty: "hard" },
      { id: "ml-sr-7", topic: "Vector databases", question: "How would you decide what to store in a vector database versus a traditional database for an AI-powered product?", difficulty: "hard" },
      { id: "ml-sr-8", topic: "AI system design", question: "How would you design a customer support system that uses an LLM but avoids it confidently giving wrong answers?", difficulty: "hard" },
      { id: "ml-sr-9", topic: "Ethics and safety", question: "What safeguards would you put in place for an AI feature that could be misused, such as generating content on a user's behalf?", difficulty: "hard" },
      { id: "ml-sr-10", topic: "Cost and latency tradeoffs", question: "How would you decide between a smaller, faster, cheaper model and a larger, more capable one for a given feature?", difficulty: "hard" },
    ],
  },
};

const BANK_DOMAINS = Object.keys(questionBank);

module.exports = { questionBank, BANK_DOMAINS };
