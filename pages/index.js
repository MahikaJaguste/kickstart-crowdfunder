import React, {Component} from 'react';
import factory from '../ethereum/factory';
import {Card, Button} from 'semantic-ui-react';
import Layout from '../components/Layout';
import {Link} from '../routes';

class CampaignIndex extends Component {

    // static indicates a class function, it is attached to the class itself, no instance needed
    // for any other methods, we have to create an instance of the class to access a method
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        return {campaigns}; // sent as props to the component
    }

    renderCampaigns() {
        const items = this.props.campaigns.map((address) => {
            return {
                header: address,
                description: (
                    <Link route={`/campaigns/${address}`}>
                        <a>View Campaign</a>
                    </Link>
                ),
                fluid: true
                // to stretch the card to the entire width of its container
            };
        });

        return <Card.Group items={items}/>;
    }

    // primary prop in button to make it blue emphasis
    // the jsx in between the Layout tags gets passed to the LayoutComponent as children property
    render() {
        return (
            <Layout>
                <div>
                    <h3>Open Campaigns</h3>
                    <Link route = '/campaigns/new'>
                        <a>
                        <Button 
                            floated="right"
                            content="Create Campaign"
                            icon="add circle"
                            primary
                        />
                        </a>
                    </Link>
                    {this.renderCampaigns()}
                </div>
            </Layout>
        );
    }
}

export default CampaignIndex;

