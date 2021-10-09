/*
For adding react material-ui it needs to add into package.json:

    "@emotion/react": "^11.4.1",
    "@emotion/styled": "^11.3.0",
    "@mui/icons-material": "^5.0.0",
    "@mui/material": "^5.0.0",
    "@mui/styled-engine-sc": "^5.0.0",

and uncomment lines below:

    const { addWebpackAlias, override } = require('customize-cra');

    module.exports = override(
        addWebpackAlias({
            '@mui/styled-engine': '@mui/styled-engine-sc',
        })
    );

It's important to override webpack config
*/
