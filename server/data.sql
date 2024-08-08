-- Insert dummy data into `users` table
INSERT INTO `marchina`.`users` (`firstName`, `lastName`, `email`, `password`, `role`, `adress`, `createdAt`, `updatedAt`, `status`) VALUES
('John', 'Doe', 'john.doe@example.com', 'password123', 'admin', '123 Main St, Springfield', NOW(), NOW(), 'active'),
('Jane', 'Smith', 'jane.smith@example.com', 'password123', 'buyer', '456 Elm St, Springfield', NOW(), NOW(), 'inactive'),
('Alice', 'Johnson', 'alice.johnson@example.com', 'password123', 'buyer', '789 Maple Ave, Springfield', NOW(), NOW(), 'active'),
('Bob', 'Brown', 'bob.brown@example.com', 'password123', 'buyer', '321 Oak St, Springfield', NOW(), NOW(), 'inactive'),
('Emma', 'Wilson', 'emma.wilson@example.com', 'password123', 'buyer', '654 Pine Rd, Springfield', NOW(), NOW(), 'active'),
('Michael', 'Taylor', 'michael.taylor@example.com', 'password123', 'buyer', '987 Cedar Ln, Springfield', NOW(), NOW(), 'inactive'),
('Olivia', 'Anderson', 'olivia.anderson@example.com', 'password123', 'buyer', '147 Birch Dr, Springfield', NOW(), NOW(), 'active'),
('William', 'Thomas', 'william.thomas@example.com', 'password123', 'buyer', '258 Walnut Ave, Springfield', NOW(), NOW(), 'inactive'),
('Sophia', 'Jackson', 'sophia.jackson@example.com', 'password123', 'buyer', '369 Cherry St, Springfield', NOW(), NOW(), 'active'),
('James', 'White', 'james.white@example.com', 'password123', 'buyer', '741 Ash Rd, Springfield', NOW(), NOW(), 'inactive'),
('Emily', 'Harris', 'emily.harris@example.com', 'password123', 'buyer', '852 Spruce Ln, Springfield', NOW(), NOW(), 'active'),
('Daniel', 'Martin', 'daniel.martin@example.com', 'password123', 'buyer', '963 Fir Ave, Springfield', NOW(), NOW(), 'inactive'),
('Ava', 'Thompson', 'ava.thompson@example.com', 'password123', 'buyer', '159 Sycamore St, Springfield', NOW(), NOW(), 'active'),
('David', 'Garcia', 'david.garcia@example.com', 'password123', 'buyer', '753 Poplar Rd, Springfield', NOW(), NOW(), 'inactive'),
('Sofia', 'Martinez', 'sofia.martinez@example.com', 'password123', 'buyer', '951 Willow Dr, Springfield', NOW(), NOW(), 'active');

