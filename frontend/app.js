const roleConfigs = {
  frontend: { label: "Frontend Developer", topics: ["javascript", "dom", "async"] },
  react: { label: "React Developer", topics: ["javascript", "dom", "async", "react"] },
  angular: { label: "Angular Developer", topics: ["javascript", "dom", "async", "frontend-framework"] },
  vue: { label: "Vue Developer", topics: ["javascript", "dom", "async", "frontend-framework"] },
  "backend-node": { label: "Backend Node.js Developer", topics: ["javascript", "async", "backend", "database"] },
  fullstack: { label: "Full Stack Developer", topics: ["javascript", "dom", "async", "backend", "database"] },
  "python-backend": { label: "Python Backend Developer", topics: ["python", "backend", "database"] },
  "java-backend": { label: "Java Backend Developer", topics: ["java", "backend", "database"] },
  "dotnet-backend": { label: ".NET Backend Developer", topics: ["backend", "database", "architecture"] },
  "php-backend": { label: "PHP Backend Developer", topics: ["backend", "database", "architecture"] },
  "ruby-backend": { label: "Ruby Backend Developer", topics: ["backend", "database", "architecture"] },
  "golang-backend": { label: "Go Backend Developer", topics: ["backend", "database", "architecture"] },
  "mobile-ios": { label: "iOS Developer", topics: ["mobile", "qa", "product"] },
  "mobile-android": { label: "Android Developer", topics: ["mobile", "qa", "product"] },
  "mobile-flutter": { label: "Flutter Developer", topics: ["mobile", "qa", "product"] },
  "mobile-react-native": { label: "React Native Developer", topics: ["mobile", "react", "javascript"] },
  embedded: { label: "Embedded Software Engineer", topics: ["embedded", "qa", "architecture"] },
  firmware: { label: "Firmware Engineer", topics: ["embedded", "qa", "architecture"] },
  "game-dev": { label: "Game Developer", topics: ["game", "architecture", "qa"] },
  blockchain: { label: "Blockchain Developer", topics: ["blockchain", "security", "backend"] },
  "software-architect": { label: "Software Architect", topics: ["architecture", "backend", "database", "devops"] },
  qa: { label: "QA Tester", topics: ["qa", "product"] },
  "manual-qa": { label: "Manual QA Engineer", topics: ["qa", "product"] },
  automation: { label: "Automation QA Engineer", topics: ["qa", "automation", "javascript", "python"] },
  "performance-qa": { label: "Performance QA Engineer", topics: ["qa", "automation", "devops"] },
  devops: { label: "DevOps Engineer", topics: ["devops", "backend"] },
  sre: { label: "Site Reliability Engineer", topics: ["devops", "cloud", "architecture"] },
  "cloud-engineer": { label: "Cloud Engineer", topics: ["cloud", "devops", "security"] },
  "system-admin": { label: "System Administrator", topics: ["it", "network", "security"] },
  "network-engineer": { label: "Network Engineer", topics: ["network", "security", "it"] },
  "cyber-security": { label: "Cyber Security Analyst", topics: ["security", "network", "devops"] },
  appsec: { label: "Application Security Engineer", topics: ["security", "backend", "architecture"] },
  "soc-analyst": { label: "SOC Analyst", topics: ["security", "network", "it"] },
  "penetration-tester": { label: "Penetration Tester", topics: ["security", "network", "backend"] },
  "data-analyst": { label: "Data Analyst", topics: ["data", "database", "product"] },
  "bi-developer": { label: "BI Developer", topics: ["data", "database", "product"] },
  "data-engineer": { label: "Data Engineer", topics: ["data", "database", "backend", "devops"] },
  "data-scientist": { label: "Data Scientist", topics: ["data", "ml", "python"] },
  "ml-engineer": { label: "Machine Learning Engineer", topics: ["ml", "python", "data", "devops"] },
  "ai-engineer": { label: "AI Engineer", topics: ["ai", "ml", "python", "product"] },
  dba: { label: "Database Administrator", topics: ["database", "devops", "security"] },
  product: { label: "Product Manager", topics: ["product", "data"] },
  "project-manager": { label: "Project Manager", topics: ["project", "product"] },
  "scrum-master": { label: "Scrum Master", topics: ["project", "product"] },
  "ux-ui": { label: "UX/UI Designer", topics: ["design", "product"] },
  "ux-researcher": { label: "UX Researcher", topics: ["design", "product", "data"] },
  "business-analyst": { label: "Business Analyst", topics: ["product", "data", "project"] },
  "system-analyst": { label: "System Analyst", topics: ["architecture", "product", "database"] },
  "technical-support": { label: "Technical Support Engineer", topics: ["support", "it", "product"] },
  helpdesk: { label: "Help Desk Specialist", topics: ["support", "it", "network"] },
  "solutions-architect": { label: "Solutions Architect", topics: ["architecture", "cloud", "product"] },
  "sales-engineer": { label: "Sales Engineer", topics: ["support", "product", "architecture"] },
  "customer-success": { label: "Customer Success Manager", topics: ["support", "product", "data"] },
  "technical-writer": { label: "Technical Writer", topics: ["documentation", "product"] },
  "implementation-specialist": { label: "Implementation Specialist", topics: ["support", "product", "database"] },
  "general-tech": {
    label: "General Technical Interview",
    topics: ["javascript", "python", "java", "qa", "devops", "data", "product", "security", "cloud", "support"],
  },
};

