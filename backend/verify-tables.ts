import { getPool, sql } from './src/config/database';

async function verifyTables() {
    try {
        console.log('--- Verificando Integridad de Tablas de Negocio ---');
        const pool = await getPool();

        const tables = ['Products', 'Movements', 'Categories'];
        
        for (const tableName of tables) {
            console.log(`\nRevisando tabla [${tableName}]...`);
            const columns = await pool.request().query(`
                SELECT COLUMN_NAME, DATA_TYPE 
                FROM INFORMATION_SCHEMA.COLUMNS 
                WHERE TABLE_NAME = '${tableName}'
            `);

            if (columns.recordset.length === 0) {
                console.log(`❌ Tabla [${tableName}] NO existe.`);
            } else {
                console.log(`✅ Tabla [${tableName}] existe. Columnas:`, columns.recordset.map(c => c.COLUMN_NAME).join(', '));
            }
        }

        console.log('\n--- Fin de Verificación ---');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error durante la verificación:', err);
        process.exit(1);
    }
}

verifyTables();
