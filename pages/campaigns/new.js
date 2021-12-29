import React, {Component} from 'react';
import Layout from '../../components/Layout';
import {Form, Button, Input, Message} from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import {Router} from "../../routes";

class CampaignNew extends Component {
    state = {
        minimumContribution: '',
        errorMessage: '',
        loading: false,
    };

    onSubmit = async (event) => {

        event.preventDefault();

        this.setState({loading:true, errorMessage:''});

        try {
            const accounts = await web3.eth.getAccounts();
            // we dont have to specify gas needed to run this function, metamask does it for us
            // we write in when we are running tests on our own
            await factory.methods.createCampaign(this.state.minimumContribution).send({
                from: accounts[0]
            });
            Router.pushRoute('/');
        }
        catch(err){
            this.setState({errorMessage:err.message});
        }

        this.setState({loading:false});

    }

    // the error in the form will be falsey (empty string) if there is no error
    // !! is used to convert string to boolean
    // double exclaimation to reverse value and then bring back original boolean value
    // error = {true} is same as writing just error
    render() {
        return (
            <Layout>
                <h3>Create a Campaign</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input 
                            label="wei"
                            labelPosition="right"
                            value = {this.state.minimumContribution}
                            onChange = {(event) => this.setState({minimumContribution:event.target.value})}
                        />
                    </Form.Field>
                
                    <Message error header="Ooops!!" content={this.state.errorMessage} />

                    <Button loading={this.state.loading} primary>Create!</Button>
                </Form>
            </Layout>
        );
    }
}

export default CampaignNew;