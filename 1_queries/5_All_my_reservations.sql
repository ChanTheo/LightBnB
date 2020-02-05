SELECT *, (reservations.*) 
FROM properties
JOIN reservations ON properties.id = property_id
JOIN users ON users.id = reservations.guest_id
WHERE reservations.end_date < now()::date 
AND users.id = '1'
ORDER BY reservations.start_date DESC
LIMIT 10;