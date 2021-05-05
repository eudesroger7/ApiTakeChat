const axios = require('axios');
const env = require('../env');

module.exports = {
    /**
     *
     * @param {string} username
     * @param {string} language
     * @param {number} limit
     * @return {Promise<void>}
     */
    async getUserRepositories(username, language, limit= 9999){
        const auth = env ? { user: env.gitUsername, pass: env.gitPassword } : undefined;

        const response = await axios.get(
            `https://api.github.com/search/repositories?q=user:${username}+language:${language}&per_page=${limit}`,
            {
                auth
            }
        );

        return response.data.items;
    }
}
