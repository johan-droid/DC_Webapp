# Detective Conan Webapp

The official Detective Conan case files and news database.

## 🚀 Deployment

### Prerequisites to Deploy
- **Supabase Account**: You need a Supabase project for the database.
- **Vercel/Heroku/Render Account**: For hosting the web app.

### 1. Database Setup (Supabase)
1.  Create a new Supabase project.
2.  Go to the **SQL Editor** in your Supabase dashboard.
3.  Copy the contents of `schema.sql` from this repository and run it.
    - This will create the necessary tables (`news`, `cases`, `characters`) and Policies.

### 2. Environment Variables
You need to set the following environment variables in your deployment platform:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL (Settings -> API) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase Anon Key (Settings -> API) |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase Service Role Key (Settings -> API) |
| `ADMIN_SECRET` | A strong password for the admin panel (min 16 chars) |
| `NEXT_PUBLIC_SITE_URL` | Your deployed site URL (e.g., `https://your-app.vercel.app`) |

### 3. Deploying
#### Vercel (Recommended)
1.  Import this repository into Vercel.
2.  Vercel will automatically detect Next.js.
3.  Add the environment variables listed above.
4.  Click **Deploy**.

#### Heroku
1.  Create a new app on Heroku.
2.  Connect your GitHub repository.
3.  Go to **Settings** -> **Reveal Config Vars** and add the environment variables.
4.  Deploy the branch.

### 4. Verification
After deployment, visit `/api/health` to check the connection status.

## 🛡️ Security Note
-   Never commit `.env.local` or `.env.production` files.
-   The `ADMIN_SECRET` should be kept secure.

## 📂 Project Structure
-   `src/`: Source code
-   `schema.sql`: Database schema definition
-   `public/`: Static assets
