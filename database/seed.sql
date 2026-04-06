INSERT INTO users (name, email, password, role)
SELECT 'System Admin', 'admin@attendai.com', '$2a$10$vY35Uu7Q.Lh/uN8tP/N14O.8V0n3H1fO70.K6w48v5H.g.zV54/5q', 'ADMIN'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email='admin@attendai.com');

INSERT INTO subjects (id, subject_name)
SELECT 1, 'Data Structures'
WHERE NOT EXISTS (SELECT 1 FROM subjects WHERE id=1);

INSERT INTO subjects (id, subject_name)
SELECT 2, 'Machine Learning'
WHERE NOT EXISTS (SELECT 1 FROM subjects WHERE id=2);

UPDATE users
SET password = '$2a$10$vY35Uu7Q.Lh/uN8tP/N14O.8V0n3H1fO70.K6w48v5H.g.zV54/5q'
WHERE email = 'admin@attendai.com';
