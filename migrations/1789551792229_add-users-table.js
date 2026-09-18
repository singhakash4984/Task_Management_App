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
    pgm.createExtension('pgcrypto',{
        ifNotExists:true
    }) ;
    pgm.createExtension('citext',{
        ifNotExists:true
    }) ;

    pgm.createType('user_role',['ADMIN','CLIENT']) ;

    pgm.createTable('users',{
        id:{
            type:'uuid',
            primaryKey:true,
            default:pgm.func('gen_random_uuid()')
        },

        email:{
            type: 'citext',
            notNull: true,
            unique: true,
        },

        password_hash: {
            type: 'text',
            notNull:true,
        },
        role: {
            type:'user_role',
            notNull: true,
            default:'CLIENT'
        },
        avatar_url: {
            type:'text',
            notNull:false
        },
        failed_login_attempts: {
            type: 'integer',
            notNull:true,
            default: 0,
            check: 'failed_login_attempts >= 0'
        },
        locked_until: {
            type: 'timestamptz',
            notNull: false
        },
        created_at :{
            type: 'timestamptz',
            notNull: true,
            default: pgm.func('now()') 
        },
        updated_at :{
            type: 'timestamptz',
            notNull: true,
            default: pgm.func('now()') 
        },
    })
   
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable('users') ;
    pgm.dropType('user_role') ;
};
