# Create Database - Manual Steps

Since the automated script requires password input, please follow these steps:

## Option 1: Using pgAdmin (Easiest)

1. Open **pgAdmin** (installed with PostgreSQL)
2. Connect to your PostgreSQL server (localhost)
3. Right-click on **Databases**
4. Select **Create** → **Database**
5. Enter database name: `homestay_booking`
6. Click **Save**

## Option 2: Using Command Line

Open **Command Prompt** or **PowerShell** and run:

```cmd
"C:\Program Files\PostgreSQL\15\bin\psql.exe" -U postgres
```

When prompted, enter your PostgreSQL password (the one you set during installation).

Then in the psql prompt, run:

```sql
CREATE DATABASE homestay_booking;
\q
```

## Option 3: Using the setup-database.bat script

Simply double-click on `setup-database.bat` in the project folder, and enter your PostgreSQL password when prompted.

## Verify Database Created

After creating the database, verify it exists:

```cmd
"C:\Program Files\PostgreSQL\15\bin\psql.exe" -U postgres -l
```

You should see `homestay_booking` in the list.

## Next Steps

After creating the database, start the backend:

```cmd
cd backend
.\run-backend.bat
```
