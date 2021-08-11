const service = require('../services/users');
const utils = require('../utils/repositories.utils');
const redis = require('redis');

const client = redis.createClient();

module.exports = {
    /**
     *
     * @param req
     * @param res
     * @return {Promise<*>}
     */
    async index(req, res) {
        try {
            const {username} = req.params;
            const {limit = 5} = req.query;
            const cacheName = `users_${username}`;

            client.get(cacheName, async (err, result) => {
                let users;

                if(result) {
                    users = JSON.parse(result);
                } else {
                    try {
                        users = await service.getUsers(username, '5');
                        client.setex(cacheName, 3600, JSON.stringify(users));
                    }catch (error) {
                        return res.json({error: true, message: 'Could not perform the search'});
                    }
                }

                const responseData = utils.formatResponseData(users);

                return res.json(responseData.slice(0, limit));
            });
        } catch (error) {
            return res.json({error: true, message: 'Error'});
        }
    }
}
