const {PHASE_DEVELOPMENT_SERVER} = require('next/constants')

module.exports = (phase) => {

    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return{
            env: {
                mongodb_username: 'omotosho521',
                mongodb_password: 'omotosho521',
                mongodb_cluster: 'cluster0',
                mongodb_database: 'myapp'
            }

        };
    }


    return {
        env: {
        mongodb_username: 'omotosho521',
        mongodb_password: 'omotosho521',
        mongodb_cluster: 'cluster0',
        mongodb_database: 'myapp'
    }
    }
    
};