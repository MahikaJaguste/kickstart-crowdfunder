import React, {Component} from 'react';
import {Form, Button, Message, Input} from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import {Router} from "../routes";

class RequestForm extends Component {
    state = {
        description: '',
        value: '',
        recipient: '',
        errorMessage: '',
        loading: false,
    };


    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({loading:true, errorMessage:''});
        const campaign = Campaign(this.props.address);
        console.log(this.props.address, campaign);

        try{
            const accounts = await web3.eth.getAccounts();
            console.log(accounts);
            await campaign.methods.createRequest(
                this.state.description,
                web3.utils.toWei(this.state.value, 'ether'),
                this.state.recipient
            )
            .send({
                from: accounts[0]
            });

            Router.pushRoute(`/campaigns/${this.props.address}/requests`);
        }
        catch(err){
            this.setState({errorMessage:err.message});
        }

        this.setState({loading:false, description:'', value:'', recipient:''});
    };

    render() {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Description</label>
                    <Input
                        value= {this.state.description}
                        onChange = {(event) => this.setState({description:event.target.value})}
                    />
                </Form.Field>

                <Form.Field>
                    <label>Amount (ether)</label>
                    <Input
                        value= {this.state.value}
                        onChange = {(event) => this.setState({value:event.target.value})}
                    />
                </Form.Field>

                <Form.Field>
                    <label>Recipient</label>
                    <Input
                        value= {this.state.recipient}
                        onChange = {(event) => this.setState({recipient:event.target.value})}
                    />
                </Form.Field>

                <Message error header="Ooops!!" content={this.state.errorMessage}/>

                <Button primary loading={this.state.loading}>Create Request</Button>
            </Form>
        );
    }
}

export default RequestForm;

