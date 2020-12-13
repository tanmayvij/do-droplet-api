const token = process.env.DO_ACCESS_TOKEN;
const axios = require('axios');

module.exports = async (req, res) => {
    try {
        const { tagName } = req.query;
        
        if(!tagName || tagName === null) {
            res.status(400).json({"msg": "Please specify a tag."});
            return;
        }
        
        let url = `https://api.digitalocean.com/v2/droplets/?tag_name=${tagName}`;
        let config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };
    
        let response = await axios.get(url, config);
        
        if(response.data.droplets.length !== 0) {
            await axios.delete(url, config);
            res.status(200).json({"msg": "All droplets with the specified tag have been deleted."});
        }
        else {
            res.status(404).json({"msg": "No droplets exist for this tag."});
        }
    }
    catch(e)
    {
        console.log(e);
        if(e.response.status === 401)
            res.status(401).json({"msg": "You are not authorized to perform this action."});
        else
            res.status(500).json({"msg": "Something went wrong."});
    }
};