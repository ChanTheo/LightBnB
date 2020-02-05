INSERT INTO users (name, email, password)
VALUES ('YoonSoon', 'YoonSoon@lighthouse.ca','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Camillo', 'Camillo@lighthouse.ca', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Fred', 'Fred@lighthouse.ca', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 'Apartment 200', 'description', 'https://www.resident360.com/wp-content/uploads/2019/03/Anthology-1.jpg', 'https://www.resident360.com/wp-content/uploads/2019/03/Anthology-1.jpg', 100, 2, 4, 5, 'Canada','St Laurent', 'Montreal', 'Quebec', 'L9H 6Y2', true),
(2, 'Apartment 201', 'description', 'https://www.resident360.com/wp-content/uploads/2019/03/Anthology-1.jpg', 'https://www.resident360.com/wp-content/uploads/2019/03/Anthology-1.jpg', 100, 2, 4, 5, 'Canada','St Laurent', 'Montreal', 'Quebec', 'L9H 6Y2', true),
(3, 'Apartment 202', 'description', 'https://www.resident360.com/wp-content/uploads/2019/03/Anthology-1.jpg', 'https://www.resident360.com/wp-content/uploads/2019/03/Anthology-1.jpg', 100, 2, 4, 5, 'Canada','St Laurent', 'Montreal', 'Quebec', 'L9H 6Y2', true);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES('2018-9-11', '2018-9-20', 3, 1),
('2019-9-11', '2019-9-20', 2, 2),
('2020-9-11', '2020-9-20', 1, 3);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (1,1, 9, 4, 'message'),
(3,2, 8, 2, 'message'),
(4,3, 7, 5, 'message');