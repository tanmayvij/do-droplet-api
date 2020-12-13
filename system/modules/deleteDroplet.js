const token = process.env.DO_ACCESS_TOKEN;
const axios = require('axios');

module.exports = async (req, res) => {
    try {
        const { dropletId } = req.params;
        
        let url = `https://api.digitalocean.com/v2/droplets/${dropletId}`;
        let config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };
    
        await axios.delete(url, config);
        res.status(200).json({"msg": "Deleted successfully."});
    }
    catch(e)
    {
        console.log(e);
        if(e.response.status === 404)
            res.status(404).json({"msg": "Droplet does not exist. It may have been deleted already."});
        else if(e.response.status === 401)
            res.status(401).json({"msg": "You are not authorized to delete this droplet."});
        else
            res.status(500).json({"msg": "Something went wrong."});
    }
};