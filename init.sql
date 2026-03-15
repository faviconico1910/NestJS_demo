-- Tạo bảng Roles
CREATE TABLE IF NOT EXISTS roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(20) UNIQUE NOT NULL
);

-- Tạo bảng Users
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tạo bảng trung gian User_Roles
CREATE TABLE IF NOT EXISTS user_roles (
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    role_id INT REFERENCES roles(role_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

-- apply seed data

-- Chèn các Role cơ bản
INSERT INTO roles (role_name) VALUES 
('User'), 
('Admin')
ON CONFLICT (role_name) DO NOTHING;

INSERT INTO users (username, password, email) VALUES 
('admin', 'hard', '23521179@gm.uit.edu.vn'),
('john', 'changeme', 'phannguyenkieumy123@gmail.com'),
('maria', 'guess', 'dauducanphu1910@gmail.com')
ON CONFLICT (username) DO NOTHING;

-- gán quyền cho các user

INSERT INTO user_roles (user_id, role_id) 
VALUES (
    (SELECT user_id FROM users WHERE username = 'admin'), 
    (SELECT role_id FROM roles WHERE role_name = 'Admin')
) ON CONFLICT DO NOTHING;

INSERT INTO user_roles (user_id, role_id) 
VALUES (
    (SELECT user_id FROM users WHERE username = 'john'), 
    (SELECT role_id FROM roles WHERE role_name = 'User')
) ON CONFLICT DO NOTHING;

INSERT INTO user_roles (user_id, role_id) 
VALUES (
    (SELECT user_id FROM users WHERE username = 'maria'), 
    (SELECT role_id FROM roles WHERE role_name = 'User')
) ON CONFLICT DO NOTHING;