import { getPool, sql } from './src/config/database';

async function forceSetup() {
    try {
        console.log('--- Forzando Creación de Tablas ---');
        const pool = await getPool();

        // 1. Categories
        console.log('Creando [Categories]...');
        await pool.request().query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Categories')
            BEGIN
                CREATE TABLE Categories (
                    id INT IDENTITY PRIMARY KEY,
                    name NVARCHAR(50) UNIQUE NOT NULL,
                    created_at DATETIME2 DEFAULT GETDATE()
                );
                INSERT INTO Categories (name) VALUES ('Electrónica'), ('Hogar'), ('Ropa'), ('Alimentos');
            END
        `);

        // 2. Products
        console.log('Creando [Products]...');
        await pool.request().query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Products')
            BEGIN
                CREATE TABLE Products (
                    id INT IDENTITY PRIMARY KEY,
                    name NVARCHAR(100) NOT NULL,
                    sku NVARCHAR(50) UNIQUE NOT NULL,
                    description NVARCHAR(MAX),
                    category NVARCHAR(50) NOT NULL,
                    price DECIMAL(18,2) NOT NULL,
                    stock INT DEFAULT 0,
                    minStock INT DEFAULT 10,
                    status NVARCHAR(20) DEFAULT 'active',
                    createdAt DATETIME2 DEFAULT GETDATE()
                );
            END
        `);

        // 3. Movements
        console.log('Creando [Movements]...');
        await pool.request().query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Movements')
            BEGIN
                CREATE TABLE Movements (
                    id INT IDENTITY PRIMARY KEY,
                    productId INT NOT NULL,
                    type NVARCHAR(10) NOT NULL CHECK (type IN ('in', 'out')),
                    quantity INT NOT NULL,
                    reason NVARCHAR(50) NOT NULL,
                    notes NVARCHAR(MAX),
                    userId INT NOT NULL,
                    createdAt DATETIME2 DEFAULT GETDATE(),
                    FOREIGN KEY (productId) REFERENCES Products(id),
                    FOREIGN KEY (userId) REFERENCES Users(id)
                );
            END
        `);

        console.log('✅ Tablas creadas/verificadas.');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error:', err);
        process.exit(1);
    }
}

forceSetup();