-- Insert dummy data into `products` table
<<<<<<< HEAD
INSERT INTO `marchina`.`products` (`name`, `description`, `price`, `stock`, `categorie`, `userid`, `createdAt`, `updatedAt`) VALUES
=======
INSERT INTO `marchina`.`users` (`firstName`, `lastName`, `email`, `password`, `role`, `adress`, `createdAt`, `updatedAt`) VALUES
('John', 'Doe', 'john.doe@example.com', 'password123', 'admin', '123 Main St, Springfield', NOW(), NOW()),
('Jane', 'Smith', 'jane.smith@example.com', 'password123', 'user', '456 Elm St, Springfield', NOW(), NOW()),
('Alice', 'Johnson', 'alice.johnson@example.com', 'password123', 'user', '789 Maple Ave, Springfield', NOW(), NOW()),
('Bob', 'Brown', 'bob.brown@example.com', 'password123', 'user', '321 Oak St, Springfield', NOW(), NOW()),
('Emma', 'Wilson', 'emma.wilson@example.com', 'password123', 'user', '654 Pine Rd, Springfield', NOW(), NOW()),
('Michael', 'Taylor', 'michael.taylor@example.com', 'password123', 'user', '987 Cedar Ln, Springfield', NOW(), NOW()),
('Olivia', 'Anderson', 'olivia.anderson@example.com', 'password123', 'user', '147 Birch Dr, Springfield', NOW(), NOW()),
('William', 'Thomas', 'william.thomas@example.com', 'password123', 'user', '258 Walnut Ave, Springfield', NOW(), NOW()),
('Sophia', 'Jackson', 'sophia.jackson@example.com', 'password123', 'user', '369 Cherry St, Springfield', NOW(), NOW()),
('James', 'White', 'james.white@example.com', 'password123', 'user', '741 Ash Rd, Springfield', NOW(), NOW()),
('Emily', 'Harris', 'emily.harris@example.com', 'password123', 'user', '852 Spruce Ln, Springfield', NOW(), NOW()),
('Daniel', 'Martin', 'daniel.martin@example.com', 'password123', 'user', '963 Fir Ave, Springfield', NOW(), NOW()),
('Ava', 'Thompson', 'ava.thompson@example.com', 'password123', 'user', '159 Sycamore St, Springfield', NOW(), NOW()),
('David', 'Garcia', 'david.garcia@example.com', 'password123', 'user', '753 Poplar Rd, Springfield', NOW(), NOW()),
('Sofia', 'Martinez', 'sofia.martinez@example.com', 'password123', 'user', '951 Willow Dr, Springfield', NOW(), NOW());
('John', 'Doe', 'john.doe@example.com', 'password123', 'admin', '123 Main St, Springfield', NOW(), NOW()),
('Jane', 'Smith', 'jane.smith@example.com', 'password123', 'user', '456 Elm St, Springfield', NOW(), NOW()),
('Alice', 'Johnson', 'alice.johnson@example.com', 'password123', 'user', '789 Maple Ave, Springfield', NOW(), NOW()),
('Bob', 'Brown', 'bob.brown@example.com', 'password123', 'user', '321 Oak St, Springfield', NOW(), NOW()),
('Emma', 'Wilson', 'emma.wilson@example.com', 'password123', 'user', '654 Pine Rd, Springfield', NOW(), NOW()),
('Michael', 'Taylor', 'michael.taylor@example.com', 'password123', 'user', '987 Cedar Ln, Springfield', NOW(), NOW()),
('Olivia', 'Anderson', 'olivia.anderson@example.com', 'password123', 'user', '147 Birch Dr, Springfield', NOW(), NOW()),
('William', 'Thomas', 'william.thomas@example.com', 'password123', 'user', '258 Walnut Ave, Springfield', NOW(), NOW()),
('Sophia', 'Jackson', 'sophia.jackson@example.com', 'password123', 'user', '369 Cherry St, Springfield', NOW(), NOW()),
('James', 'White', 'james.white@example.com', 'password123', 'user', '741 Ash Rd, Springfield', NOW(), NOW()),
('Emily', 'Harris', 'emily.harris@example.com', 'password123', 'user', '852 Spruce Ln, Springfield', NOW(), NOW()),
('Daniel', 'Martin', 'daniel.martin@example.com', 'password123', 'user', '963 Fir Ave, Springfield', NOW(), NOW()),
('Ava', 'Thompson', 'ava.thompson@example.com', 'password123', 'user', '159 Sycamore St, Springfield', NOW(), NOW()),
('David', 'Garcia', 'david.garcia@example.com', 'password123', 'user', '753 Poplar Rd, Springfield', NOW(), NOW()),
('Sofia', 'Martinez', 'sofia.martinez@example.com', 'password123', 'user', '951 Willow Dr, Springfield', NOW(), NOW());

