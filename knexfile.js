// Update with your config settings.

module.exports = {
    development: {
        client: "sqlite3",
        useNullAsDefault: true,
        connection: {
            filename: "./data/lessons.db3",
        },
        pool: {
            afterCreate: (conn, done) => {
                conn.run("PRAGMA foreign_key = ON", done);
            },
        },
    },
    production: {
        consString:
            "postgres://ardoiorbgvawnz:dc78eb2ef6aa2871b6c8b05fbf6140ceffcb64fe6d7cfc90fdda87f45775f093@ec2-54-155-208-5.eu-west-1.compute.amazonaws.com:5432/d34sd3pchiqk2o",
        client: "pg",
        connection: process.env.DATABASE_URL,
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tablename: "knex_migrations",
            directory: "./migrations",
        },
    },
};
