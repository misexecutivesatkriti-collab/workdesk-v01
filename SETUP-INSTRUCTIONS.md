# Work Desk v1.0 - Setup Instructions

## 📋 Overview

Thank you for choosing **Work Desk v1.0** - a comprehensive operations management platform for hospital teams.

Work Desk provides:
- **Task Management** - 7 frequency types (daily, 15-day, monthly, quarterly, half-yearly, yearly, delegation)
- **Staff & Department Management** - Directory, incharge assignment, soft-delete protection
- **Handover & Delegation** - Shift transition workflows with task transfer
- **Issue Tracking** - P1/P2/P3 priority-coded problem reports with escalation
- **Real-time Dashboard** - Live KPI counters, donut charts, drill-down popups
- **MIS Reporting** - Role-scoped reports with Excel export
- **Live Tracking** - Per-employee status tracking
- **Mobile-Responsive** - Works on phones and tablets

## 🛠 Prerequisites

Before you begin, ensure you have the following:

1. **Node.js 18 or higher**
   - Download from: https://nodejs.org/
   - Verify installation: `node --version` (should show v18.x or higher)

2. **npm 9 or higher**
   - Comes with Node.js
   - Verify: `npm --version`

3. **A Supabase Account** (Required)
   - Sign up at: https://supabase.com/ (free tier available)
   - Create a new project for Work Desk

4. **A Brevo (Sendinblue) Account** (Optional)
   - Only needed if you want email notifications
   - Sign up at: https://brevo.com/

## 📥 Installation

### Step 1: Extract the Project

Extract the provided zip file to a directory of your choice:

**On Windows:**
- Right-click the zip file
- Select "Extract All..."
- Choose a destination folder

**On Mac/Linux:**
```bash
unzip WorkDesk-v1.0-Client-Deployment.zip -d WorkDesk
cd WorkDesk
```

### Step 2: Install Dependencies

Open a terminal/command prompt in the project directory and run:

```bash
# Install frontend dependencies (this may take 2-5 minutes)
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

This will create a `node_modules/` directory with all required packages.

## 🔧 Configuration

### Step 3: Set Up Environment Variables

#### Frontend Configuration

Create a `.env` file in the project root directory:

**On Windows (Command Prompt):**
```cmd
copy .env.example .env
```

**On Mac/Linux:**
```bash
cp .env.example .env
```

Now edit the `.env` file with your Supabase project details:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_public_key
```

**How to find these values:**
1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to **Settings** → **API**
4. Copy **Project URL** (for VITE_SUPABASE_URL)
5. Copy **anon public key** (for VITE_SUPABASE_ANON_KEY)

#### Backend Configuration (for Email Notifications)

If you want to use email notifications, create a `.env` file in the `server/` directory:

**On Windows:**
```cmd
cd server
copy .env.example .env
```

**On Mac/Linux:**
```bash
cd server
cp .env.example .env
```

Edit `server/.env` with your configuration:

```env
# Supabase configuration
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# JWT secret for session management
JWT_SECRET=your_random_secret_string_here

# Server port (default: 3001)
PORT=3001

# Brevo (Sendinblue) email configuration - OPTIONAL
# Remove these lines if you don't need email notifications
BREVO_API_KEY=your_brevo_api_key
BREVO_SENDER_EMAIL=your_email@your-domain.com
BREVO_SENDER_NAME=Work Desk
```

**How to find Supabase Service Role Key:**
1. Go to your Supabase project
2. Go to **Settings** → **API**
3. Copy **Service role key** (keep this secure!)

**Note:** The Service Role Key has full access to your database. Never share it or commit it to version control.

## 🗄️ Database Setup

### Step 4: Create Database Tables

1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Select your project
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**
5. Open the `SQL_SCHEMA.sql` file from the project
6. Copy all the SQL code
7. Paste it into the SQL Editor
8. Click **Run** to execute

This will create all 11 required tables:
- `workdesk_departments` - Department information
- `workdesk_employees` - Staff directory
- `workdesk_admins` - Admin users
- `workdesk_tasks` - All tasks
- `workdesk_issues` - Problem reports
- `workdesk_handovers` - Shift handovers
- `workdesk_delegations` - Task delegations
- `workdesk_activity_log` - Audit trail
- `workdesk_trash` - Soft-deleted items
- `workdesk_user_links` - Quick-access URLs
- `workdesk_notices` - Notifications

