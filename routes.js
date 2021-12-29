const routes = require('next-routes')();
// this require returns a function and thus placing () after it invokes it instantly

// to denote a wild card token, we use : and give it a name that will be passed to the component
routes
.add('/campaigns/new', '/campaigns/new')
.add('/campaigns/:address', '/campaigns/show')
.add('/campaigns/:address/requests', '/campaigns/requests/index')
.add('/campaigns/:address/requests/new', '/campaigns/requests/new');


module.exports = routes;