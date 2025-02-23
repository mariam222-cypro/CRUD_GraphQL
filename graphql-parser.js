const DB = require("./database");

function parseGraphQLQuery(query) {
    if (query.startsWith('query')) {
        query = query.replace('query ', '')

        if(query.startsWith('getUsers')) {
            return {
                status: 'success',
                payload: DB.get('users')
            }
        }
        
        if(query.startsWith('getUser')) {
            // convert arguments to object

            args = query.substring(query.indexOf('(')+1, query.length-1)

            const pairs = args.split(',').map(pair => pair.trim());

            const obj = {};
            
            pairs.forEach(pair => {
              const [key, value] = pair.split(':').map(part => part.trim());
              obj[key] = value
            })

            console.log(obj)

            if(!('id' in obj)) {
                return {
                    status: 'error',
                    message: 'user id is not found'
                }
            }

            return {
                status: 'success',
                payload: DB.get('users', obj['id'])
            }
        }

    } else if (query.startsWith('mutation')) {
        query = query.replace('mutation ', '')

        // convert arguments to object
        
        args = query.substring(query.indexOf('(')+1, query.length-1)

        const pairs = args.split(',').map(pair => pair.trim());

        const obj = {};
        
        pairs.forEach(pair => {
            const [key, value] = pair.split(':').map(part => part.trim());
            obj[key] = value
        })

        if(query.startsWith('createUser')) {
            if(!('email' in obj)) {
                return {
                    status: 'error',
                    message: 'email is not found'
                }
            }

            if(!('name' in obj)) {
                return {
                    status: 'error',
                    message: 'name is not found'
                }
            }

            return {
                status: 'success',
                payload: DB.create('users', obj['name'], obj['email'])
            }
        }

        if(query.startsWith('updateUser')) {
            if(!('id' in obj)) {
                return {
                    status: 'error',
                    message: 'user id is required'
                }
            }

            if(!('name' in obj) && !('email' in obj)) {
                return {
                    status: 'error',
                    message: 'name or email are required.'
                }
            }

            console.log(obj)
            console.log(obj['id'])

            console.log(obj['email'])
            return {
                status: 'success',
                payload: DB.update('users', obj['id'], obj['name'] ?? null, obj['email'] ?? null)
            }
        }

        if(query.startsWith('deleteUser')) {
            if(!('id' in obj)) {
                return {
                    status: 'error',
                    message: 'user id is required'
                }
            }

            return {
                status: 'success',
                payload: DB.destroy('users', obj['id'])
            }
        }
    }

    return {
        status: "failed",
        message: "invalid query",
        query: query
    }
}

module.exports = parseGraphQLQuery;