### Step 5: Verify Tables

After running the SQL, refresh the **Table Editor** in Supabase to verify all 11 `workdesk_*` tables were created successfully.

## 🚀 Running the Application

### Step 6: Start the Frontend

In a terminal, run:

```bash
npm run dev
```

This starts the development server. After a few moments, you'll see:
```
  VITE v8.1.0  ready in 1234 ms
  ➜  Local:   http://localhost:5173
  ➜  Network: use --host to expose
```

Open your browser to: **http://localhost:5173**

### Step 7: Start the Backend (for Email)

In a **separate terminal**, run:

```bash
cd server
node index.js
```

This starts the email server. You'll see:
```
Work Desk API on port 3001 -> Supabase connected
```

**Note:** The backend server is only needed if you want email notifications. If you're not using email, you can skip this step.

## 🔐 First Login

### Step 8: Access the Application

1. Open your browser to: **http://localhost:5173**
2. Use the default Main Admin credentials:
   - **Username:** `VIBHAV`
   - **Password:** `Vibhav@0206`

### Step 9: Initial Setup

After logging in, we recommend the following setup steps:

1. **Change Default Password**
   - Go to **Settings**
   - Change the VIBHAV password immediately for security

2. **Create Departments**
   - Go to **Departments**
   - Click "Add Department"
   - Create departments for your hospital (e.g., Nursing, Administration, Housekeeping)

3. **Add Staff**
   - Go to **Staff** or **Employees**
   - Click "Add Employee"
   - Add your hospital staff with their details

4. **Create Admin Users** (Optional)
   - Go to **Admins**
   - Click "Add Admin"
   - Create additional admin accounts with appropriate permissions

5. **Configure Permissions**
   - Each admin has 22 fine-grained permissions
   - Configure permissions based on user roles

## 🏗️ Production Deployment

### Build the Frontend

To create optimized production files:

```bash
npm run build
```

This creates production-ready files in the `dist/` directory.

### Deploy to Vercel (Recommended)

1. Sign up at: https://vercel.com/
2. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. Deploy:
   ```bash
   vercel
   ```
4. Follow the prompts to link your project
5. Vercel will automatically deploy your application

### Deploy to Other Static Hosts

You can deploy the `dist/` directory to any static hosting service:

- **Netlify:** Drag and drop the `dist/` folder to Netlify
- **Cloudflare Pages:** Connect your Git repository or upload the `dist/` folder
- **AWS S3 + CloudFront:** Upload `dist/` to S3 and configure CloudFront
- **Any Web Server:** Copy `dist/` to your web server (Nginx, Apache, etc.)

### Backend Deployment (Optional)

If you need email notifications, deploy the backend server:

**Recommended Hosts:**
- **Render.com** - Free tier available
- **Railway.app** - Easy Node.js deployment
- **AWS EC2** - Full control
- **Heroku** - Free tier available

**Steps:**
1. Upload the `server/` directory to your hosting provider
2. Set the environment variables in your hosting dashboard:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `JWT_SECRET`
   - `PORT` (default: 3001)
   - `BREVO_API_KEY` (optional)
3. Start the server

## 📊 Understanding the System

### User Roles

Work Desk has three user roles:

1. **Main Admin** (Superuser)
   - Full access to all modules
   - Can see all notifications
   - Can manage other admins
   - Cannot be deleted or demoted

2. **Admin** (Configurable)
   - 22 individual permissions
   - Can do everything within granted permissions
   - Permissions configured by Main Admin

3. **Staff** (Employee)
   - Frontline users (nurses, technicians, etc.)
   - Can only see their own tasks, handovers, and delegations
   - Log in with name + department password

### Permission System

22 fine-grained permissions covering:

