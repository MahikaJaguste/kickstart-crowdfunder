
import CompiledCampaign from './build/Campaign.json';
import web3 from './web3';

const instanceFunction = (campaignAddress) => {
    const instance = new web3.eth.Contract(
        JSON.parse(CompiledCampaign.interface),
        campaignAddress
    );
    return instance;
};

export default instanceFunction;

