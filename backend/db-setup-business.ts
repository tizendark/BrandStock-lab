import { getPool, sql } from './src/config/database';

async function setupBusinessTables() {
    try {
        console.log('--- Creando Tablas de Negocio Faltantes ---');
        const pool = await getPool();

        // 1. Tabla Categories
        console.log('Verificando tabla [Categories]...');
        await pool.request().query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Categories')
            BEGIN
                CREATE TABLE Categories (
                    id INT IDENTITY PRIMARY KEY,
                    name NVARCHAR(50) UNIQUE NOT NULL,
                    created_at DATETIME2 DEFAULT GETDATE()
                );
                INSERT INTO Categories (name) VALUES ('Electrónica'), ('Hogar'), ('Ropa'), ('Alimentos');
                PRINT '✅ Tabla [Categories] creada con datos iniciales.';
            END
        `);

        // 2. Tabla Products
        console.log('Verificando tabla [Products]...');
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
                PRINT '✅ Tabla [Products] creada.';
            END
        `);

        // 3. Tabla Movements
        console.log('Verificando tabla [Movements]...');
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
                PRINT '✅ Tabla [Movements] creada.';
            END
        `);

        console.log('\n--- Configuración de tablas completada ---');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error durante la creación de tablas:', err);
        process.exit(1);
    }
}

setupBusinessTables();