- **Tasks:** view, add, edit, delete, assign
- **Issues:** view, add, resolve
- **Employees:** view, edit
- **Departments:** view, edit
- **Handover:** view, edit
- **Delegation:** view, add/manage
- **Checklists:** view
- **Escalation:** view
- **Tracking:** view
- **MIS Reports:** view
- **Trash:** view
- **All Task Details:** view all task details across departments

## 🔧 Configuration Options

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_SUPABASE_URL` | Yes | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Yes | Your Supabase anon public key |
| `SUPABASE_URL` | Yes (backend) | Same as above |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes (backend) | Supabase service role key |
| `JWT_SECRET` | Yes (backend) | Random string for sessions |
| `PORT` | No | Backend port (default: 3001) |
| `BREVO_API_KEY` | No | Brevo API key for email |
| `BREVO_SENDER_EMAIL` | No | Sender email address |
| `BREVO_SENDER_NAME` | No | Sender name for emails |

### Theme Configuration

Work Desk supports dark and light themes:
- Click the 🌙/☀️ button in the bottom-right corner to toggle
- Theme preference is saved in localStorage

## 🛠 Troubleshooting

### Common Issues and Solutions

#### Issue: "Supabase URL not configured"
**Solution:** Check your `.env` file has both `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` with valid values.

#### Issue: "Connection refused" to backend
**Solution:** Ensure the backend server is running (`node server/index.js`). If you're not using email notifications, you can ignore this.

#### Issue: "Invalid credentials" on login
**Solution:** Use the default credentials:
- Username: `VIBHAV`
- Password: `Vibhav@0206`

If you've changed the password, use the new credentials. If you forgot it, you'll need to reset it via the database.

#### Issue: "Table not found" errors
**Solution:** Run the `SQL_SCHEMA.sql` in your Supabase SQL Editor to create all required tables.

#### Issue: Email not sending
**Solution:** 
1. Ensure the backend server is running
2. Check `BREVO_API_KEY` is configured in `server/.env`
3. Verify your Brevo account has credits

#### Issue: CORS errors
**Solution:** Ensure your Supabase URL in `.env` matches exactly with your Supabase project URL (including https://).

#### Issue: "Cannot read properties of undefined"
**Solution:** This usually means the Supabase connection failed. Check:
1. Your `.env` file has correct values
2. Your Supabase project is running
3. You've restarted the dev server after changing `.env`

### Debugging Tips

1. **Check Supabase Connection:**
   - Go to Supabase dashboard
   - Verify your project is active
   - Test the connection with the provided URL and key

2. **Check Browser Console:**
   - Press F12 in your browser
   - Go to Console tab
   - Look for red error messages

3. **Check Network Tab:**
   - In browser dev tools, go to Network tab
   - Look for failed requests
   - Check response errors

## 🔐 Security Recommendations

### Before Going to Production

1. **Change All Default Credentials**
   - Change the VIBHAV password immediately
   - Change default department passwords
   - Create new admin accounts with strong passwords

2. **Use HTTPS**
   - Always use HTTPS in production
   - Never use HTTP for login pages

3. **Secure Your Keys**
   - Never expose `SUPABASE_SERVICE_ROLE_KEY`
   - Never commit `.env` files to version control
   - Use environment variables in production

4. **Enable Row-Level Security (RLS)**
   - For multi-tenant deployments, configure proper RLS policies
   - Current setup uses anon key with full access (suitable for internal use)

5. **Regular Backups**
   - Set up regular database backups in Supabase
   - Export important data periodically

6. **Rate Limiting**
   - Consider adding rate limiting to prevent abuse
   - Especially important for public-facing deployments

7. **Firewall Rules**
   - Configure Supabase firewall rules if needed
   - Restrict access to known IP addresses

## 📚 Additional Documentation

- **README.md** - Project overview and technical details
- **VERSION-1.0.md** - Version history and changelog
- **SQL_SCHEMA.sql** - Complete database schema

## 📞 Support

For technical support:
1. Refer to this SETUP-INSTRUCTIONS.md file
2. Check the README.md for additional information
3. Review the troubleshooting section above

## 📄 License

This software is provided for your internal use. All rights reserved.

---

**Version:** 1.0 (Foundation)  
**Release Date:** June 30, 2026  
**Last Updated:** July 2, 2026