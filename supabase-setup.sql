-- ZipZap Computers Supabase Database Setup
-- Run this SQL in your Supabase SQL Editor

-- 1. Create admin_users table for secure authentication
CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create inventory table for store items
CREATE TABLE IF NOT EXISTS inventory (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2),
    category VARCHAR(100),
    condition VARCHAR(50) DEFAULT 'Used',
    brand VARCHAR(100),
    model VARCHAR(100),
    image_url TEXT,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create gallery table for before/after photos
CREATE TABLE IF NOT EXISTS gallery (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    before_image_url TEXT,
    after_image_url TEXT,
    category VARCHAR(100) DEFAULT 'repair',
    device_type VARCHAR(100),
    repair_type VARCHAR(100),
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create reviews table (for manual review management if needed)
CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    author_name VARCHAR(255) NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_approved BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Insert sample data for inventory
INSERT INTO inventory (title, description, price, category, condition, brand, model, image_url) VALUES
('iPhone 12 Pro Max', 'Unlocked, excellent condition, 256GB storage', 649.99, 'Phones', 'Excellent', 'Apple', 'iPhone 12 Pro Max', 'https://via.placeholder.com/300x300?text=iPhone+12+Pro+Max'),
('Samsung Galaxy S21', 'Great condition, 128GB, works perfectly', 449.99, 'Phones', 'Good', 'Samsung', 'Galaxy S21', 'https://via.placeholder.com/300x300?text=Samsung+Galaxy+S21'),
('MacBook Air M1', 'Lightly used, 512GB SSD, 8GB RAM', 899.99, 'Laptops', 'Excellent', 'Apple', 'MacBook Air', 'https://via.placeholder.com/300x300?text=MacBook+Air+M1'),
('Dell XPS 13', 'Refurbished, Intel i7, 16GB RAM, 512GB SSD', 749.99, 'Laptops', 'Refurbished', 'Dell', 'XPS 13', 'https://via.placeholder.com/300x300?text=Dell+XPS+13'),
('iPad Pro 11"', '2021 model, 256GB, WiFi only', 549.99, 'Tablets', 'Excellent', 'Apple', 'iPad Pro', 'https://via.placeholder.com/300x300?text=iPad+Pro+11'),
('HP Gaming Desktop', 'Custom built, RTX 3060, 16GB RAM, 1TB SSD', 1199.99, 'Desktops', 'Refurbished', 'HP', 'Gaming Desktop', 'https://via.placeholder.com/300x300?text=HP+Gaming+Desktop');

-- 6. Insert sample data for gallery
INSERT INTO gallery (title, description, before_image_url, after_image_url, category, device_type, repair_type, is_featured) VALUES
('iPhone 13 Screen Replacement', 'Cracked screen completely restored to perfect condition', 'https://via.placeholder.com/400x300?text=Cracked+iPhone+Screen', 'https://via.placeholder.com/400x300?text=Perfect+iPhone+Screen', 'repair', 'iPhone', 'Screen Replacement', true),
('MacBook Pro Water Damage Recovery', 'Liquid damaged MacBook Pro fully restored', 'https://via.placeholder.com/400x300?text=Water+Damaged+MacBook', 'https://via.placeholder.com/400x300?text=Restored+MacBook', 'repair', 'MacBook', 'Water Damage', true),
('Samsung Galaxy Battery Replacement', 'Swollen battery safely replaced, device working perfectly', 'https://via.placeholder.com/400x300?text=Swollen+Battery', 'https://via.placeholder.com/400x300?text=New+Battery', 'repair', 'Samsung Galaxy', 'Battery Replacement', false),
('Gaming PC Upgrade', 'Complete system upgrade with new GPU and RAM', 'https://via.placeholder.com/400x300?text=Old+Gaming+PC', 'https://via.placeholder.com/400x300?text=Upgraded+Gaming+PC', 'upgrade', 'Desktop PC', 'Hardware Upgrade', true),
('iPad Pro Screen and Digitizer Repair', 'Completely shattered iPad Pro screen restored', 'https://via.placeholder.com/400x300?text=Shattered+iPad', 'https://via.placeholder.com/400x300?text=Perfect+iPad', 'repair', 'iPad Pro', 'Screen Replacement', false);

-- 7. Insert sample reviews (backup in case Google Reviews API fails)
INSERT INTO reviews (author_name, rating, review_text, is_featured, is_approved) VALUES
('Sarah Johnson', 5, 'Excellent service! They fixed my laptop screen in just 2 hours. Very professional and reasonably priced.', true, true),
('Mike Rodriguez', 5, 'Best computer repair shop in Salem! They recovered all my files from a crashed hard drive.', true, true),
('Emily Chen', 5, 'Quick phone screen replacement, great customer service. Definitely recommend ZipZap Computers!', false, true),
('David Thompson', 4, 'Good work on my desktop upgrade. Fair prices and honest about what needed to be done.', false, true);

-- 8. Enable Row Level Security (RLS) for security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- 9. Create policies for public read access
-- Inventory: Public can read all available items
CREATE POLICY "Public can view available inventory" ON inventory
    FOR SELECT USING (is_available = true);

-- Gallery: Public can view all gallery items
CREATE POLICY "Public can view gallery" ON gallery
    FOR SELECT USING (true);

-- Reviews: Public can view approved reviews
CREATE POLICY "Public can view approved reviews" ON reviews
    FOR SELECT USING (is_approved = true);

-- 10. Create policies for admin access (you'll need to set up authentication)
-- Admin users can do everything on all tables
CREATE POLICY "Admin full access to inventory" ON inventory
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Admin full access to gallery" ON gallery
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Admin full access to reviews" ON reviews
    FOR ALL USING (auth.role() = 'service_role');

-- 11. Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 12. Add updated_at triggers to all tables
CREATE TRIGGER update_inventory_updated_at BEFORE UPDATE ON inventory
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gallery_updated_at BEFORE UPDATE ON gallery
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 13. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_inventory_category ON inventory(category);
CREATE INDEX IF NOT EXISTS idx_inventory_available ON inventory(is_available);
CREATE INDEX IF NOT EXISTS idx_gallery_featured ON gallery(is_featured);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery(category);
CREATE INDEX IF NOT EXISTS idx_reviews_approved ON reviews(is_approved);
CREATE INDEX IF NOT EXISTS idx_reviews_featured ON reviews(is_featured);

-- Setup Complete!
-- Your database is now ready for ZipZap Computers website