-- Insert dummy data into `products` table
INSERT INTO `marchina`.`products` (`name`, `description`, `price`, `stock`, `categorie`, `userid`, `createdAt`, `updatedAt`) VALUES
('4K Ultra HD TV', 'A stunning 4K Ultra HD TV with vibrant colors and crisp details.', 799.99, 50, 'Electronics', 1, NOW(), NOW()),
('Wireless Earbuds', 'Compact and comfortable wireless earbuds with noise-canceling features.', 129.99, 100, 'Accessories', 2, NOW(), NOW()),
('Gaming Laptop', 'High-performance gaming laptop with the latest graphics card and processor.', 1499.99, 30, 'Computers', 1, NOW(), NOW()),
('Smartphone', 'A sleek smartphone with an advanced camera system and fast performance.', 699.99, 75, 'Mobile Phones', 2, NOW(), NOW()),
('Bluetooth Speaker', 'Portable Bluetooth speaker with high-quality sound and long battery life.', 89.99, 150, 'Audio', 3, NOW(), NOW()),
('Smartwatch', 'A stylish smartwatch with health tracking and notification features.', 199.99, 60, 'Wearables', 3, NOW(), NOW()),
('Electric Toothbrush', 'Electric toothbrush with multiple brushing modes and a built-in timer.', 49.99, 200, 'Health & Personal Care', 4, NOW(), NOW()),
('Digital Camera', 'High-resolution digital camera with interchangeable lenses and advanced features.', 499.99, 40, 'Photography', 4, NOW(), NOW()),
('Coffee Maker', 'Programmable coffee maker with multiple brew strengths and thermal carafe.', 79.99, 80, 'Kitchen Appliances', 5, NOW(), NOW()),
('Fitness Tracker', 'Waterproof fitness tracker with heart rate monitoring and sleep tracking.', 59.99, 120, 'Wearables', 6, NOW(), NOW()),
('Robot Vacuum', 'Smart robot vacuum with mapping technology and app control.', 299.99, 45, 'Home Appliances', 7, NOW(), NOW()),
('Wireless Mouse', 'Ergonomic wireless mouse with customizable buttons and long battery life.', 39.99, 200, 'Computer Accessories', 8, NOW(), NOW()),
('Air Purifier', 'HEPA air purifier for large rooms with air quality sensor.', 179.99, 60, 'Home Appliances', 9, NOW(), NOW()),
('External SSD', 'Fast and portable external SSD with 1TB storage capacity.', 149.99, 100, 'Computer Accessories', 10, NOW(), NOW()),
('Smart Thermostat', 'Wi-Fi enabled smart thermostat with energy-saving features.', 129.99, 75, 'Smart Home', 11, NOW(), NOW()),
('Wireless Keyboard', 'Slim wireless keyboard with backlit keys and multi-device support.', 69.99, 150, 'Computer Accessories', 12, NOW(), NOW()),
('Blender', 'High-powered blender for smoothies, soups, and more.', 89.99, 90, 'Kitchen Appliances', 13, NOW(), NOW()),
('Portable Charger', '20000mAh portable charger with fast charging capabilities.', 49.99, 200, 'Mobile Accessories', 14, NOW(), NOW()),
('Smart Light Bulbs', 'Color-changing smart light bulbs compatible with voice assistants.', 34.99, 300, 'Smart Home', 15, NOW(), NOW()),
('Noise-Canceling Headphones', 'Over-ear noise-canceling headphones with premium sound quality.', 249.99, 50, 'Audio', 1, NOW(), NOW());
>>>>>>> f2b36e80e0e722e0e498f0eabe6a3612d1941035
('4K Ultra HD TV', 'A stunning 4K Ultra HD TV with vibrant colors and crisp details.', 799.99, 50, 'Electronics', 1, NOW(), NOW()),
('Wireless Earbuds', 'Compact and comfortable wireless earbuds with noise-canceling features.', 129.99, 100, 'Accessories', 2, NOW(), NOW()),
('Gaming Laptop', 'High-performance gaming laptop with the latest graphics card and processor.', 1499.99, 30, 'Computers', 1, NOW(), NOW()),
('Smartphone', 'A sleek smartphone with an advanced camera system and fast performance.', 699.99, 75, 'Mobile Phones', 2, NOW(), NOW()),
('Bluetooth Speaker', 'Portable Bluetooth speaker with high-quality sound and long battery life.', 89.99, 150, 'Audio', 3, NOW(), NOW()),
('Smartwatch', 'A stylish smartwatch with health tracking and notification features.', 199.99, 60, 'Wearables', 3, NOW(), NOW()),
('Electric Toothbrush', 'Electric toothbrush with multiple brushing modes and a built-in timer.', 49.99, 200, 'Health & Personal Care', 4, NOW(), NOW()),
('Digital Camera', 'High-resolution digital camera with interchangeable lenses and advanced features.', 499.99, 40, 'Photography', 4, NOW(), NOW()),
('Coffee Maker', 'Programmable coffee maker with multiple brew strengths and thermal carafe.', 79.99, 80, 'Kitchen Appliances', 5, NOW(), NOW()),
('Fitness Tracker', 'Waterproof fitness tracker with heart rate monitoring and sleep tracking.', 59.99, 120, 'Wearables', 6, NOW(), NOW()),
('Robot Vacuum', 'Smart robot vacuum with mapping technology and app control.', 299.99, 45, 'Home Appliances', 7, NOW(), NOW()),
('Wireless Mouse', 'Ergonomic wireless mouse with customizable buttons and long battery life.', 39.99, 200, 'Computer Accessories', 8, NOW(), NOW()),
('Air Purifier', 'HEPA air purifier for large rooms with air quality sensor.', 179.99, 60, 'Home Appliances', 9, NOW(), NOW()),
('External SSD', 'Fast and portable external SSD with 1TB storage capacity.', 149.99, 100, 'Computer Accessories', 10, NOW(), NOW()),
('Smart Thermostat', 'Wi-Fi enabled smart thermostat with energy-saving features.', 129.99, 75, 'Smart Home', 11, NOW(), NOW()),
('Wireless Keyboard', 'Slim wireless keyboard with backlit keys and multi-device support.', 69.99, 150, 'Computer Accessories', 12, NOW(), NOW()),
('Blender', 'High-powered blender for smoothies, soups, and more.', 89.99, 90, 'Kitchen Appliances', 13, NOW(), NOW()),
('Portable Charger', '20000mAh portable charger with fast charging capabilities.', 49.99, 200, 'Mobile Accessories', 14, NOW(), NOW()),
('Smart Light Bulbs', 'Color-changing smart light bulbs compatible with voice assistants.', 34.99, 300, 'Smart Home', 15, NOW(), NOW()),
('Noise-Canceling Headphones', 'Over-ear noise-canceling headphones with premium sound quality.', 249.99, 50, 'Audio', 1, NOW(), NOW());

