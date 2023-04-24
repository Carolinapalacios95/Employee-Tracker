INSERT INTO departments (name)
VALUES  ("Sales"),
        ("Legal"),
        ("Finance"),
        ("Engineering");

INSERT INTO roles (title, salary, department_id)
VALUES  ("Sales Lead", 10000, 1),
        ("Salesperson", 8000, 1),
        ("Lead Engineer", 150000, 4),
        ("Software Engineer", 120000, 4),
        ("Account Manager", 160000, 3),
        ("Accountant", 125000, 3),
        ("Legal Team Lead", 200000, 2),
        ("Lawyer", 175000, 2);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ("John", "Doe", 1, NULL),
        ("Mike", "Chan", 2, 1),
        ("Ashley", "Rodriguez", 3, NULL),
        ("Kevin", "Tupik", 4, 3),
        ("Kunal", "Singh", 5, NULL),
        ("Malia", "Brown", 6, 5),
        ("Sarah", "Lourd", 7, NULL),
        ("Tom", "Allen", 8, 7);