const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());

const compiledCampaign = require('../ethereum/build/Campaign.json');
const compiledFactory = require('../ethereum/build/CampaignFactory.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({data:compiledFactory.bytecode})
        .send({from:accounts[0], gas:'1000000'});

    // 100 wei represented as string
    await factory.methods.createCampaign('100').send({
        from:accounts[0],
        gas: '1000000'
    });

    // these sqaure brackets tell js that the return value is an array and you have to store the 0th element in campaignAddress
    [campaignAddress] = await factory.methods.getDeployedCampaigns().call({from:accounts[0]});

    // we have the address of the deployed campaign, we want a js object of it to use it for testing
    campaign = await new web3.eth.Contract(
        JSON.parse(compiledCampaign.interface),
        campaignAddress
    );
    // here since we give a address, it knows that it is already deployed

});

describe("Campaigns", () => {

    it("deploys a factory and a campaign", () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });

    it("marks caller as the campaign manager", async () => {
        const manager = await campaign.methods.manager().call();
        assert.equal(accounts[0],manager);
    });

    it("allows people to contribute money and marks them as approvers", async () => {
        await campaign.methods.contribute().send({
            from: accounts[1],
            value: '200'
        });
        
        const isApprover = await campaign.methods.approvers(accounts[1]).call();
        assert(isApprover);

    });
    
    it("requires minimum contribution", async () => {
        try {
            await campaign.methods.contribute().send({
                from: accounts[1],
                value: '10'
            });
            assert(false);
        }
        catch(err) {
            assert(err);
        }
    });

    it("allows a manager to make a payment request", async () => {
        
        await campaign.methods
            .createRequest(
                "Buy batteries", '100', accounts[2])
            .send({
                from: accounts[0],
                gas: '1000000'
            });
        
        const request = await campaign.methods.requests(0).call();
        assert.equal("Buy batteries", request.description);
    });

    it("contribute, create a request, approve it, finalize it, and sends money to the vendor", async () => {

        await campaign.methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei('10','ether')
        });

        let initialbalance = await web3.eth.getBalance(accounts[1]);
        initialbalance = web3.utils.fromWei(initialbalance, 'ether');
        // string to decimal number
        initialbalance = parseFloat(initialbalance);

        await campaign.methods
            .createRequest("Buy tissues", web3.utils.toWei('5','ether'), accounts[1])
            .send({
                from: accounts[0],
                gas:'1000000'
            });

        await campaign.methods.approveRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        });

        await campaign.methods.finalizeRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        });

        let finalbalance = await web3.eth.getBalance(accounts[1]);
        finalbalance = web3.utils.fromWei(finalbalance, 'ether');
        // string to decimal number
        finalbalance = parseFloat(finalbalance);

        assert.equal(5, finalbalance-initialbalance);
    });

});