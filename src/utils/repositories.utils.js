module.exports = {
    /**
     *
     * @param {Object[]} data
     * @return {{name:string, description:string, language:string, created_at:Date, image_url: string}[]}
     */
    formatResponseData(data) {
        return data.map(({name, description, owner, created_at, language}) => {
            return {
                created_at,
                description,
                image_url: owner.avatar_url,
                language,
                name
            }
        });
    }
}
