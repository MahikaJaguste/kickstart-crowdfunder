import React from 'react';
import {Menu} from 'semantic-ui-react';
import {Link} from '../routes';

// first curly braces is to tell we are writing js
// second curly braces is from the js object
const HeaderComponent = () => {
    return (
        <Menu style={{marginTop:'10px' }}>
            <Link route='/'>
                <a className='item'>CrowdCoin</a>
            </Link>

            <Menu.Menu position="right">

                <Link route = '/'>
                    <a className='item'>Campaigns</a>
                </Link>

                <Link route = '/campaigns/new'>
                    <a className='item'>+</a>
                </Link>
                

            </Menu.Menu>
        </Menu>
    );
}

export default HeaderComponent; 