-- Insert dummy data into `images` table
INSERT INTO `marchina`.`images` (`imageurl`, `productid`, `createdAt`, `updatedAt`) VALUES
<<<<<<< HEAD
('https://tinyurl.com/53kmt8wk', 1, NOW(), NOW()),
=======
('https://i.pinimg.com/236x/bf/46/83/bf4683927abe7fcff5943d36eadc38b1.jpg', 1, NOW(), NOW()),
('https://picsum.photos/200/300?random=1', 1, NOW(), NOW()),
('https://picsum.photos/200/300?random=2', 1, NOW(), NOW()),
('https://picsum.photos/200/300?random=3', 1, NOW(), NOW()),
('https://picsum.photos/200/300?random=4', 1, NOW(), NOW()),

>>>>>>> f2b36e80e0e722e0e498f0eabe6a3612d1941035
('https://i.pinimg.com/474x/f8/e5/7d/f8e57da0d7212bcd9964e9f9d6c176f1.jpg', 2, NOW(), NOW()),
('https://i.pinimg.com/236x/15/57/ee/1557eea27c5464d66cf473626581d375.jpg', 3, NOW(), NOW()),
('https://i.pinimg.com/236x/26/be/56/26be56634ad9773c9d8f6315cac2cba7.jpg', 4, NOW(), NOW()),
('https://i.pinimg.com/236x/ca/da/16/cada163f9677583b8b2cbea353fbf840.jpg', 5, NOW(), NOW()),
('https://i.pinimg.com/236x/9b/f5/52/9bf55229275659bf3c089fd2e3375f7f.jpg', 6, NOW(), NOW()),
('https://i.pinimg.com/236x/d0/31/57/d031577b602ddbb4dddf2bdae414c1e2.jpg', 7, NOW(), NOW()),
('https://i.pinimg.com/236x/91/15/5f/91155fd0eacabb90941b03893966ba09.jpg', 8, NOW(), NOW()),
('https://i.pinimg.com/236x/48/66/14/48661430941e4eedbb6f02cb43e69748.jpg', 9, NOW(), NOW()),
('https://i.pinimg.com/236x/48/af/12/48af129c5a11d4b4a60ed99301ea00ab.jpg', 10, NOW(), NOW()),
('https://i.pinimg.com/236x/f7/ca/bf/f7cabfd0387fe6d6136d145234521587.jpg', 11, NOW(), NOW()),
('https://i.pinimg.com/236x/10/91/33/1091338b70475c9e85e73f9bdf1bbda8.jpg', 12, NOW(), NOW()),
('https://i.pinimg.com/236x/87/26/17/872617ef006438c5e91480819f86c630.jpg', 13, NOW(), NOW()),
('https://i.pinimg.com/236x/df/0c/05/df0c052e658bc90fe6d2e25f6e69c0b9.jpg', 14, NOW(), NOW()),
('https://i.pinimg.com/236x/c6/bc/10/c6bc1030e55269382e4ec8dddfa6590e.jpg', 15, NOW(), NOW()),
('https://i.pinimg.com/736x/3d/78/c7/3d78c71b0f5657e6514a71c1a385a901.jpg', 16, NOW(), NOW()),
('https://i.pinimg.com/236x/8e/56/79/8e567935daa4d66d04bfdb52ed19410e.jpg', 17, NOW(), NOW()),
('https://i.pinimg.com/236x/5d/79/c0/5d79c0b7994fdb428c61d3f447d41e84.jpg', 18, NOW(), NOW()),
('https://i.pinimg.com/236x/a6/bd/d0/a6bdd0b341dfe15c247bc8a49cade9dd.jpg', 19, NOW(), NOW()),
('https://i.pinimg.com/236x/e8/4a/4f/e84a4f3a426513a7858e86346994f551.jpg', 20, NOW(), NOW());

