# AI Interview Simulator

סימולטור ראיונות עם Frontend ב־JavaScript, שרת Node.js ושמירת נתונים ב־PostgreSQL.

## הפעלה מקומית

דרישות: Node.js 20 ומעלה ו־Docker.

1. מפעילים PostgreSQL מתיקיית הפרויקט:

   ```bash
   docker compose up -d postgres
   ```

2. יוצרים קובץ הגדרות מקומי:

   ```powershell
   Copy-Item backend/.env.example backend/.env
   ```

3. פותחים את `backend/.env` ומוסיפים מפתח OpenAI:

   ```env
   OPENAI_API_KEY=sk-...
   OPENAI_MODEL=gpt-5.6-sol
   ```

   את המפתח יוצרים ב־[OpenAI API Keys](https://platform.openai.com/api-keys). אין להוסיף אותו ל־frontend או להכניס אותו ל־Git.

4. מתקינים תלויות ומפעילים את השרת:

   ```bash
   cd backend
   npm install
   npm start
   ```

5. פותחים בדפדפן את `http://localhost:3000`.

השרת יוצר אוטומטית את טבלת `interviews` בהפעלה הראשונה. המידע נשמר ב־Docker volume בשם `postgres_data`, ולכן נשאר גם אחרי עצירת הקונטיינר.

## שילוב GPT

ה־backend משתמש ב־OpenAI Responses API כדי:

- ליצור שאלות ראיון מותאמות לתפקיד, לרמה, לשפה ולפרופיל המועמד.
- להעריך את כל התשובות בסיום הראיון ולהחזיר ציון, מושגים שחסרים, תשובה מומלצת ומשוב מסכם.
- לקבל תשובות במבנה JSON מוגדר באמצעות Structured Outputs.

מפתח ה־API נשאר בצד השרת בלבד. בקשות המודל מוגדרות עם `store: false`. ניתן לבדוק אם החיבור מוגדר בנתיב `GET /api/ai/status`.

## חיבור למסד נתונים אחר

מעדכנים את `DATABASE_URL` בתוך `backend/.env`:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE
```

בספק PostgreSQL שדורש SSL יש להגדיר גם:

```env
DATABASE_SSL=true
```

## בדיקת קוד

מתוך `backend`:

```bash
npm run check
```
