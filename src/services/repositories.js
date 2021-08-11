const axios = require('axios');
const env = require('../env');

module.exports = {
    /**
     *
     * @param {string} username
     * @param {number} limit
     * @return {Promise<void>}
     */
    async getUserRepositories(username, limit= 9999){
        try {
            const auth = env ? { user: env.gitUsername, pass: env.gitPassword } : undefined;

            const response = await axios.get(
                `https://api.github.com/search/repositories?q=user:${username}&per_page=${limit}`,
                {
                    auth
                }
            );

            return response.data.items;
        }   catch (error) {
            console.log(error)
        }
    }
}
