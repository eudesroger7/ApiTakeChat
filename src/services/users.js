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
    async getUsers(username, language, limit= 9999){
        try {
            const auth = env ? { user: env.gitUsername, pass: env.gitPassword } : undefined;

            const response = await axios.get(
                `https://api.github.com/search/users?q=${username}&per_page=${limit}`,
                {
                    auth
                }
            );

            return response.data.items;
        }   catch (error) {
            return {error: true, message: error.toString()};
        }
    }
}
