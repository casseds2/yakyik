import superagent from 'superagent'

export default {

    get: (url, params, callback) => {
        superagent
        .get(url)
        .query(params)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) {
                callback(err, null)
                return
            }
            const confirmation = response.body.confirmation
            if(confirmation != 'success'){
                callback({message: response.body.message}, null)
                return
            }
            callback(null, response.body)
        })
    },

    post: (url, body, callback) => {
        superagent
        .post(url)
        .send(body)
        .set('Accept', 'application/JSON')
        .end((err, response) => {
            if(err){
                callback(err, null)
                return
            }
            const confirmation = response.body.confirmation
            if(confirmation != 'success'){
                callback({message: response.body.message}, null)
                return
            }
            callback(null, response.body)
        })
    },

    put: (url, body, callback) => {
        superagent
        .put(url)
        .send(body)
        .set('Accept', 'application/JSON')
        .end((err, response) => {
            if(err){
                callback(err, null)
                return
            }
            const confirmation = response.body.confirmation
            if(confirmation != 'success'){
                callback({message: response.body.message}, null)
                return
            }
            callback(null, response.body)
        })
    },

    delete: () => {

    },

    upload: (endpoint, file, params, callback) => { //Where we want it to go, the file, accompanied params
        console.log('APIManager - upload: ')
        let uploadRequest = superagent.post(endpoint)
        uploadRequest.attach('file', file)
        Object.keys(params).forEach((key) => {
            uploadRequest.field(key, params[key])
        })
        uploadRequest.end((err, res) => {
            if(err){
                callback(err, null)
                return
            }
            callback(null, res)
        })
    }
}