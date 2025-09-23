-- ZipZap Computers Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Enable Row Level Security (RLS)
ALTER DATABASE postgres SET default_transaction_isolation = 'read committed';

-- 1. Inventory Table
CREATE TABLE IF NOT EXISTS inventory (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    category TEXT NOT NULL,
    condition TEXT NOT NULL CHECK (condition IN ('New', 'Used', 'Refurbished')),
    in_stock BOOLEAN NOT NULL DEFAULT true,
    quantity INTEGER NOT NULL DEFAULT 0 CHECK (quantity >= 0),
    image_url TEXT,
    brand TEXT NOT NULL,
    model TEXT,
    specs TEXT[] DEFAULT '{}',
    date_added DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    text TEXT NOT NULL,
    service TEXT,
    date TEXT NOT NULL,
    verified BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Gallery Table
CREATE TABLE IF NOT EXISTS gallery (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    before_image_url TEXT NOT NULL,
    after_image_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Add Updated At Triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_inventory_updated_at BEFORE UPDATE ON inventory
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gallery_updated_at BEFORE UPDATE ON gallery
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 6. Row Level Security Policies

-- Enable RLS on all tables
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Public read access for inventory, reviews, and gallery
CREATE POLICY "Public can view inventory" ON inventory
    FOR SELECT USING (true);

CREATE POLICY "Public can view reviews" ON reviews
    FOR SELECT USING (true);

CREATE POLICY "Public can view gallery" ON gallery
    FOR SELECT USING (true);

-- Admin-only access for modifications
-- Note: In production, you'd set up proper auth with Supabase Auth
-- For now, we'll use service role key for admin operations

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_inventory_category ON inventory(category);
CREATE INDEX IF NOT EXISTS idx_inventory_in_stock ON inventory(in_stock);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);
CREATE INDEX IF NOT EXISTS idx_gallery_created_at ON gallery(created_at DESC);

-- Insert default admin user (password will be hashed in application)
-- Default email: admin@zipzapcomputers.com
-- You'll set the password through the app
INSERT INTO admin_users (email, password_hash)
VALUES ('admin@zipzapcomputers.com', '$2b$10$placeholder')
ON CONFLICT (email) DO NOTHING;

-- Insert some sample data
INSERT INTO inventory (name, description, price, category, condition, in_stock, quantity, brand, model, specs) VALUES
    ('iPhone 13 Pro - Unlocked', 'Fully unlocked iPhone 13 Pro in excellent condition. Includes original charger and box.', 699.00, 'Phones', 'Used', true, 2, 'Apple', 'iPhone 13 Pro', '{"128GB Storage", "Face ID", "Triple Camera System", "A15 Bionic Chip"}'),
    ('Samsung Galaxy S22 Ultra', 'Premium Android flagship with S Pen. Factory unlocked and ready to use.', 599.00, 'Phones', 'Used', true, 1, 'Samsung', 'Galaxy S22 Ultra', '{"256GB Storage", "S Pen Included", "108MP Camera", "5G Ready"}'),
    ('MacBook Air M2', 'Latest MacBook Air with M2 chip. Perfect for students and professionals.', 999.00, 'Laptops', 'Refurbished', true, 1, 'Apple', 'MacBook Air M2', '{"8GB RAM", "256GB SSD", "13.6 inch Display", "M2 Chip"}')
ON CONFLICT DO NOTHING;

INSERT INTO reviews (name, rating, text, service, date, verified) VALUES
    ('Sarah Johnson', 5, 'Excellent service! Fixed my laptop same day and the price was very reasonable. Highly recommend!', 'Laptop Repair', 'a week ago', true),
    ('Mike Chen', 5, 'Best computer repair shop in Salem! They recovered all my data when I thought it was lost forever.', 'Data Recovery', '2 weeks ago', true),
    ('Emily Davis', 4, 'Great prices on refurbished laptops. Got a great deal on a MacBook Pro!', 'Laptop Purchase', 'a month ago', true)
ON CONFLICT DO NOTHING;

-- Success message
SELECT 'ZipZap Computers database schema created successfully!' as status;