const questionBank = [
  {
    topic: "javascript",
    level: "junior",
    question: "מה ההבדל בין let, const ו-var?",
    hint: "דבר על scope, hoisting ושינוי ערכים.",
    keywords: ["scope", "block", "hoisting", "const", "סקופ", "בלוק"],
  },
  {
    topic: "javascript",
    level: "mid",
    question: "מהו closure, ואיפה הוא יכול לעזור בקוד אמיתי?",
    hint: "פונקציה יכולה לזכור משתנים מה-scope שבו היא נוצרה.",
    keywords: ["closure", "scope", "lexical", "private", "סקופ"],
  },
  {
    topic: "dom",
    level: "junior",
    question: "איך היית קורא ערכים מטופס ומציג הודעת שגיאה למשתמש?",
    hint: "חשוב על submit event, value, validation והצגת הודעה.",
    keywords: ["form", "submit", "value", "validation", "error", "טופס"],
  },
  {
    topic: "dom",
    level: "mid",
    question: "מהו event delegation ולמה הוא שימושי ברשימה דינמית?",
    hint: "מאזין אחד על הורה יכול לטפל באירועים של ילדים.",
    keywords: ["event", "delegation", "parent", "target", "listener", "אירוע"],
  },
  {
    topic: "async",
    level: "junior",
    question: "איך היית מבצע קריאה ל-API ומציג loading עד שהתשובה חוזרת?",
    hint: "דבר על מצב טעינה, response, error state וטיפול בכישלון.",
    keywords: ["api", "loading", "response", "error", "async", "טעינה"],
  },
  {
    topic: "async",
    level: "senior",
    question: "מה ההבדל בין Promise.all, Promise.allSettled ו-Promise.race?",
    hint: "שים לב למה קורה כשאחת הפעולות נכשלת.",
    keywords: ["promise", "all", "allSettled", "race", "reject"],
  },
  {
    topic: "react",
    level: "junior",
    question: "מה ההבדל בין props ל-state ב-React?",
    hint: "אחד מגיע מבחוץ, והשני מנוהל בתוך הקומפוננטה.",
    keywords: ["props", "state", "component", "render", "קומפוננטה"],
  },
  {
    topic: "react",
    level: "mid",
    question: "מתי תשתמש ב-useEffect, ומה חשוב להיזהר ממנו?",
    hint: "דבר על dependency array, side effects וניקוי listeners או timers.",
    keywords: ["useEffect", "dependency", "effect", "cleanup", "render"],
  },
  {
    topic: "backend",
    level: "junior",
    question: "מה ההבדל בין client ל-server בבניית אפליקציה?",
    hint: "דבר על בקשה, תגובה, שמירת נתונים והרשאות.",
    keywords: ["client", "server", "request", "response", "api", "שרת"],
  },
  {
    topic: "backend",
    level: "mid",
    question: "איך היית מתכנן endpoint שמקבל נתונים מהמשתמש ושומר אותם?",
    hint: "חשוב על validation, status codes, database ושגיאות.",
    keywords: ["endpoint", "validation", "status", "database", "error", "api"],
  },
  {
    topic: "database",
    level: "junior",
    question: "מה ההבדל בין טבלה, שורה ועמודה במסד נתונים?",
    hint: "נסה להסביר את זה דרך דוגמה של משתמשים או הזמנות.",
    keywords: ["table", "row", "column", "database", "sql", "טבלה"],
  },
  {
    topic: "database",
    level: "mid",
    question: "מהו index במסד נתונים, ומה המחיר שלו?",
    hint: "Index מאיץ קריאה, אבל מוסיף עלות בכתיבה ואחסון.",
    keywords: ["index", "query", "read", "write", "performance", "אינדקס"],
  },
  {
    topic: "python",
    level: "junior",
    question: "מה ההבדל בין list, tuple ו-dictionary ב-Python?",
    hint: "דבר על סדר, שינוי ערכים וגישה לפי key.",
    keywords: ["list", "tuple", "dict", "dictionary", "key", "mutable"],
  },
  {
    topic: "python",
    level: "mid",
    question: "איך היית מטפל בשגיאות בקוד Python שמבצע קריאה ל-API?",
    hint: "דבר על try/except, סוגי exceptions ולוגים.",
    keywords: ["try", "except", "exception", "api", "log", "error"],
  },
  {
    topic: "java",
    level: "junior",
    question: "מה ההבדל בין class ל-object ב-Java?",
    hint: "Class היא תבנית, object הוא מופע שנוצר ממנה.",
    keywords: ["class", "object", "instance", "method", "field"],
  },
  {
    topic: "java",
    level: "mid",
    question: "מה המשמעות של interface ב-Java, ומתי תשתמש בו?",
    hint: "דבר על חוזה, מימושים שונים ו-decoupling.",
    keywords: ["interface", "implementation", "contract", "polymorphism"],
  },
  {
    topic: "qa",
    level: "junior",
    question: "איך היית כותב test cases למסך התחברות?",
    hint: "כלול תרחישים חיוביים, שליליים, ולידציה ושגיאות.",
    keywords: ["test case", "positive", "negative", "validation", "bug", "login"],
  },
  {
    topic: "qa",
    level: "mid",
    question: "מה ההבדל בין smoke test, regression test ו-sanity test?",
    hint: "דבר על מטרת הבדיקה, עומק הבדיקה ומתי מריצים אותה.",
    keywords: ["smoke", "regression", "sanity", "release", "בדיקה"],
  },
  {
    topic: "automation",
    level: "junior",
    question: "מה היתרון של בדיקות אוטומטיות לעומת בדיקות ידניות?",
    hint: "דבר על חזרתיות, מהירות, יציבות ועלות תחזוקה.",
    keywords: ["automation", "manual", "repeat", "speed", "maintenance"],
  },
  {
    topic: "automation",
    level: "mid",
    question: "איך היית בונה בדיקת E2E יציבה למסך עם טעינת נתונים?",
    hint: "חשוב על selectors, wait נכון, mock data ו-flakiness.",
    keywords: ["e2e", "selector", "wait", "mock", "flaky", "data"],
  },
  {
    topic: "devops",
    level: "junior",
    question: "מה זה CI/CD, ולמה צוותים משתמשים בזה?",
    hint: "דבר על build, tests, deploy ומשוב מהיר.",
    keywords: ["ci", "cd", "build", "test", "deploy", "pipeline"],
  },
  {
    topic: "devops",
    level: "mid",
    question: "מה ההבדל בין Docker image ל-container?",
    hint: "Image היא תבנית, container הוא הרצה של אותה תבנית.",
    keywords: ["docker", "image", "container", "runtime", "environment"],
  },
  {
    topic: "data",
    level: "junior",
    question: "איך היית מסביר JOIN ב-SQL?",
    hint: "תן דוגמה של users ו-orders.",
    keywords: ["join", "sql", "table", "key", "inner", "left"],
  },
  {
    topic: "data",
    level: "mid",
    question: "קיבלת ירידה חדה במספר המשתמשים הפעילים. איך היית מתחיל לחקור?",
    hint: "דבר על השוואת תקופות, פילוח, אנומליות ומקור נתונים.",
    keywords: ["metric", "segment", "trend", "anomaly", "query", "data"],
  },
  {
    topic: "product",
    level: "junior",
    question: "איך היית מתעדף פיצ'רים כשיש יותר רעיונות מזמן פיתוח?",
    hint: "דבר על אימפקט, מאמץ, משתמשים ויעדי מוצר.",
    keywords: ["priority", "impact", "effort", "user", "goal", "feature"],
  },
  {
    topic: "product",
    level: "mid",
    question: "איך היית מודד הצלחה של פיצ'ר חדש?",
    hint: "בחר metric, baseline, ניסוי או מעקב אחרי שימוש.",
    keywords: ["metric", "success", "baseline", "experiment", "usage", "kpi"],
  },
  {
    topic: "mobile",
    level: "junior",
    question: "How would you debug a mobile screen that looks correct on one device but broken on another?",
    hint: "Talk about screen sizes, layout constraints, logs, emulator/device testing, and OS versions.",
    keywords: ["device", "layout", "responsive", "logs", "emulator", "debug"],
  },
  {
    topic: "mobile",
    level: "mid",
    question: "How would you handle offline mode in a mobile app?",
    hint: "Think about local storage, sync, conflicts, retries, and user feedback.",
    keywords: ["offline", "cache", "sync", "retry", "conflict", "storage"],
  },
  {
    topic: "security",
    level: "junior",
    question: "What is the difference between authentication and authorization?",
    hint: "One proves who the user is, the other decides what the user can access.",
    keywords: ["authentication", "authorization", "user", "permission", "access"],
  },
  {
    topic: "security",
    level: "mid",
    question: "How would you reduce the risk of exposing sensitive data in an application?",
    hint: "Mention secrets, logs, encryption, permissions, input validation, and least privilege.",
    keywords: ["secret", "encryption", "logs", "permission", "validation", "least privilege"],
  },
  {
    topic: "cloud",
    level: "junior",
    question: "What is the difference between a virtual machine, a container, and a managed cloud service?",
    hint: "Compare responsibility, control, deployment speed, and operational overhead.",
    keywords: ["vm", "container", "managed", "cloud", "deploy", "responsibility"],
  },
  {
    topic: "cloud",
    level: "mid",
    question: "How would you design a service so it can survive a traffic spike?",
    hint: "Talk about scaling, caching, queues, monitoring, and graceful degradation.",
    keywords: ["scaling", "cache", "queue", "monitoring", "load", "traffic"],
  },
  {
    topic: "network",
    level: "junior",
    question: "How would you explain DNS to a non-technical user?",
    hint: "Use the idea of translating a domain name into an address.",
    keywords: ["dns", "domain", "ip", "lookup", "address"],
  },
  {
    topic: "network",
    level: "mid",
    question: "How would you troubleshoot a service that is reachable from one network but not another?",
    hint: "Think about DNS, firewall, routing, ports, logs, and packet flow.",
    keywords: ["dns", "firewall", "routing", "port", "logs", "network"],
  },
  {
    topic: "it",
    level: "junior",
    question: "A user says their computer is slow. What steps would you take first?",
    hint: "Ask questions, check resources, startup apps, disk space, malware, and recent changes.",
    keywords: ["cpu", "memory", "disk", "startup", "malware", "changes"],
  },
  {
    topic: "support",
    level: "junior",
    question: "How would you handle an angry customer reporting a critical issue?",
    hint: "Focus on listening, clarifying impact, prioritizing, documenting, and communicating next steps.",
    keywords: ["listen", "impact", "priority", "document", "communication", "escalation"],
  },
  {
    topic: "support",
    level: "mid",
    question: "How would you decide whether to escalate a support ticket to engineering?",
    hint: "Talk about reproducibility, logs, severity, workaround, and business impact.",
    keywords: ["reproduce", "logs", "severity", "workaround", "impact", "escalation"],
  },
  {
    topic: "design",
    level: "junior",
    question: "How would you improve a confusing form in a product?",
    hint: "Think about hierarchy, labels, validation, error messages, and user testing.",
    keywords: ["form", "hierarchy", "label", "validation", "error", "user"],
  },
  {
    topic: "design",
    level: "mid",
    question: "How would you validate that a UX change actually improved the product?",
    hint: "Mention research, usability testing, metrics, qualitative feedback, and comparison.",
    keywords: ["research", "usability", "metric", "feedback", "test", "conversion"],
  },
  {
    topic: "project",
    level: "junior",
    question: "How would you track progress when a project has several teams involved?",
    hint: "Talk about milestones, owners, risks, dependencies, and communication cadence.",
    keywords: ["milestone", "owner", "risk", "dependency", "communication", "status"],
  },
  {
    topic: "project",
    level: "mid",
    question: "A release is late because of a dependency. How would you handle it?",
    hint: "Discuss options, risk, stakeholder communication, scope changes, and tradeoffs.",
    keywords: ["dependency", "risk", "stakeholder", "scope", "tradeoff", "timeline"],
  },
  {
    topic: "architecture",
    level: "mid",
    question: "How would you choose between a monolith and microservices?",
    hint: "Compare team size, deployment, complexity, scaling, ownership, and operational cost.",
    keywords: ["monolith", "microservices", "scaling", "complexity", "deployment", "ownership"],
  },
  {
    topic: "architecture",
    level: "senior",
    question: "How would you design a system that needs high availability?",
    hint: "Mention redundancy, health checks, failover, monitoring, backups, and recovery objectives.",
    keywords: ["availability", "redundancy", "failover", "monitoring", "backup", "recovery"],
  },
  {
    topic: "ml",
    level: "junior",
    question: "What is the difference between training data, validation data, and test data?",
    hint: "Each split has a different role in building and evaluating a model.",
    keywords: ["training", "validation", "test", "model", "evaluation", "data"],
  },
  {
    topic: "ml",
    level: "mid",
    question: "How would you detect that a machine learning model is getting worse in production?",
    hint: "Talk about monitoring, drift, metrics, feedback loops, and retraining.",
    keywords: ["monitoring", "drift", "metric", "feedback", "retrain", "production"],
  },
  {
    topic: "ai",
    level: "junior",
    question: "How would you explain prompt engineering to a non-technical teammate?",
    hint: "Focus on giving clear instructions, context, examples, and expected output.",
    keywords: ["prompt", "context", "instruction", "example", "output"],
  },
  {
    topic: "embedded",
    level: "junior",
    question: "What makes embedded development different from regular application development?",
    hint: "Mention hardware constraints, memory, timing, power, and debugging.",
    keywords: ["hardware", "memory", "timing", "power", "debug", "constraint"],
  },
  {
    topic: "game",
    level: "junior",
    question: "What is a game loop, and why is it important?",
    hint: "Talk about input, update, rendering, frame rate, and timing.",
    keywords: ["game loop", "input", "update", "render", "frame", "timing"],
  },
  {
    topic: "blockchain",
    level: "junior",
    question: "What is a smart contract, and what risk makes it different from regular backend code?",
    hint: "Smart contracts are deployed code that can be hard or impossible to change.",
    keywords: ["smart contract", "deploy", "immutable", "security", "transaction"],
  },
  {
    topic: "documentation",
    level: "junior",
    question: "How would you write documentation for a feature that developers and customers both use?",
    hint: "Separate audience needs, examples, setup, troubleshooting, and clear language.",
    keywords: ["audience", "example", "setup", "troubleshooting", "clarity"],
  },
];

const profileSignals = [
  { name: "React", aliases: ["react", "ריאקט"], topics: ["react", "javascript", "dom"], keywords: ["component", "state", "props"] },
  { name: "Node.js", aliases: ["node", "node.js", "backend", "בקאנד", "שרת"], topics: ["backend", "javascript", "async"], keywords: ["server", "api", "request"] },
  { name: "Python", aliases: ["python", "פייתון"], topics: ["python", "backend", "data"], keywords: ["python", "function", "exception"] },
  { name: "Java", aliases: ["java", "ג׳אווה", "ג'אווה"], topics: ["java", "backend"], keywords: ["class", "object", "interface"] },
  { name: "SQL", aliases: ["sql", "database", "db", "sqlite", "מסד"], topics: ["database", "data"], keywords: ["sql", "query", "table"] },
  { name: "QA", aliases: ["qa", "בדיקות", "טסטים"], topics: ["qa", "automation"], keywords: ["test", "bug", "case"] },
  { name: "DevOps", aliases: ["devops", "docker", "ci", "cd"], topics: ["devops"], keywords: ["pipeline", "docker", "deploy"] },
  { name: "Product", aliases: ["product", "מוצר", "פיצר", "פיצ'ר"], topics: ["product"], keywords: ["metric", "user", "priority"] },
  { name: "Cloud", aliases: ["cloud", "aws", "azure", "gcp", "kubernetes", "k8s"], topics: ["cloud", "devops"], keywords: ["cloud", "scaling", "deploy"] },
  { name: "Cyber Security", aliases: ["security", "cyber", "soc", "penetration", "owasp"], topics: ["security", "network"], keywords: ["security", "risk", "vulnerability"] },
  { name: "Mobile", aliases: ["ios", "android", "flutter", "react native", "mobile"], topics: ["mobile"], keywords: ["mobile", "device", "screen"] },
  { name: "Machine Learning", aliases: ["ml", "machine learning", "ai", "model", "llm"], topics: ["ml", "ai", "python"], keywords: ["model", "data", "training"] },
  { name: "UX/UI", aliases: ["ux", "ui", "figma", "design"], topics: ["design", "product"], keywords: ["user", "flow", "design"] },
  { name: "Support", aliases: ["support", "helpdesk", "customer success"], topics: ["support", "it"], keywords: ["ticket", "customer", "issue"] },
];

