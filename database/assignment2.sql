INSERT INTO account (account_firstname, account_lastname, account_email, account_password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

UPDATE account
SET account_type = 'Admin'
WHERE account_id = 1;

DELETE FROM account
WHERE account_id = 1;

UPDATE inventory
SET inv_description = REPLACE(inv_description, 'small', 'huge')
WHERE inv_id = 10;

SELECT inv_make, inv_model, c.classification_name
FROM inventory AS i
INNER JOIN classification AS c ON i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';

UPDATE inventory
SET inv_image = replace(inv_image, '/images/', '/images/vehicles/'),
inv_thumbnail = replace(inv_thumbnail, '/images/', '/images/vehicles/');