const service = require('../services/repositories');
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

            client.get(`user_${username}`, async (err, result) => {
                let userRepositories;

                if(result) {
                    userRepositories = JSON.parse(result);
                } else {
                    try {
                        // %23 is the # code; used to correct the encode error
                        userRepositories = await service.getUserRepositories(username, 'c%23');
                        client.setex(`user_${username}`, 3600, JSON.stringify(userRepositories));
                    }catch (error) {
                        return res.json({error: true, message: 'Could not perform the search'});
                    }
                }

                const responseData = utils.formatResponseData(userRepositories).sort((current, next) => current.created_at < next.created_at ? -1 : 1);

                return res.json(responseData.slice(0, limit));
            });
        } catch (error) {
            return res.json({error: true, message: 'Error'});
        }
    }
}