const form = document.querySelector("#setup-form");
const emptyState = document.querySelector("#empty-state");
const interview = document.querySelector("#interview");
const exportActions = document.querySelector("#export-actions");
const downloadTxt = document.querySelector("#download-txt");
const downloadMd = document.querySelector("#download-md");
const downloadCsv = document.querySelector("#download-csv");
const downloadJson = document.querySelector("#download-json");
const progressLabel = document.querySelector("#progress-label");
const progress = document.querySelector("#progress");
const timer = document.querySelector("#timer");
const questionMeta = document.querySelector("#question-meta");
const questionText = document.querySelector("#question-text");
const hintButton = document.querySelector("#hint-button");
const hintText = document.querySelector("#hint-text");
const answer = document.querySelector("#answer");
const feedback = document.querySelector("#feedback");
const submitAnswer = document.querySelector("#submit-answer");
const nextQuestion = document.querySelector("#next-question");
const restart = document.querySelector("#restart");
const historyList = document.querySelector("#history-list");
const clearHistory = document.querySelector("#clear-history");
const roleSelect = document.querySelector("#role");
const typeCards = document.querySelectorAll(".type-card");
const userProfileTextarea = document.querySelector("#user-profile");
const interviewLanguageSelect = document.querySelector("#interview-language");
const startButton = form.querySelector('button[type="submit"]');
const interfaceLanguageSelect = document.querySelector("#interface-language");

let currentInterview = null;
let currentIndex = 0;
let timerId = null;
let secondsLeft = 0;

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

const translations = {
  he: {
    brandSubtitle: "סימולטור ראיונות בינה מלאכותית",
    navDashboard: "לוח בקרה",
    navHistory: "היסטוריה",
    navAnalytics: "ניתוח",
    navPricing: "מחירון",
    navLanguage: "שפה",
    heroBadge: "תרגול ראיונות מונע בינה מלאכותית",
    heroTitlePractice: "תרגל",
    heroTitleSmarter: "יותר טוב.",
    heroTitleInterview: "ראיון",
    heroTitleBetter: "טוב יותר.",
    heroText: "קבל שאלות מותאמות אישית, משוב מסודר בסוף הראיון, ומעקב אחר ההתקדמות למשרה הטכנולוגית הבאה שלך.",
    heroStart: "התחל ראיון",
    featureRealTitle: "שאלות ראיון אמיתיות",
    featureRealText: "תרגל עם שאלות שמתאימות לתפקיד ולרקע שלך.",
    featureFeedbackTitle: "משוב בסגנון AI",
    featureFeedbackText: "קבל הכוונה מעשית רק אחרי סיום הראיון.",
    featureProgressTitle: "מעקב התקדמות",
    featureProgressText: "שמור סשנים וצפה בהיסטוריית הראיונות לאורך זמן.",
    setupTitle: "הגדרת ראיון",
    setupSubtitle: "התאם את חוויית הראיון שלך",
    formNameLabel: "שם פרטי",
    formIdLabel: "מספר ID",
    formProfileLabel: "ספר על עצמך",
    formProfilePlaceholder: "מפתח Backend עם ניסיון ב-SQL, Python ובניית מערכות מתקדמות. מתמקד בכתיבת קוד נקי, יעיל וניתן לתחזוקה.",
    formRoleLabel: "התפקיד",
    formLevelLabel: "רמה",
    formInterviewLanguageLabel: "שפת הראיון",
    formMinutesLabel: "זמן ראיון בדקות",
    formQuestionCountLabel: "מספר שאלות",
    formStartButton: "התחל ראיון",
    formNameRequired: "נא הכנס את השם שלך.",
    formProfileRequired: "נא תאר את עצמך לפני תחילת הראיון.",
    roleSectionTitle: "בחר את התפקיד שלך",
    roleSectionLink: "הצג את כל התפקידים →",
    emptyStateTitle: "המרחב שלך מוכן לראיון.",
    emptyStateText: "בחר תפקיד, הוסף רקע, ויצור ראיון מותאם אישית.",
    questionProgress: (current, total) => `שאלה ${current} מתוך ${total}`,
    finish: "סיים ראיון",
    next: "שאלה הבאה",
    strong: "תשובה חזקה",
    partial: "כיוון טוב",
    weak: "צריך לחזק",
    detected: "מושגים שזוהו",
    missing: "כדאי להוסיף",
    noneDetected: "לא זוהו עדיין",
    noneMissing: "אין, כיסית את העיקר",
    readyTitle: "מוכן להתחיל?",
    readyMessage: "ספר קצת על עצמך, בחר תפקיד, רמה, שפה ותקציב זמן.",
    timeExpired: "הזמן נגמר",
    completed: "הראיון הסתיים",
    score: (score, maxScore) => `ציון: ${score} מתוך ${maxScore}`,
    noHistory: "אין עדיין ראיונות שמורים.",
    noServer: "אין חיבור לשרת. הרץ את \`node server.js\`.",
    serverProblem: "בעיה בחיבור לשרת",
    serverProblemMessage: "צריך להריץ את הפרויקט דרך \`node server.js\` ולא לפתוח את הקובץ ישירות.",
    saveFailed: "הראיון הסתיים, אבל השמירה נכשלה",
    minutes: "דקות",
  },
  en: {
    brandSubtitle: "AI Interview Simulator",
    navDashboard: "Dashboard",
    navHistory: "History",
    navAnalytics: "Analytics",
    navPricing: "Pricing",
    navLanguage: "Language",
    heroBadge: "AI-Powered Interview Practice",
    heroTitlePractice: "Practice",
    heroTitleSmarter: "smarter.",
    heroTitleInterview: "Interview",
    heroTitleBetter: "better.",
    heroText: "Get personalized questions, structured end-of-session feedback, and progress tracking for your next tech role.",
    heroStart: "Start Interview",
    featureRealTitle: "Real Interview Questions",
    featureRealText: "Practice with role-specific questions based on your background.",
    featureFeedbackTitle: "Final AI-Style Feedback",
    featureFeedbackText: "Get practical guidance only after the interview ends.",
    featureProgressTitle: "Progress Tracking",
    featureProgressText: "Save sessions and review your interview history over time.",
    setupTitle: "Interview Setup",
    setupSubtitle: "Configure your AI interview experience",
    formNameLabel: "First Name",
    formIdLabel: "ID / Employee Number",
    formProfileLabel: "Tell us about yourself",
    formProfilePlaceholder: "A backend developer with experience in SQL, Python, and building scalable systems. Focused on clean, maintainable code.",
    formRoleLabel: "Role",
    formLevelLabel: "Level",
    formInterviewLanguageLabel: "Interview language",
    formMinutesLabel: "Interview duration (minutes)",
    formQuestionCountLabel: "Number of questions",
    formStartButton: "Start Interview",
    formNameRequired: "Please enter your first name.",
    formProfileRequired: "Please describe yourself before starting the interview.",
    roleSectionTitle: "Choose Your Role",
    roleSectionLink: "View all roles →",
    emptyStateTitle: "Your interview workspace is ready.",
    emptyStateText: "Choose a role, add your background, and generate a personalized interview session.",
    questionProgress: (current, total) => `Question ${current} of ${total}`,
    finish: "Finish interview",
    next: "Next question",
    strong: "Strong answer",
    partial: "Good direction",
    weak: "Needs work",
    detected: "Detected concepts",
    missing: "Consider adding",
    noneDetected: "None detected yet",
    noneMissing: "Nothing major, you covered the core",
    readyTitle: "Ready to start?",
    readyMessage: "Tell us about yourself, choose a role, level, language, and time budget.",
    timeExpired: "Time is up",
    completed: "Interview completed",
    score: (score, maxScore) => `Score: ${score} out of ${maxScore}`,
    noHistory: "No saved interviews yet.",
    noServer: "No server connection. Run \`node server.js\`.",
    serverProblem: "Server connection problem",
    serverProblemMessage: "Run the project with \`node server.js\` instead of opening the file directly.",
    saveFailed: "The interview ended, but saving failed",
    minutes: "minutes",
  },
};

const uiText = {
  he: {
    ...translations.he,
  },
  en: {
    ...translations.en,
  },
};

const englishQuestionTemplates = {
  javascript: {
    question: "Explain one important JavaScript concept for this role, and give a practical example.",
    hint: "Mention the problem it solves, how you would use it, and one common mistake.",
  },
  dom: {
    question: "How would you build and debug an interactive browser screen for this role?",
    hint: "Talk about events, state, validation, rendering, and user feedback.",
  },
  async: {
    question: "How would you handle an asynchronous operation that can fail?",
    hint: "Mention loading state, error handling, retries, and what the user sees.",
  },
  react: {
    question: "How would you design a React component that is reusable and easy to maintain?",
    hint: "Talk about props, state, effects, rendering, and component boundaries.",
  },
  backend: {
    question: "How would you design an API endpoint for this role?",
    hint: "Mention validation, status codes, data storage, errors, and security.",
  },
  database: {
    question: "How would you design and query data for this role?",
    hint: "Talk about tables, relationships, indexes, query performance, and data quality.",
  },
  qa: {
    question: "How would you test a critical feature before release?",
    hint: "Mention positive cases, negative cases, regression risk, and bug reporting.",
  },
  product: {
    question: "How would you decide what to build first and measure whether it worked?",
    hint: "Talk about users, impact, effort, metrics, and tradeoffs.",
  },
};