-- Insert dummy data into `carts` table
INSERT INTO `marchina`.`carts` (`productid`, `userid`, `createdAt`, `updatedAt`) VALUES
(1, 1, NOW(), NOW()), (2, 2, NOW(), NOW()), (3, 3, NOW(), NOW()),
(4, 4, NOW(), NOW()), (5, 5, NOW(), NOW()), (6, 6, NOW(), NOW()),
(7, 7, NOW(), NOW()), (8, 8, NOW(), NOW()), (9, 9, NOW(), NOW()),
(10, 10, NOW(), NOW()), (11, 11, NOW(), NOW()), (12, 12, NOW(), NOW()),
(13, 13, NOW(), NOW()), (14, 14, NOW(), NOW()), (15, 15, NOW(), NOW()),
(16, 1, NOW(), NOW()), (17, 2, NOW(), NOW()), (18, 3, NOW(), NOW()),
(19, 4, NOW(), NOW()), (20, 5, NOW(), NOW());

-- Insert dummy data into `ratings` table
INSERT INTO `marchina`.`ratings` (`rating`, `productid`, `userid`, `createdAt`, `updatedAt`) VALUES
<<<<<<< HEAD
=======
(5, 1, 1, NOW(), NOW()), (4, 2, 2, NOW(), NOW()), (3, 3, 3, NOW(), NOW()),
(5, 4, 4, NOW(), NOW()), (4, 5, 5, NOW(), NOW()), (5, 6, 6, NOW(), NOW()),
(3, 7, 7, NOW(), NOW()), (4, 8, 8, NOW(), NOW()), (5, 9, 9, NOW(), NOW()),
(4, 10, 10, NOW(), NOW()), (3, 11, 11, NOW(), NOW()), (5, 12, 12, NOW(), NOW()),
(4, 13, 13, NOW(), NOW()), (5, 14, 14, NOW(), NOW()), (3, 15, 15, NOW(), NOW()),
(4, 16, 1, NOW(), NOW()), (5, 17, 2, NOW(), NOW()), (3, 18, 3, NOW(), NOW()),
(4, 19, 4, NOW(), NOW()), (5, 20, 5, NOW(), NOW());
>>>>>>> f2b36e80e0e722e0e498f0eabe6a3612d1941035
(5, 1, 1, NOW(), NOW()), (4, 2, 2, NOW(), NOW()), (3, 3, 3, NOW(), NOW()),
(5, 4, 4, NOW(), NOW()), (4, 5, 5, NOW(), NOW()), (5, 6, 6, NOW(), NOW()),
(3, 7, 7, NOW(), NOW()), (4, 8, 8, NOW(), NOW()), (5, 9, 9, NOW(), NOW()),
(4, 10, 10, NOW(), NOW()), (3, 11, 11, NOW(), NOW()), (5, 12, 12, NOW(), NOW()),
(4, 13, 13, NOW(), NOW()), (5, 14, 14, NOW(), NOW()), (3, 15, 15, NOW(), NOW()),
(4, 16, 1, NOW(), NOW()), (5, 17, 2, NOW(), NOW()), (3, 18, 3, NOW(), NOW()),
(4, 19, 4, NOW(), NOW()), (5, 20, 5, NOW(), NOW());

