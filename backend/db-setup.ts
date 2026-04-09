import { getPool, sql } from './src/config/database';
import bcrypt from 'bcrypt';

async function setup() {
    try {
        console.log('--- Iniciando Validación de Base de Datos ---');
        const pool = await getPool();

        // 1. Ver qué columnas tiene la tabla Users si existe
        const tableCheck = await pool.request().query(`
            SELECT COLUMN_NAME 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_NAME = 'Users'
        `);

        if (tableCheck.recordset.length === 0) {
            console.log('Creando tabla [Users]...');
            await pool.request().query(`
                CREATE TABLE Users (
                    id INT IDENTITY PRIMARY KEY,
                    name NVARCHAR(100) NOT NULL,
                    email NVARCHAR(100) UNIQUE NOT NULL,
                    password NVARCHAR(MAX) NOT NULL,
                    role NVARCHAR(20) DEFAULT 'employee',
                    createdAt DATETIME2 DEFAULT GETDATE()
                );
            `);
            console.log('✅ Tabla [Users] creada.');
        } else {
            console.log('ℹ️ Tabla [Users] ya existe. Columnas encontradas:', tableCheck.recordset.map(c => c.COLUMN_NAME).join(', '));
            
            const columns = tableCheck.recordset.map(c => c.COLUMN_NAME.toLowerCase());
            
            // Si la tabla tiene nombres de columnas diferentes (posiblemente de un reto anterior)
            // Vamos a normalizarla a lo que espera nuestra App actual
            if (columns.includes('username') && !columns.includes('name')) {
                console.log('Renombrando [username] a [name]...');
                await pool.request().query("EXEC sp_rename 'Users.username', 'name', 'COLUMN'");
            }
            if (columns.includes('password_hash') && !columns.includes('password')) {
                console.log('Renombrando [password_hash] a [password]...');
                await pool.request().query("EXEC sp_rename 'Users.password_hash', 'password', 'COLUMN'");
            }
            if (columns.includes('created_at') && !columns.includes('createdat')) {
                console.log('Renombrando [created_at] a [createdat]...');
                await pool.request().query("EXEC sp_rename 'Users.created_at', 'createdAt', 'COLUMN'");
            }
            
            // Añadir columnas faltantes
            if (!columns.includes('role')) {
                console.log('Añadiendo columna [role]...');
                await pool.request().query("ALTER TABLE Users ADD role NVARCHAR(20) DEFAULT 'employee'");
            }
            if (!columns.includes('createdat') && !columns.includes('created_at')) {
                console.log('Añadiendo columna [createdAt]...');
                await pool.request().query("ALTER TABLE Users ADD createdAt DATETIME2 DEFAULT GETDATE()");
            }
        }

        // 2. Crear Usuario Admin Inicial (si no hay ninguno)
        const userCount = await pool.request().query('SELECT COUNT(*) as count FROM Users');
        if (userCount.recordset[0].count === 0) {
            console.log('Creando usuario administrador inicial...');
            const hashedPassword = await bcrypt.hash('Admin123!', 10);
            await pool.request()
                .input('name', sql.NVarChar, 'Admin BrandStock')
                .input('email', sql.NVarChar, 'admin@brandstock.com')
                .input('password', sql.NVarChar, hashedPassword)
                .input('role', sql.NVarChar, 'admin')
                .query(`
                    INSERT INTO Users (name, email, password, role)
                    VALUES (@name, @email, @password, @role)
                `);
            console.log('✅ Usuario Admin creado: admin@brandstock.com / Admin123!');
        } else {
            console.log('ℹ️ Ya existen usuarios en la base de datos.');
        }

        console.log('--- Validación completada con éxito ---');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error durante el setup:', err);
        process.exit(1);
    }
}

setup();
