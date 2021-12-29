import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const address = "0x137fC8DF51dD3DFC127cab7CFab4c05eB3016f64";

const instance = new web3.eth.Contract(
        JSON.parse(CampaignFactory.interface),
        address
    );

export default instance;