-- Insert dummy data into `wishlists` table
INSERT INTO `marchina`.`wishlists` (`productid`, `userid`, `createdAt`, `updatedAt`) VALUES
<<<<<<< HEAD
=======
(1, 1, NOW(), NOW()), (2, 2, NOW(), NOW()), (3, 3, NOW(), NOW()),
(4, 4, NOW(), NOW()), (5, 5, NOW(), NOW()), (6, 6, NOW(), NOW()),
(7, 7, NOW(), NOW()), (8, 8, NOW(), NOW()), (9, 9, NOW(), NOW()),
(10, 10, NOW(), NOW()), (11, 11, NOW(), NOW()), (12, 12, NOW(), NOW()),
(13, 13, NOW(), NOW()), (14, 14, NOW(), NOW()), (15, 15, NOW(), NOW()),
(16, 1, NOW(), NOW()), (17, 2, NOW(), NOW()), (18, 3, NOW(), NOW()),
(19, 4, NOW(), NOW()), (20, 5, NOW(), NOW());
>>>>>>> f2b36e80e0e722e0e498f0eabe6a3612d1941035
(1, 1, NOW(), NOW()), (2, 2, NOW(), NOW()), (3, 3, NOW(), NOW()),
(4, 4, NOW(), NOW()), (5, 5, NOW(), NOW()), (6, 6, NOW(), NOW()),
(7, 7, NOW(), NOW()), (8, 8, NOW(), NOW()), (9, 9, NOW(), NOW()),
(10, 10, NOW(), NOW()), (11, 11, NOW(), NOW()), (12, 12, NOW(), NOW()),
(13, 13, NOW(), NOW()), (14, 14, NOW(), NOW()), (15, 15, NOW(), NOW()),
(16, 1, NOW(), NOW()), (17, 2, NOW(), NOW()), (18, 3, NOW(), NOW()),
(19, 4, NOW(), NOW()), (20, 5, NOW(), NOW());