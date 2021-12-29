import React, {Component} from 'react';
import {Form, Button, Input, Message} from 'semantic-ui-react'
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import {Router} from "../routes";

class ContributeForm extends Component {
    state = {
        value: '',
        errorMessage: '',
        loading: false,
    }

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({loading:true, errorMessage:''});
        const campaign = Campaign(this.props.address);

        try{
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            });
            Router.replaceRoute(`/campaigns/${this.props.address}`);
        }
        catch(err){
            console.log(err);
            this.setState({errorMessage : err.message});
        }

        this.setState({loading:false, value:''});
        
    };

    render() {
        return ( 
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Enter amount to contribute:</label>
                        <Input
                            label = 'ether'
                            labelPosition = 'right'
                            onChange = {(event) => this.setState({value: event.target.value})}
                            value = {this.state.value}
                        />
                    </Form.Field>
                    <Message error header="Ooops!!" content={this.state.errorMessage} />
                    <Button loading={this.state.loading} primary>Contribute!</Button>
                </Form>
        );
    }
}

export default ContributeForm;