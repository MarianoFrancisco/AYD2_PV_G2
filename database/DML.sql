INSERT INTO users (id, name, rol, cui, email, phone, pin)
VALUES (
        1,
        'Mariano Camposeco',
        'Encargado',
        '1234567890123',
        'mariano.camposeco@test.com',
        '5551234567',
        '123456'
    ),
    (
        2,
        'Jose Ceron',
        'Encargado',
        '9876543210987',
        'jose.ceron@test.com',
        '5559876543',
        '123456'
    ),
    (
        3,
        'Luis Garcia',
        'Encargado',
        '1122334455667',
        'luis.garcia@test.com',
        '5551122334',
        '123456'
    ),
    (
        4,
        'David Lux',
        'Cliente',
        '2233445566778',
        'david.lopez@test.com',
        '5553344556',
        '123456'
    ),
    (
        5,
        'Christofher Saquilmer',
        'Cliente',
        '3344556677889',
        'christofher.saquilmer@test.com',
        '5554455667',
        '123456'
    );
INSERT INTO accounts (id, user_id, account_number, balance, created_at)
VALUES (1, 2, '1000000001', 1500.00, 1707357600),
    -- 2024-12-07 10:00:00 UTC
    (2, 3, '1000000002', 2500.00, 1707361200),
    -- 2024-12-07 11:00:00 UTC
    (3, 1, '1000000003', 10000.00, 1707364800),
    -- 2024-12-07 12:00:00 UTC
    (4, 4, '1000000004', 500.00, 1707368400),
    -- 2024-12-07 13:00:00 UTC
    (5, 5, '1000000005', 8000.00, 1707372000);
INSERT INTO loans (
        id,
        user_id,
        account_id,
        total_amount,
        remaining_balance,
        created_at
    )
VALUES (1, 2, 1, 5000.00, 2500.00, 1707375600),
    -- 2024-12-07 15:00:00 UTC
    (2, 3, 2, 3000.00, 1000.00, 1707379200),
    -- 2024-12-07 16:00:00 UTC
    (3, 4, 4, 2000.00, 500.00, 1707382800),
    -- 2024-12-07 17:00:00 UTC
    (4, 5, 5, 10000.00, 7000.00, 1707386400);
-- 2024-12-07 18:00:0