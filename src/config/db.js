const sql = require('mssql');

const config = {
    user: 'usr_polimusic_gr1',
    password: 'Politecnica1',
    server: 'localhost',
    database: 'BDD_PoliMusic_GR1',
    options: {
        encrypt: false, // Cambia a true si usas Azure
        trustServerCertificate: true // Para desarrollo local
    }
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Conectado a SQL Server');
        return pool;
    })
    .catch(err => console.log('Error de conexión a la base de datos:', err));

module.exports = {
    sql, poolPromise
};