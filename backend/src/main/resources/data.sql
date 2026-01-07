-- Insert sample packages (CP, MAP, AP)
INSERT INTO packages (name, description, price, created_at) VALUES
('CP', 'Continental Plan - Room with breakfast included', 500.00, CURRENT_TIMESTAMP),
('MAP', 'Modified American Plan - Room with breakfast and dinner', 1000.00, CURRENT_TIMESTAMP),
('AP', 'American Plan - Room with all meals (breakfast, lunch, dinner)', 1500.00, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

-- Insert sample rooms
INSERT INTO rooms (name, description, type, price_per_night, max_guests, amenities, image_urls, is_available, created_at, updated_at) VALUES
('Deluxe Mountain View', 'Spacious room with stunning mountain views, king-size bed, and modern amenities', 'DELUXE', 2500.00, 2, 'WiFi,AC,TV,Mini Bar,Mountain View,Balcony', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Standard Garden Room', 'Comfortable room overlooking the garden with queen-size bed', 'STANDARD', 1500.00, 2, 'WiFi,AC,TV,Garden View', 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Luxury Suite', 'Premium suite with separate living area, jacuzzi, and panoramic views', 'SUITE', 5000.00, 4, 'WiFi,AC,TV,Mini Bar,Jacuzzi,Living Room,Balcony,Mountain View', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Deluxe Valley View', 'Modern deluxe room with valley views and premium furnishings', 'DELUXE', 2800.00, 2, 'WiFi,AC,TV,Mini Bar,Valley View,Work Desk', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Standard Twin Room', 'Cozy room with twin beds, perfect for friends or colleagues', 'STANDARD', 1800.00, 2, 'WiFi,AC,TV,Twin Beds', 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Family Suite', 'Spacious suite perfect for families with two bedrooms and kitchenette', 'SUITE', 6000.00, 6, 'WiFi,AC,TV,Kitchenette,Two Bedrooms,Living Room,Dining Area', 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;