function localizeQuestion(question, language) {
  if (language !== "en") return question;
  if (/^[\x00-\x7F\s.,?!'"():/-]+$/.test(question.question)) return question;

  const fallback = englishQuestionTemplates[question.topic] || {
    question: "Tell me how you would approach a realistic challenge in this role.",
    hint: "Explain the context, options, decision, tradeoffs, and how you would verify success.",
  };

  return {
    ...question,
    question: fallback.question,
    hint: fallback.hint,
  };
}

function analyzeProfile(profileText) {
  const normalized = profileText.toLowerCase();
  const skills = profileSignals.filter((signal) => signal.aliases.some((alias) => normalized.includes(alias)));
  const experience = getExperienceLevel(normalized);
  const project = getProjectType(normalized);
  const skillsText = skills.length ? skills.map((skill) => skill.name).join(", ") : "כללי";

  return {
    raw: profileText,
    skills,
    experience,
    project,
    summary: `${experience} | ${project} | ${skillsText}`,
  };
}

function getExperienceLevel(text) {
  if (text.includes("senior") || text.includes("סיניור") || text.includes("מוביל")) return "senior";
  if (text.includes("mid") || text.includes("שנה") || text.includes("שנתיים") || text.includes("מנוסה")) return "mid";
  return "junior";
}

function getProjectType(text) {
  if (text.includes("portfolio") || text.includes("פורטפוליו")) return "פורטפוליו";
  if (text.includes("ecommerce") || text.includes("shop") || text.includes("חנות")) return "חנות אונליין";
  if (text.includes("todo") || text.includes("טודו") || text.includes("משימות")) return "אפליקציית משימות";
  if (text.includes("dashboard") || text.includes("דשבורד")) return "דשבורד";
  if (text.includes("api")) return "API";
  return "הפרויקט שלך";
}

function getQuestions(role, level, count, profile, language) {
  const roleConfig = roleConfigs[role] || roleConfigs["general-tech"];
  const personalQuestions = buildPersonalQuestions(roleConfig, level, profile, language);
  const exactMatches = questionBank.filter((item) => roleConfig.topics.includes(item.topic));

  return [...personalQuestions, ...shuffle(exactMatches)]
    .slice(0, count)
    .map((question) => localizeQuestion(question, language));
}

function buildPersonalQuestions(roleConfig, level, profile, language) {
  const relevantSkills = profile.skills.filter((skill) => skill.topics.some((topic) => roleConfig.topics.includes(topic)));

  if (!relevantSkills.length && !profile.raw.trim()) return [];

  const skills = relevantSkills.length ? relevantSkills : [{ name: roleConfig.label, keywords: ["בעיה", "פתרון", "שיפור"] }];

  if (language === "en") {
    return skills.flatMap((skill) => [
      {
        topic: "personal",
        level,
        question: `For a ${roleConfig.label} role: based on your background with ${skill.name}, describe one professional decision you would make in ${profile.project}.`,
        hint: "Explain the problem, the options, your decision, and the tradeoff.",
        keywords: [...skill.keywords, "problem", "solution", "improvement", "tradeoff"],
      },
      {
        topic: "personal",
        level,
        question: `If something related to ${skill.name} failed in production, how would you diagnose it step by step?`,
        hint: "Talk about tests, logs, isolating the source, communication, and documentation.",
        keywords: [...skill.keywords, "debug", "log", "test", "error", "communication"],
      },
    ]);
  }

  return skills.flatMap((skill) => [
    {
      topic: "personal",
      level,
      question: `לתפקיד ${roleConfig.label}: לפי מה שסיפרת על ${skill.name}, תאר החלטה מקצועית אחת שהיית מקבל ב-${profile.project}.`,
      hint: "נסה להסביר את הבעיה, האפשרויות, ההחלטה והמחיר שלה.",
      keywords: [...skill.keywords, "בעיה", "פתרון", "שיפור", "tradeoff"],
    },
    {
      topic: "personal",
      level,
      question: `אם משהו שקשור ל-${skill.name} נכשל בזמן אמת, איך היית מאבחן את הבעיה צעד אחרי צעד?`,
      hint: "דבר על בדיקות, לוגים, בידוד מקור הבעיה ותיעוד.",
      keywords: [...skill.keywords, "debug", "log", "test", "error", "בדיקה"],
    },
  ]);
}

async function apiRequest(path, options = {}) {
  const response = await fetch(path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Server error" }));
    throw new Error(error.error || "Server error");
  }

  return response.json();
}

async function startInterview(event) {
  event.preventDefault();

  const formData = new FormData(form);
  const candidateName = String(formData.get("candidate-name") || "").trim();
  const candidateId = String(formData.get("candidate-id") || "").trim();
  const userProfile = String(formData.get("user-profile") || "").trim();
  const role = String(formData.get("role") || "general-tech");
  const language = String(formData.get("interview-language") || "he");
  const level = String(formData.get("level") || "junior");
  const count = Math.max(Number(formData.get("question-count")) || 6, 1);
  const interviewMinutes = clamp(Number(formData.get("interview-minutes")) || 10, 3, 60);

  if (!candidateName) {
    const text = uiText[language] || uiText.he;
    showEmptyMessage(text.readyTitle, text.formNameRequired || "Please enter your first name.");
    return;
  }

  if (!userProfile) {
    const text = uiText[language] || uiText.he;
    showEmptyMessage(text.readyTitle, text.formProfileRequired || "Please describe yourself before starting the interview.");
    return;
  }

  const profile = analyzeProfile(userProfile);
  const roleLabel = roleConfigs[role]?.label || roleConfigs["general-tech"].label;
  const originalStartText = startButton.textContent;

  startButton.disabled = true;
  startButton.textContent = language === "he" ? "GPT מכין את הראיון..." : "GPT is preparing the interview...";

  try {
    let questions;
    let aiModel;

    try {
      const generatedInterview = await apiRequest("/api/ai/questions", {
        method: "POST",
        body: JSON.stringify({
          role,
          roleLabel,
          level,
          language,
          questionCount: count,
          userProfile,
        }),
      });
      questions = generatedInterview.questions;
      aiModel = generatedInterview.model;
    } catch (error) {
      console.warn("GPT question generation is unavailable; using local questions.", error);
      questions = getQuestions(role, level, count, profile, language);
      aiModel = "local-fallback";
    }

    const savedInterview = await apiRequest("/api/interviews/start", {
      method: "POST",
      body: JSON.stringify({
        candidateName,
        candidateId: candidateId || candidateName,
        role,
        topic: role,
        interviewLanguage: language,
        level,
        questionCount: questions.length,
        interviewMinutes,
        userProfile,
        profileSummary: `${roleLabel} | ${profile.summary}`,
      }),
    });

    currentInterview = {
      id: savedInterview.id,
      candidateName,
      candidateId,
      role,
      roleLabel,
      language,
      level,
      interviewMinutes,
      profile,
      questions,
      aiModel,
      answers: [],
      score: 0,
    };
    currentIndex = 0;
    secondsLeft = interviewMinutes * 60;

    emptyState.classList.add("hidden");
    interview.classList.remove("hidden");
    showQuestion();
    startInterviewTimer();
    renderHistory();

    const interviewArea = document.querySelector("#interview-area");
    if (interviewArea) {
      interviewArea.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  } catch (error) {
    showEmptyMessage(uiText[language].serverProblem, error.message || uiText[language].serverProblemMessage);
  } finally {
    startButton.disabled = false;
    startButton.textContent = originalStartText;
  }
}

function showQuestion() {
  const question = currentInterview.questions[currentIndex];
  const total = currentInterview.questions.length;
  const text = uiText[currentInterview.language] || uiText.he;
  const direction = currentInterview.language === "he" ? "rtl" : "ltr";

  interview.dir = direction;
  answer.dir = direction;
  progressLabel.textContent = text.questionProgress(currentIndex + 1, total);
  progress.value = currentIndex + 1;
  progress.max = total;
  questionMeta.textContent = `${currentInterview.roleLabel} | ${currentInterview.level} | GPT: ${currentInterview.aiModel}`;
  questionText.textContent = question.question;
  hintText.textContent = question.hint;
  hintText.classList.add("hidden");
  answer.value = "";
  feedback.className = "feedback hidden";
  feedback.textContent = "";
  submitAnswer.disabled = false;
  nextQuestion.disabled = true;
  submitAnswer.textContent = text.saveAnswer;
  hintButton.textContent = text.showHint;
  restart.textContent = text.reset;
  nextQuestion.textContent = currentIndex === total - 1 ? text.finish : text.next;
  renderTimer();
}

function startInterviewTimer() {
  clearInterval(timerId);
  renderTimer();

  timerId = setInterval(() => {
    secondsLeft -= 1;
    renderTimer();

    if (secondsLeft <= 0) {
      clearInterval(timerId);
      if (!currentInterview.answers[currentIndex]) evaluateAnswer();
      finishInterview(true);
    }
  }, 1000);
}

function renderTimer() {
  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");
  timer.textContent = `${minutes}:${seconds}`;
}

function evaluateAnswer() {
  if (currentInterview.answers[currentIndex]) return;

  const question = currentInterview.questions[currentIndex];
  const userAnswer = answer.value.trim().toLowerCase();
  const matchedKeywords = question.keywords.filter((keyword) => userAnswer.includes(keyword.toLowerCase()));
  const score = getQuestionScore(userAnswer, matchedKeywords.length, question.keywords.length);

  currentInterview.score += score;
  currentInterview.answers[currentIndex] = {
    question: question.question,
    answer: answer.value.trim(),
    score,
    matchedKeywords,
  };

  renderFeedback(score, matchedKeywords, question.keywords);
  submitAnswer.disabled = true;
  nextQuestion.disabled = false;
}

function getQuestionScore(userAnswer, matches, keywordCount) {
  if (userAnswer.length < 30) return 0;
  const keywordRatio = matches / keywordCount;
  if (keywordRatio >= 0.6) return 2;
  if (keywordRatio >= 0.3) return 1;
  return 0;
}

function renderFeedback(score, matchedKeywords, allKeywords) {
  const text = uiText[currentInterview?.language || "he"] || uiText.he;
  const missingKeywords = allKeywords.filter((keyword) => !matchedKeywords.includes(keyword));
  const levelClass = score === 2 ? "good" : score === 1 ? "partial" : "needs-work";
  const title = score === 2 ? text.strong : score === 1 ? text.partial : text.weak;

  feedback.className = `feedback ${levelClass}`;
  feedback.innerHTML = `
    <strong>${title}</strong><br>
    ${text.detected}: ${matchedKeywords.length ? matchedKeywords.join(", ") : text.noneDetected}.<br>
    ${text.missing}: ${missingKeywords.length ? missingKeywords.join(", ") : text.noneMissing}.
  `;
}

function goToNextQuestion() {
  if (currentIndex < currentInterview.questions.length - 1) {
    currentIndex += 1;
    showQuestion();
    return;
  }

  finishInterview(false);
}

async function finishInterview(timeExpired) {
  clearInterval(timerId);
  const text = uiText[currentInterview.language] || uiText.he;

  try {
    const evaluation = await apiRequest("/api/ai/evaluate", {
      method: "POST",
      body: JSON.stringify({
        role: currentInterview.role,
        level: currentInterview.level,
        language: currentInterview.language,
        answers: currentInterview.questions.map((question, index) => ({
          question: question.question,
          answer: currentInterview.answers[index]?.answer || "",
          keywords: question.keywords,
        })),
      }),
    });
    const evaluationByIndex = new Map(evaluation.answers.map((item) => [item.index, item]));

    currentInterview.answers = currentInterview.questions.map((question, index) => {
      const existing = currentInterview.answers[index] || {
        question: question.question,
        answer: "",
      };
      const evaluated = evaluationByIndex.get(index);

      return evaluated ? { ...existing, ...evaluated, question: question.question } : existing;
    });
    currentInterview.score = currentInterview.answers.reduce((total, item) => total + (item.score || 0), 0);
    currentInterview.overallFeedback = evaluation.overallFeedback;
  } catch (error) {
    console.error("GPT evaluation failed; using the local score.", error);
  }

  const maxScore = currentInterview.questions.length * 2;

  try {
    await apiRequest(`/api/interviews/${currentInterview.id}/finish`, {
      method: "PATCH",
      body: JSON.stringify({
        score: currentInterview.score,
        maxScore,
        answers: currentInterview.answers,
      }),
    });
  } catch (error) {
    showEmptyMessage(text.saveFailed, error.message);
    return;
  }

  renderHistory();
  interview.classList.add("hidden");
  emptyState.classList.remove("hidden");
  showEmptyMessage(timeExpired ? text.timeExpired : text.completed, text.score(currentInterview.score, maxScore));
}

async function renderHistory() {
  try {
    const history = await apiRequest("/api/interviews");

    if (!history.length) {
      historyList.innerHTML = "<li>אין עדיין ראיונות שמורים.</li>";
      return;
    }

    historyList.innerHTML = history
      .map(
        (item) => `
          <li>
            <span>${formatDate(item.startedAt)} | ${item.role || item.topic} | ${item.level} | ${item.interviewMinutes || "?"} דקות | ${item.status}</span>
            <span class="history-score">${item.score}/${item.maxScore}</span>
          </li>
        `,
      )
      .join("");
  } catch {
    historyList.innerHTML = "<li>אין חיבור לשרת. הרץ את `node server.js`.</li>";
  }
}

function formatDate(value) {
  return new Date(value).toLocaleString("he-IL");
}

function resetInterview() {
  clearInterval(timerId);
  currentInterview = null;
  currentIndex = 0;
  secondsLeft = 0;
  interview.classList.add("hidden");
  emptyState.classList.remove("hidden");
  const language = getInterfaceLanguage();
  const text = uiText[language] || uiText.he;
  showEmptyMessage(text.readyTitle, text.readyMessage);
}

function getInterfaceLanguage() {
  if (!interfaceLanguageSelect) return "he";
  return interfaceLanguageSelect.value === "en" ? "en" : "he";
}

function getInterviewLanguage() {
  if (!interviewLanguageSelect) return "he";
  return interviewLanguageSelect.value === "en" ? "en" : "he";
}

function applyInterviewLanguage(language = getInterviewLanguage()) {
  if (!userProfileTextarea) return;
  userProfileTextarea.dir = language === "en" ? "ltr" : "rtl";
  const placeholder = uiText[language]?.formProfilePlaceholder || uiText.he.formProfilePlaceholder;
  userProfileTextarea.setAttribute("placeholder", placeholder);
}

function applyInterfaceLanguage(language = getInterfaceLanguage()) {
  const text = uiText[language] || uiText.he;
  const elements = Array.from(document.querySelectorAll("[data-i18n]"));

  elements.forEach((element) => {
    const key = element.getAttribute("data-i18n");
    const value = text[key];
    if (typeof value === "function") {
      return;
    }
    if (value) {
      element.textContent = value;
    }
  });

  const placeholders = Array.from(document.querySelectorAll("[data-i18n-placeholder]"));
  placeholders.forEach((element) => {
    const key = element.getAttribute("data-i18n-placeholder");
    const value = text[key];
    if (value) {
      element.setAttribute("placeholder", value);
    }
  });

  document.documentElement.lang = language === "en" ? "en" : "he";
  document.documentElement.dir = language === "en" ? "ltr" : "rtl";
  form.dir = language === "en" ? "ltr" : "rtl";
  if (emptyState && emptyState.classList.contains("hidden")) {
    return;
  }
  if (!currentInterview) {
    const title = emptyState.querySelector("h2");
    const paragraph = emptyState.querySelector("p");
    if (title && paragraph) {
      title.textContent = text.readyTitle;
      paragraph.textContent = text.readyMessage;
    }
  }
}

function showEmptyMessage(title, message) {
  emptyState.innerHTML = `
    <h2>${title}</h2>
    <p>${message}</p>
  `;
}

const cleanHebrewText = {
  questionProgress: (current, total) => `שאלה ${current} מתוך ${total}`,
  finish: "סיים ראיון",
  next: "שאלה הבאה",
  strong: "תשובה חזקה",
  partial: "כיוון טוב",
  weak: "צריך לחזק",
  detected: "מושגים שזוהו",
  missing: "כדאי להוסיף",
  noneDetected: "לא זוהו עדיין",
  noneMissing: "אין, כיסית את העיקר",
  readyTitle: "מוכן להתחיל?",
  readyMessage: "ספר קצת על עצמך, בחר תפקיד, רמה, שפה ותקציב זמן.",
  timeExpired: "הזמן נגמר",
  completed: "הראיון הסתיים",
  score: (score, maxScore) => `ציון: ${score} מתוך ${maxScore}`,
  noHistory: "אין עדיין ראיונות שמורים.",
  noServer: "אין חיבור לשרת. הרץ את `node server.js`.",
  serverProblem: "בעיה בחיבור לשרת",
  serverProblemMessage: "צריך להריץ את הפרויקט דרך `node server.js` ולא לפתוח את הקובץ ישירות.",
  saveFailed: "הראיון הסתיים, אבל השמירה נכשלה",
  minutes: "דקות",
};

Object.assign(uiText.he, cleanHebrewText, {
  saveAnswer: "שמור תשובה",
  showHint: "הצג רמז",
  reset: "איפוס",
});
Object.assign(uiText.en, {
  saveAnswer: "Save answer",
  showHint: "Show hint",
  reset: "Reset",
});

const cleanHebrewQuestions = {
  javascript: {
    question: "הסבר מושג JavaScript חשוב לתפקיד הזה ותן דוגמה מעשית.",
    hint: "דבר על הבעיה שהמושג פותר, איך משתמשים בו, וטעות נפוצה שכדאי להימנע ממנה.",
    keywords: ["javascript", "scope", "function", "array", "בעיה", "דוגמה"],
  },
  dom: {
    question: "איך היית בונה ומדבג מסך אינטראקטיבי בדפדפן?",
    hint: "התייחס לאירועים, state, ולידציה, עדכון UI ופידבק למשתמש.",
    keywords: ["dom", "event", "validation", "ui", "אירוע", "טופס"],
  },
  async: {
    question: "איך היית מטפל בפעולה אסינכרונית שעלולה להיכשל?",
    hint: "דבר על מצב טעינה, טיפול בשגיאות, retries ומה המשתמש רואה.",
    keywords: ["async", "api", "loading", "error", "שגיאה", "טעינה"],
  },
  react: {
    question: "איך היית מתכנן קומפוננטת React נוחה לשימוש חוזר?",
    hint: "דבר על props, state, effects, render וחלוקת אחריות בין קומפוננטות.",
    keywords: ["react", "props", "state", "component", "קומפוננטה"],
  },
  backend: {
    question: "איך היית מתכנן API endpoint שמקבל נתונים ושומר אותם?",
    hint: "התייחס ל-validation, status codes, מסד נתונים, שגיאות ואבטחה.",
    keywords: ["api", "endpoint", "validation", "database", "security"],
  },
  database: {
    question: "איך היית מתכנן שמירת נתונים ושליפה יעילה עבור התפקיד הזה?",
    hint: "דבר על טבלאות, קשרים, אינדקסים, ביצועים ואיכות נתונים.",
    keywords: ["database", "sql", "table", "index", "query", "טבלה"],
  },
  python: {
    question: "הסבר מבנה נתונים חשוב ב-Python ומתי תשתמש בו.",
    hint: "אפשר לדבר על list, tuple, dictionary, mutability וגישה לפי key.",
    keywords: ["python", "list", "tuple", "dict", "key"],
  },
  java: {
    question: "מה ההבדל בין class ל-object, ואיך זה בא לידי ביטוי בקוד?",
    hint: "דבר על תבנית, מופע, מתודות ושדות.",
    keywords: ["java", "class", "object", "method", "instance"],
  },
  qa: {
    question: "איך היית בודק פיצ'ר קריטי לפני עלייה לפרודקשן?",
    hint: "כלול תרחישים חיוביים, שליליים, regression risk ודיווח באגים.",
    keywords: ["qa", "test", "bug", "regression", "בדיקה"],
  },
  automation: {
    question: "איך היית בונה בדיקה אוטומטית יציבה למסך עם טעינת נתונים?",
    hint: "התייחס ל-selectors, המתנה נכונה, mock data ו-flakiness.",
    keywords: ["automation", "e2e", "selector", "mock", "flaky"],
  },
  devops: {
    question: "מה זה CI/CD ולמה צוותים משתמשים בזה?",
    hint: "דבר על build, tests, deploy ומשוב מהיר.",
    keywords: ["ci", "cd", "build", "test", "deploy"],
  },
  data: {
    question: "איך היית מתחיל לחקור שינוי חריג במדד עסקי חשוב?",
    hint: "דבר על השוואת תקופות, פילוח, אנומליות ומקור הנתונים.",
    keywords: ["data", "metric", "segment", "query", "trend"],
  },
  product: {
    question: "איך היית מתעדף פיצ'רים כשיש יותר רעיונות מזמן פיתוח?",
    hint: "דבר על אימפקט, מאמץ, משתמשים, מטרות מוצר ו-tradeoffs.",
    keywords: ["product", "priority", "impact", "user", "feature"],
  },
  personal: {
    question: "לפי מה שסיפרת על עצמך, תאר החלטה מקצועית אחת שהיית מקבל בפרויקט שלך.",
    hint: "נסה להסביר את הבעיה, האפשרויות, ההחלטה והמחיר שלה.",
    keywords: ["בעיה", "פתרון", "שיפור", "tradeoff"],
  },
};

questionBank.forEach((question) => {
  const clean = cleanHebrewQuestions[question.topic];
  if (!clean) return;
  question.question = clean.question;
  question.hint = clean.hint;
  question.keywords = Array.from(new Set([...question.keywords, ...clean.keywords]));
});

function getProjectType(text) {
  if (text.includes("portfolio") || text.includes("פורטפוליו")) return "פורטפוליו";
  if (text.includes("ecommerce") || text.includes("shop") || text.includes("חנות")) return "חנות אונליין";
  if (text.includes("todo") || text.includes("טודו") || text.includes("משימות")) return "אפליקציית משימות";
  if (text.includes("dashboard") || text.includes("דשבורד")) return "דשבורד";
  if (text.includes("api")) return "API";
  return "הפרויקט שלך";
}

function getExperienceLevel(text) {
  if (text.includes("senior") || text.includes("סיניור") || text.includes("מוביל")) return "senior";
  if (text.includes("mid") || text.includes("שנה") || text.includes("שנתיים") || text.includes("מנוסה")) return "mid";
  return "junior";
}

function buildPersonalQuestions(roleConfig, level, profile, language) {
  const relevantSkills = profile.skills.filter((skill) => skill.topics.some((topic) => roleConfig.topics.includes(topic)));

  if (!relevantSkills.length && !profile.raw.trim()) return [];

  const skills = relevantSkills.length ? relevantSkills : [{ name: roleConfig.label, keywords: ["problem", "solution", "improvement"] }];

  if (language === "en") {
    return skills.flatMap((skill) => [
      {
        topic: "personal",
        level,
        question: `For a ${roleConfig.label} role: based on your background with ${skill.name}, describe one professional decision you would make in ${profile.project}.`,
        hint: "Explain the problem, the options, your decision, and the tradeoff.",
        keywords: [...skill.keywords, "problem", "solution", "improvement", "tradeoff"],
      },
      {
        topic: "personal",
        level,
        question: `If something related to ${skill.name} failed in production, how would you diagnose it step by step?`,
        hint: "Talk about tests, logs, isolating the source, communication, and documentation.",
        keywords: [...skill.keywords, "debug", "log", "test", "error", "communication"],
      },
    ]);
  }

  return skills.flatMap((skill) => [
    {
      topic: "personal",
      level,
      question: `לתפקיד ${roleConfig.label}: לפי מה שסיפרת על ${skill.name}, תאר החלטה מקצועית אחת שהיית מקבל ב-${profile.project}.`,
      hint: "נסה להסביר את הבעיה, האפשרויות, ההחלטה והמחיר שלה.",
      keywords: [...skill.keywords, "בעיה", "פתרון", "שיפור", "tradeoff"],
    },
    {
      topic: "personal",
      level,
      question: `אם משהו שקשור ל-${skill.name} נכשל בזמן אמת, איך היית מאבחן את הבעיה צעד אחרי צעד?`,
      hint: "דבר על בדיקות, לוגים, בידוד מקור הבעיה ותיעוד.",
      keywords: [...skill.keywords, "debug", "log", "test", "error", "בדיקה"],
    },
  ]);
}

async function renderHistory() {
  const language = getInterfaceLanguage();
  const text = uiText[language] || uiText.he;

  try {
    const history = await apiRequest("/api/interviews");

    if (!history.length) {
      historyList.innerHTML = `<li>${text.noHistory}</li>`;
      return;
    }

    historyList.innerHTML = history
      .map(
        (item) => {
          const improvementText = item.improvementScore !== null && item.improvementScore !== undefined
            ? (item.improvementScore >= 0 ? '+' : '') + item.improvementScore
            : '—';
          return `
            <li>
              <div class="history-item-header">
                <span class="history-candidate">${item.candidateName || 'Unknown'}</span>
                <span class="history-date">${formatDate(item.startedAt)}</span>
              </div>
              <span class="history-details">${item.role || item.topic} | ${item.level} | ${item.interviewLanguage || "he"} | ${item.interviewMinutes || "?"} ${text.minutes} | ${item.status}</span>
              <div class="history-score-section">
                <span class="history-score">${item.score}/${item.maxScore}</span>
                <span class="history-improvement" data-improvement="${item.improvementScore >= 0 ? 'positive' : item.improvementScore < 0 ? 'negative' : 'neutral'}">${improvementText}</span>
              </div>
            </li>
          `;
        },
      )
      .join("");
  } catch {
    historyList.innerHTML = `<li>${text.noServer}</li>`;
  }
}

function resetInterview() {
  const language = getInterfaceLanguage();
  const text = uiText[language] || uiText.he;

  clearInterval(timerId);
  currentInterview = null;
  currentIndex = 0;
  secondsLeft = 0;
  interview.classList.add("hidden");
  emptyState.classList.remove("hidden");
  emptyState.classList.remove("has-summary");
  showEmptyMessage(text.readyTitle, text.readyMessage);
}

function getSuggestedAnswer(question, language) {
  const topic = question.topic || "personal";

  const englishGuides = {
    personal: "A strong answer should start with the context, describe the real problem, compare 2 options, explain your decision, and finish with the tradeoff or lesson learned.",
    backend: "A strong answer should mention request validation, clear API contract, status codes, database persistence, error handling, security, and how you would test the endpoint.",
    database: "A strong answer should explain the data model, relationships, indexes, query patterns, data quality, and the tradeoff between read performance and write cost.",
    async: "A strong answer should include loading state, success path, error state, retry or fallback behavior, and what the user sees while the operation is running.",
    javascript: "A strong answer should define the concept, explain why it matters, show a short practical example, and mention one common mistake.",
    dom: "A strong answer should cover event handling, validation, state updates, accessibility, and how you would debug UI behavior.",
    react: "A strong answer should discuss component responsibility, props, state, effects, rendering, and how to keep the component reusable.",
    qa: "A strong answer should include positive cases, negative cases, edge cases, regression risk, clear bug reporting, and priority.",
    devops: "A strong answer should mention pipeline stages, automation, testing, deployment safety, rollback strategy, logs, and monitoring.",
    product: "A strong answer should mention user pain, business goal, impact, effort, success metric, and prioritization tradeoff.",
  };

  const hebrewGuides = {
    personal: "תשובה חזקה מתחילה בהקשר, מתארת את הבעיה, מציגה 2 אפשרויות, מסבירה את ההחלטה, ומסיימת במחיר או בשיעור שלמדת.",
    backend: "תשובה חזקה צריכה לכלול validation, חוזה API ברור, status codes, שמירה במסד נתונים, טיפול בשגיאות, אבטחה ובדיקות.",
    database: "תשובה חזקה צריכה להסביר מודל נתונים, קשרים, אינדקסים, דפוסי שאילתות, איכות נתונים והמחיר בין קריאה מהירה לכתיבה יקרה.",
    async: "תשובה חזקה כוללת מצב טעינה, הצלחה, שגיאה, retry או fallback, ומה המשתמש רואה בזמן הפעולה.",
    javascript: "תשובה חזקה מגדירה את המושג, מסבירה למה הוא חשוב, נותנת דוגמה קצרה ומזכירה טעות נפוצה.",
    dom: "תשובה חזקה מתייחסת לאירועים, ולידציה, עדכון state או UI, נגישות ואיך היית מדבג התנהגות במסך.",
    react: "תשובה חזקה מדברת על אחריות קומפוננטה, props, state, effects, render ושימוש חוזר.",
    qa: "תשובה חזקה כוללת תרחישים חיוביים, שליליים, edge cases, סיכון regression, דיווח באג ברור ותיעדוף.",
    devops: "תשובה חזקה מזכירה שלבי pipeline, אוטומציה, בדיקות, deployment בטוח, rollback, לוגים ומוניטורינג.",
    product: "תשובה חזקה מזכירה כאב משתמש, יעד עסקי, אימפקט, מאמץ, מדד הצלחה ו-tradeoff בתיעדוף.",
  };

  const guides = language === "he" ? hebrewGuides : englishGuides;
  return guides[topic] || guides.personal;
}

function evaluateAnswer() {
  if (currentInterview.answers[currentIndex]) return;

  const question = currentInterview.questions[currentIndex];
  const userAnswer = answer.value.trim().toLowerCase();
  const matchedKeywords = question.keywords.filter((keyword) => userAnswer.includes(keyword.toLowerCase()));
  const missingKeywords = question.keywords.filter((keyword) => !matchedKeywords.includes(keyword));
  const score = getQuestionScore(userAnswer, matchedKeywords.length, question.keywords.length);

  currentInterview.score += score;
  currentInterview.answers[currentIndex] = {
    question: question.question,
    answer: answer.value.trim(),
    score,
    matchedKeywords,
    missingKeywords,
    suggestedAnswer: getSuggestedAnswer(question, currentInterview.language),
  };

  feedback.className = "feedback hidden";
  feedback.textContent = "";
  submitAnswer.disabled = true;
  nextQuestion.disabled = false;
}

function renderFinalSummary(timeExpired, maxScore) {
  emptyState.classList.add("has-summary");
  if (exportActions) {
    exportActions.classList.remove("hidden");
  }
  const language = currentInterview.language;
  const isHebrew = language === "he";
  const title = timeExpired ? (isHebrew ? "הזמן נגמר" : "Time is up") : (isHebrew ? "הראיון הסתיים" : "Interview completed");
  const subtitle = isHebrew
    ? `ציון: ${currentInterview.score} מתוך ${maxScore}. הפידבק מופיע כאן בסוף כדי שתוכל לתרגל בלי הפרעות באמצע.`
    : `Score: ${currentInterview.score} out of ${maxScore}. Feedback appears at the end so you can practice without interruptions.`;
  const answerTitle = isHebrew ? "איך נכון לענות" : "How to answer well";
  const detectedTitle = isHebrew ? "מושגים שהזכרת" : "Concepts you mentioned";
  const missingTitle = isHebrew ? "מה כדאי להוסיף" : "What to add";
  const emptyValue = isHebrew ? "לא זוהה" : "Not detected";
  const feedbackTitle = isHebrew ? "הערות כלליות" : "Overall Feedback";

  const cards = currentInterview.questions
    .map((question, index) => {
      const result = currentInterview.answers[index] || {
        score: 0,
        matchedKeywords: [],
        missingKeywords: question.keywords,
        suggestedAnswer: getSuggestedAnswer(question, language),
        feedback: ""
      };

      const feedbackHtml = result.feedback
        ? `<div class="answer-feedback"><strong>${isHebrew ? "הערה" : "Note"}:</strong> <p>${escapeHtml(result.feedback)}</p></div>`
        : "";

      return `
        <article class="summary-card">
          <div class="summary-card-header">
            <span>${isHebrew ? "שאלה" : "Question"} ${index + 1}</span>
            <strong>${result.score}/2</strong>
          </div>
          <h3>${escapeHtml(question.question)}</h3>
          <p><strong>${detectedTitle}:</strong> ${result.matchedKeywords.length ? escapeHtml(result.matchedKeywords.join(", ")) : emptyValue}</p>
          <p><strong>${missingTitle}:</strong> ${result.missingKeywords.length ? escapeHtml(result.missingKeywords.slice(0, 8).join(", ")) : (isHebrew ? "כיסית את העיקר" : "You covered the core")}</p>
          <div class="answer-guide">
            <strong>${answerTitle}</strong>
            <p>${escapeHtml(result.suggestedAnswer)}</p>
          </div>
          ${feedbackHtml}
        </article>
      `;
    })
    .join("");

  const overallFeedbackHtml = currentInterview.overallFeedback
    ? `<section class="overall-feedback" dir="${isHebrew ? "rtl" : "ltr"}">
        <h3>${feedbackTitle}</h3>
        <p>${escapeHtml(currentInterview.overallFeedback)}</p>
      </section>`
    : "";

  emptyState.innerHTML = `
    <section class="final-summary" dir="${isHebrew ? "rtl" : "ltr"}">
      <div class="final-summary-header">
        <p class="eyebrow">${isHebrew ? "סיכום ראיון" : "Interview Summary"}</p>
        <h2>${title}</h2>
        <p>${subtitle}</p>
      </div>
      ${overallFeedbackHtml}
      <div class="summary-grid">${cards}</div>
    </section>
  `;
}

function hideExportActions() {
  if (exportActions) {
    exportActions.classList.add("hidden");
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildInterviewExportData() {
  const answers = currentInterview.questions.map((question, index) => {
    const result = currentInterview.answers[index] || {};
    return {
      questionIndex: index + 1,
      question: question.question,
      answer: result.answer || "",
      score: result.score ?? 0,
      matchedKeywords: result.matchedKeywords || [],
      missingKeywords: result.missingKeywords || [],
      suggestedAnswer: result.suggestedAnswer || getSuggestedAnswer(question, currentInterview.language),
      feedback: result.feedback || "",
    };
  });

  return {
    candidateName: currentInterview.candidateName || "",
    candidateId: currentInterview.candidateId || "",
    role: currentInterview.roleLabel,
    level: currentInterview.level,
    language: currentInterview.language,
    interviewMinutes: currentInterview.interviewMinutes,
    score: currentInterview.score,
    maxScore: currentInterview.questions.length * 2,
    overallFeedback: currentInterview.overallFeedback || "",
    questions: answers,
  };
}

function escapeCsvCell(value) {
  const text = String(value ?? "").replace(/"/g, '""');
  return `"${text}"`;
}

function buildInterviewExportContent(format) {
  const data = buildInterviewExportData();

  if (format === "json") {
    return JSON.stringify(data, null, 2);
  }

  if (format === "csv") {
    const header = [
      "Question #",
      "Question",
      "Answer",
      "Score",
      "Matched keywords",
      "Missing keywords",
      "Suggested answer",
      "Feedback",
    ];
    const rows = data.questions.map((item) => [
      item.questionIndex,
      item.question,
      item.answer,
      item.score,
      item.matchedKeywords.join("; "),
      item.missingKeywords.join("; "),
      item.suggestedAnswer,
      item.feedback,
    ]);
    return [header, ...rows].map((row) => row.map(escapeCsvCell).join(",")).join("\r\n");
  }

  const lines = [];
  lines.push(`${currentInterview.roleLabel} - ${currentInterview.level}`);
  lines.push(`Candidate: ${data.candidateName || currentInterview.candidateId || "Unknown"}`);
  lines.push(`Language: ${data.language}`);
  lines.push(`Score: ${data.score} / ${data.maxScore}`);
  if (data.overallFeedback) {
    lines.push("\nOverall feedback:");
    lines.push(data.overallFeedback);
  }
  lines.push("\nQuestions:");

  data.questions.forEach((item) => {
    lines.push(`\n${item.questionIndex}. ${item.question}`);
    lines.push(`Answer: ${item.answer}`);
    lines.push(`Score: ${item.score}`);
    lines.push(`Detected: ${item.matchedKeywords.join(", ") || "-"}`);
    lines.push(`Missing: ${item.missingKeywords.join(", ") || "-"}`);
    lines.push(`Suggested answer: ${item.suggestedAnswer}`);
    if (item.feedback) {
      lines.push(`Feedback: ${item.feedback}`);
    }
  });

  if (format === "md") {
    const mdLines = [];
    mdLines.push(`# ${currentInterview.roleLabel} - ${currentInterview.level}`);
    mdLines.push(`**Candidate:** ${data.candidateName || currentInterview.candidateId || "Unknown"}`);
    mdLines.push(`**Language:** ${data.language}`);
    mdLines.push(`**Score:** ${data.score} / ${data.maxScore}`);
    if (data.overallFeedback) {
      mdLines.push(`\n## Overall Feedback`);
      mdLines.push(data.overallFeedback);
    }
    data.questions.forEach((item) => {
      mdLines.push(`\n### ${item.questionIndex}. ${item.question}`);
      mdLines.push(`**Answer:** ${item.answer}`);
      mdLines.push(`**Score:** ${item.score}`);
      mdLines.push(`**Detected:** ${item.matchedKeywords.join(", ") || "-"}`);
      mdLines.push(`**Missing:** ${item.missingKeywords.join(", ") || "-"}`);
      mdLines.push(`**Suggested answer:** ${item.suggestedAnswer}`);
      if (item.feedback) {
        mdLines.push(`**Feedback:** ${item.feedback}`);
      }
    });
    return mdLines.join("\n\n");
  }

  return lines.join("\n");
}

function buildExportFileName(format) {
  const safeName = (currentInterview.candidateName || currentInterview.candidateId || "interview")
    .replace(/[\\/\\?%*:|"<>]/g, "")
    .trim()
    .replace(/\s+/g, "_");
  return `${safeName}-${currentInterview.id}.${format}`;
}

function downloadInterviewExport(format) {
  const content = buildInterviewExportContent(format);
  const mimeType = format === "json" ? "application/json" : format === "csv" ? "text/csv" : format === "md" ? "text/markdown" : "text/plain";
  const blob = new Blob([content], { type: `${mimeType}; charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = buildExportFileName(format);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

async function applyGptEvaluation() {
  const evaluation = await apiRequest("/api/ai/evaluate", {
    method: "POST",
    body: JSON.stringify({
      role: currentInterview.role,
      level: currentInterview.level,
      language: currentInterview.language,
      answers: currentInterview.questions.map((question, index) => ({
        question: question.question,
        answer: currentInterview.answers[index]?.answer || "",
        keywords: question.keywords,
      })),
    }),
  });
  const evaluationByIndex = new Map(evaluation.answers.map((item) => [item.index, item]));

  currentInterview.answers = currentInterview.questions.map((question, index) => {
    const existing = currentInterview.answers[index] || {
      question: question.question,
      answer: "",
    };
    const evaluated = evaluationByIndex.get(index);

    return evaluated ? { ...existing, ...evaluated, question: question.question } : existing;
  });
  currentInterview.score = currentInterview.answers.reduce((total, item) => total + (item.score || 0), 0);
  currentInterview.overallFeedback = evaluation.overallFeedback;
}

async function finishInterview(timeExpired) {
  clearInterval(timerId);
  const text = uiText[currentInterview.language] || uiText.he;

  try {
    await applyGptEvaluation();
  } catch (error) {
    console.error("GPT evaluation failed; using the local score.", error);
  }

  const maxScore = currentInterview.questions.length * 2;

  try {
    await apiRequest(`/api/interviews/${currentInterview.id}/finish`, {
      method: "PATCH",
      body: JSON.stringify({
        score: currentInterview.score,
        maxScore,
        overallFeedback: currentInterview.overallFeedback || "",
        answers: currentInterview.answers,
      }),
    });
  } catch (error) {
    showEmptyMessage(text.saveFailed, error.message);
    return;
  }

  renderHistory();
  interview.classList.add("hidden");
  emptyState.classList.remove("hidden");
  renderFinalSummary(timeExpired, maxScore);
}

function resetInterview() {
  const language = getInterfaceLanguage();
  const text = uiText[language] || uiText.he;

  clearInterval(timerId);
  currentInterview = null;
  currentIndex = 0;
  secondsLeft = 0;
  interview.classList.add("hidden");
  emptyState.classList.remove("hidden");
  emptyState.classList.remove("has-summary");
  hideExportActions();
  showEmptyMessage(text.readyTitle, text.readyMessage);
}

function buildInterviewInsights(roleConfig, profile, language) {
  const raw = profile.raw.trim();
  const skillNames = profile.skills.map((skill) => skill.name);
  const skills = skillNames.length ? skillNames : roleConfig.topics.map((topic) => topic.replace("-", " "));
  const project = profile.project || (language === "he" ? "הפרויקט שלך" : "your project");
  const background = raw || (language === "he" ? "הרקע שסיפרת עליו" : "your background");
  const compactBackground = background.length > 180 ? `${background.slice(0, 180)}...` : background;

  return {
    role: roleConfig.label,
    skills,
    primarySkill: skills[0] || roleConfig.label,
    secondarySkill: skills[1] || skills[0] || roleConfig.label,
    project,
    background: compactBackground,
  };
}

function getQuestions(role, level, count, profile, language) {
  const roleConfig = roleConfigs[role] || roleConfigs["general-tech"];
  const insights = buildInterviewInsights(roleConfig, profile, language);
  const behaviorQuestions = buildBehaviorQuestions(roleConfig, level, profile, language, insights);
  const personalQuestions = buildPersonalQuestions(roleConfig, level, profile, language, insights);
  const exactMatches = questionBank.filter((item) => roleConfig.topics.includes(item.topic));
  const allQuestions = [...behaviorQuestions, ...personalQuestions, ...shuffle(exactMatches)].map((question) => localizeQuestion(question, language));
  const uniqueQuestions = [];
  const seen = new Set();

  allQuestions.forEach((question) => {
    if (seen.has(question.question)) return;
    seen.add(question.question);
    uniqueQuestions.push(question);
  });

  return uniqueQuestions.slice(0, count);
}

function buildBehaviorQuestions(roleConfig, level, profile, language, insights = buildInterviewInsights(roleConfig, profile, language)) {
  const isHebrew = language === "he";
  const baseKeywords = Array.from(
    new Set([
      ...profile.skills.flatMap((skill) => skill.keywords),
      ...insights.skills.map((skill) => skill.toLowerCase()),
      "team",
      "collaboration",
      "feedback",
      "communication",
      "hire",
      "leadership",
      "צוות",
      "תקשורת",
      "משוב",
      "החלטה",
      "אחריות",
    ]),
  );

  if (isHebrew) {
    return [
      {
        topic: "hr",
        category: "team",
        level,
        question: `תאר החלטה שקיבלת לגבי ${insights.primarySkill}. איך היית מסביר אותה למנהל מוצר שלא בקיא בטכנולוגיה?`,
        hint: "הסבר את הבעיה, למה בחרת בדרך הזו, ומה ההשפעה על הצוות ועל הפרויקט.",
        keywords: [...baseKeywords, "החלטה", "עסקי", "צוות", "תקשורת"],
      },
      {
        topic: "hr",
        category: "hr",
        level,
        question: `כשיש קונפליקט בין חברי צוות, איך אתה מנהל את המצב כדי שכולם ינועו לפנים?`,
        hint: "דבר על האזנה לכל צד, בחינת העובדות, מציאת פתרון משותף ותקשורת ברורה.",
        keywords: [...baseKeywords, "קונפליקט", "צוות", "תקשורת", "פתרון"],
      },
      {
        topic: "hr",
        category: "leadership",
        level,
        question: `איך אתה מעודד חברי צוות לתת משוב זה לזה וכיצד אתה משמע את הצרות שלהם?`,
        hint: "תן דוגמה ממשית, דבר על תרבות פתוחה ועל זאת שהצוות מרגיש בטוח להגיד את דעתו.",
        keywords: [...baseKeywords, "משוב", "תרבות", "צוות", "קשיבה"],
      },
      {
        topic: "hr",
        category: "HR",
        level,
        question: `מה הערך שלך למנהל או ל-HR? תאר איך אתה תורם למעבר של הצוות ולעתיד החברה.`,
        hint: "דבר על הכישורים שלך, על זאת שאתה עושה הבדל, ועל זאת שאתה שותף ולא רק עובד.",
        keywords: [...baseKeywords, "ערך", "תורם", "מנהיגות", "צוות"],
      },
    ];
  }

  return [
    {
      topic: "hr",
      category: "team",
      level,
      question: `Describe a decision you made about ${insights.primarySkill}. How would you explain it to a non-technical manager?`,
      hint: "Explain the problem, why you chose that approach, and how it affected the team and project.",
      keywords: [...baseKeywords, "decision", "business", "team", "communication"],
    },
    {
      topic: "hr",
      category: "hr",
      level,
      question: `When there's a conflict between team members, how do you handle it so everyone can move forward?`,
      hint: "Talk about listening to each side, reviewing facts, finding a shared solution, and communicating clearly.",
      keywords: [...baseKeywords, "conflict", "team", "communication", "resolution"],
    },
    {
      topic: "hr",
      category: "leadership",
      level,
      question: `How do you encourage team members to give each other feedback, and how do you listen to their concerns?`,
      hint: "Give a real example, talk about an open culture, and how the team feels safe to speak up.",
      keywords: [...baseKeywords, "feedback", "culture", "team", "listening"],
    },
    {
      topic: "hr",
      category: "HR",
      level,
      question: `What value do you bring to your manager or HR? Describe how you contribute to your team's growth and the company's future.`,
      hint: "Talk about your strengths, how you make a difference, and how you see yourself as a partner, not just an employee.",
      keywords: [...baseKeywords, "value", "contribute", "leadership", "team"],
    },
  ];
}

function buildPersonalQuestions(roleConfig, level, profile, language, insights = buildInterviewInsights(roleConfig, profile, language)) {
  if (!profile.raw.trim()) return [];

  const isHebrew = language === "he";
  const baseKeywords = Array.from(
    new Set([
      ...profile.skills.flatMap((skill) => skill.keywords),
      ...insights.skills.map((skill) => skill.toLowerCase()),
      "problem",
      "solution",
      "tradeoff",
      "impact",
      "debug",
      "test",
      "בעיה",
      "פתרון",
      "השפעה",
      "בדיקה",
    ]),
  );

  const topic = roleConfig.topics.includes("backend")
    ? "backend"
    : roleConfig.topics.includes("devops")
      ? "devops"
      : roleConfig.topics.includes("qa")
        ? "qa"
        : roleConfig.topics.includes("product")
          ? "product"
          : roleConfig.topics.includes("database")
            ? "database"
            : "personal";

  if (isHebrew) {
    return [
      {
        topic,
        category: "project-deep-dive",
        level,
        question: `סיפרת: "${insights.background}". בחר חלק אחד מתוך ${insights.project} והסבר איך בנית אותו, למה בחרת בגישה הזו, ומה היית משפר היום.`,
        hint: "ענה במבנה: הקשר -> בעיה -> פתרון -> החלטה -> תוצאה -> שיפור.",
        keywords: [...baseKeywords, "הקשר", "תוצאה", "שיפור"],
      },
      {
        topic,
        category: "role-fit",
        level,
        question: `לתפקיד ${insights.role}, איך הניסיון שלך עם ${insights.primarySkill} עוזר לך לפתור בעיות אמיתיות בצוות?`,
        hint: "חבר בין הטכנולוגיה, האחריות בתפקיד, והערך העסקי או הטכני.",
        keywords: [...baseKeywords, "אחריות", "ערך", "צוות"],
      },
      {
        topic,
        category: "debugging",
        level,
        question: `דמיין ש-${insights.project} מפסיק לעבוד אצל משתמשים. איך תחקור את התקלה מהדקה הראשונה ועד למציאת הסיבה?`,
        hint: "דבר על שחזור, לוגים, בדיקות, בידוד מקור התקלה ותקשורת.",
        keywords: [...baseKeywords, "לוגים", "שחזור", "תקלה", "debug"],
      },
      {
        topic,
        category: "tradeoff",
        level,
        question: `תן דוגמה ל-tradeoff שהיית צריך לקבל בפרויקט שלך בין מהירות פיתוח, איכות, אבטחה או חוויית משתמש.`,
        hint: "מראיינים מחפשים שיקול דעת, לא תשובה מושלמת.",
        keywords: [...baseKeywords, "איכות", "אבטחה", "מהירות", "משתמש"],
      },
      {
        topic,
        category: "next-version",
        level,
        question: `אם היית בונה מחדש את ${insights.project} כדי להרשים מראיין לתפקיד ${insights.role}, מה היית משנה בארכיטקטורה או בתהליך העבודה?`,
        hint: "התייחס למה למדת, מה היית מפשט, ומה היית מודד.",
        keywords: [...baseKeywords, "ארכיטקטורה", "מדידה", "למידה"],
      },
      {
        topic,
        category: "collaboration",
        level,
        question: `איך היית מסביר למנהל מוצר או לחבר צוות לא טכני החלטה שעשית סביב ${insights.secondarySkill}?`,
        hint: "השתמש בשפה פשוטה, תאר השפעה, סיכון וחלופות.",
        keywords: [...baseKeywords, "השפעה", "סיכון", "חלופות"],
      },
    ];
  }

  return [
    {
      topic,
      category: "project-deep-dive",
      level,
      question: `You wrote: "${insights.background}". Pick one part of ${insights.project} and explain how you built it, why you chose that approach, and what you would improve today.`,
      hint: "Use this structure: context -> problem -> solution -> decision -> result -> improvement.",
      keywords: [...baseKeywords, "context", "result", "improvement"],
    },
    {
      topic,
      category: "role-fit",
      level,
      question: `For a ${insights.role} role, how does your experience with ${insights.primarySkill} help you solve real team problems?`,
      hint: "Connect the technology, the role responsibility, and the technical or business value.",
      keywords: [...baseKeywords, "responsibility", "value", "team"],
    },
    {
      topic,
      category: "debugging",
      level,
      question: `Imagine ${insights.project} stops working for users. How would you investigate from the first minute until you find the root cause?`,
      hint: "Talk about reproduction, logs, tests, isolating the source, and communication.",
      keywords: [...baseKeywords, "logs", "reproduce", "root cause", "debug"],
    },
    {
      topic,
      category: "tradeoff",
      level,
      question: `Give an example of a tradeoff you would make in your project between speed, quality, security, or user experience.`,
      hint: "Interviewers look for judgment, not a perfect answer.",
      keywords: [...baseKeywords, "quality", "security", "speed", "user"],
    },
    {
      topic,
      category: "next-version",
      level,
      question: `If you rebuilt ${insights.project} to impress an interviewer for a ${insights.role} role, what would you change in the architecture or workflow?`,
      hint: "Mention what you learned, what you would simplify, and what you would measure.",
      keywords: [...baseKeywords, "architecture", "measure", "learning"],
    },
    {
      topic,
      category: "collaboration",
      level,
      question: `How would you explain a decision around ${insights.secondarySkill} to a product manager or non-technical teammate?`,
      hint: "Use simple language and describe impact, risk, and alternatives.",
      keywords: [...baseKeywords, "impact", "risk", "alternatives"],
    },
  ];
}

function getSuggestedAnswer(question, language) {
  const isHebrew = language === "he";
  const category = question.category || "general";

  const hebrewGuides = {
    "project-deep-dive": "ענה כך: 1. מה בנית ובאיזה הקשר. 2. מה הייתה הבעיה. 3. איזו גישה בחרת ולמה. 4. מה הייתה התוצאה. 5. מה היית משפר היום. תשובה טובה נשמעת כמו סיפור קצר עם החלטות טכניות, לא כמו רשימת מושגים.",
    "role-fit": "ענה כך: חבר בין הטכנולוגיה שהזכרת לבין אחריות אמיתית בתפקיד. למשל: איך זה עוזר לפתור באגים, לבנות API, לשפר UX, להקטין סיכון או לעבוד טוב יותר בצוות.",
    debugging: "ענה כך: מתחילים בשחזור התקלה, בודקים לוגים/Network/DB, מבודדים שכבה אחת בכל פעם, מעלים השערה, מאמתים אותה, מתקנים, ואז מוסיפים בדיקה או ניטור כדי שזה לא יחזור.",
    tradeoff: "ענה כך: הצג שתי אפשרויות, הסבר יתרון וחיסרון של כל אחת, בחר אחת לפי ההקשר, וסיים במחיר ששילמת או במה היית משנה בהמשך.",
    "next-version": "ענה כך: ציין מה למדת מהגרסה הראשונה, מה היית מפשט, איזה חלק היית מפריד או בודק טוב יותר, ואיזה מדד היה מוכיח שהשיפור הצליח.",
    collaboration: "ענה כך: הסבר בלי ז'רגון. תאר את ההשפעה על המשתמש או העסק, הסיכון אם לא עושים את זה, והחלופות שהיו על השולחן.",
    general: "ענה במבנה: הקשר קצר, הבעיה, הפתרון שבחרת, למה בחרת בו, tradeoff, ומה למדת או איך בדקת שזה עובד.",
  };

  const englishGuides = {
    "project-deep-dive": "Answer like this: 1. What you built and the context. 2. The concrete problem. 3. The approach you chose and why. 4. The result. 5. What you would improve today. A strong answer sounds like a short story with technical decisions, not a list of buzzwords.",
    "role-fit": "Connect the technology you mentioned to a real responsibility in the role: fixing bugs, building APIs, improving UX, reducing risk, or collaborating better with a team.",
    debugging: "Start by reproducing the issue, inspect logs/network/database state, isolate one layer at a time, form a hypothesis, verify it, fix it, then add a test or monitor so it does not return.",
    tradeoff: "Present two options, explain the pros and cons of each, choose based on context, and finish with the cost of that decision or what you would revisit later.",
    "next-version": "Mention what you learned from the first version, what you would simplify, what you would separate or test better, and what metric would prove the improvement worked.",
    collaboration: "Explain without jargon. Describe user or business impact, the risk of not doing it, and the alternatives you considered.",
    general: "Use this structure: brief context, problem, chosen solution, why you chose it, tradeoff, and what you learned or how you verified it worked.",
  };

  const guides = isHebrew ? hebrewGuides : englishGuides;
  return guides[category] || guides.general;
}

form.addEventListener("submit", startInterview);
if (interfaceLanguageSelect) {
  interfaceLanguageSelect.addEventListener("change", () => {
    applyInterfaceLanguage();
  });
}
if (interviewLanguageSelect) {
  interviewLanguageSelect.addEventListener("change", () => {
    applyInterviewLanguage();
  });
  applyInterviewLanguage();
}
typeCards.forEach((card) => {
  card.addEventListener("click", () => {
    const role = card.dataset.role;
    if (roleSelect && role) {
      roleSelect.value = role;
    }

    typeCards.forEach((item) => item.classList.toggle("active", item === card));
  });
});
hintButton.addEventListener("click", () => hintText.classList.toggle("hidden"));
submitAnswer.addEventListener("click", evaluateAnswer);
nextQuestion.addEventListener("click", goToNextQuestion);
restart.addEventListener("click", resetInterview);
clearHistory.addEventListener("click", async () => {
  await apiRequest("/api/interviews", { method: "DELETE" });
  renderHistory();
});

if (downloadTxt) {
  downloadTxt.addEventListener("click", () => downloadInterviewExport("txt"));
}
if (downloadMd) {
  downloadMd.addEventListener("click", () => downloadInterviewExport("md"));
}
if (downloadCsv) {
  downloadCsv.addEventListener("click", () => downloadInterviewExport("csv"));
}
if (downloadJson) {
  downloadJson.addEventListener("click", () => downloadInterviewExport("json"));
}

renderHistory();
