import { getPool, sql } from './src/config/database';
import bcrypt from 'bcrypt';

async function checkUser() {
    try {
        const pool = await getPool();
        const email = 'admin@brandstock.com';
        
        console.log(`Buscando usuario: ${email}...`);
        const result = await pool.request()
            .input('email', sql.NVarChar, email)
            .query('SELECT * FROM Users WHERE email = @email');

        if (result.recordset.length > 0) {
            const user = result.recordset[0];
            console.log('✅ Usuario encontrado:', {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            });
            
            // Forzar actualización de password para estar seguros
            const newPassword = 'Admin123!';
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await pool.request()
                .input('email', sql.NVarChar, email)
                .input('password', sql.NVarChar, hashedPassword)
                .query('UPDATE Users SET password = @password WHERE email = @email');
            
            console.log(`✅ Password actualizado a: ${newPassword}`);
        } else {
            console.log('❌ Usuario no encontrado. Creándolo de nuevo...');
            const hashedPassword = await bcrypt.hash('Admin123!', 10);
            await pool.request()
                .input('name', sql.NVarChar, 'Admin BrandStock')
                .input('email', sql.NVarChar, email)
                .input('password', sql.NVarChar, hashedPassword)
                .input('role', sql.NVarChar, 'admin')
                .query(`
                    INSERT INTO Users (name, email, password, role)
                    VALUES (@name, @email, @password, @role)
                `);
            console.log('✅ Usuario Admin creado: admin@brandstock.com / Admin123!');
        }
        process.exit(0);
    } catch (err) {
        console.error('❌ Error:', err);
        process.exit(1);
    }
}

checkUser();
