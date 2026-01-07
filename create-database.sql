-- Create database if it doesn't exist
SELECT 'CREATE DATABASE homestay_booking'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'homestay_booking')\gexec

-- Connect to the database
\c homestay_booking

-- Display success message
SELECT 'Database homestay_booking is ready!' as status;
