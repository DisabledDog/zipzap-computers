-- ZipZap Computers Clean Database Setup
-- No sample data - ready for real inventory

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

-- 4. Create reviews table for manual review management
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

-- 5. Enable Row Level Security (RLS) for security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- 6. Create policies for public read access
-- Inventory: Public can read all available items
CREATE POLICY "Public can view available inventory" ON inventory
    FOR SELECT USING (is_available = true);

-- Gallery: Public can view all gallery items
CREATE POLICY "Public can view gallery" ON gallery
    FOR SELECT USING (true);

-- Reviews: Public can view approved reviews
CREATE POLICY "Public can view approved reviews" ON reviews
    FOR SELECT USING (is_approved = true);

-- 7. Create policies for admin access (service role)
-- Admin users can do everything on all tables
CREATE POLICY "Admin full access to inventory" ON inventory
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Admin full access to gallery" ON gallery
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Admin full access to reviews" ON reviews
    FOR ALL USING (auth.role() = 'service_role');

-- 8. Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 9. Add updated_at triggers to all tables
CREATE TRIGGER update_inventory_updated_at BEFORE UPDATE ON inventory
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gallery_updated_at BEFORE UPDATE ON gallery
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 10. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_inventory_category ON inventory(category);
CREATE INDEX IF NOT EXISTS idx_inventory_available ON inventory(is_available);
CREATE INDEX IF NOT EXISTS idx_gallery_featured ON gallery(is_featured);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery(category);
CREATE INDEX IF NOT EXISTS idx_reviews_approved ON reviews(is_approved);
CREATE INDEX IF NOT EXISTS idx_reviews_featured ON reviews(is_featured);

-- Database ready for real data!
-- Tables created with no sample data - start uploading your inventory!