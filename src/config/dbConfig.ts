const dbConfig = {
  host: "127.0.0.1",
  user: "test",
  password: "password",
  database: "crawler",
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
};

export default dbConfig;
