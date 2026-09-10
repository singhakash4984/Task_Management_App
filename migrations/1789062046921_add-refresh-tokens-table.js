/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.addExtension('pgcrypto', {
        ifNotExists: true
    });

        pgm.createTable('refresh_tokens', {
            id: {
                type: 'uuid',
                primaryKey: true,
                default: pgm.func('gen_random_uuid()')
            },
            user_id: {
                type: 'uuid',
                notNull: true,
                references: '"users"',
                onDelete: 'CASCADE'
            },
            token_hash: {
                type: 'text',
                notNull: true
            },
            expires_at: {
                type: 'timestamptz',
                notNull: true,
            },
            revoked: {
                type: 'boolean',
                notNull: true,
                default: false
            },
            created_at: {
                type: 'timestamptz',
                notNull: true,
                default: pgm.func('now()')
            }


        }) ;

    pgm.createIndex('refresh_tokens', 'token_hash');

    pgm.createIndex('refresh_tokens', 'user_id');

};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable('refresh_tokens')
};
