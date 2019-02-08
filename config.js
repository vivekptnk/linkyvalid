/*
 * Create and export configuration variables
 *
 * 
 */

// Container for all the environments
var environments = {};

// Staging (default environment)
environments.staging = {
    'port' : 3000,
    'envName' : 'staging'
};

// Production environment
environments.production = {
    'port' : 5000,
    'envName' : 'production'
};

// Determine which evironment was passed as a command-line argument 
var currenEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the current environment is one of the environments above, if not, default to staging 
var environmentToExport = typeof(environments[currenEnvironment]) == 'object' ? environments[currenEnvironment] : environments.staging;

// Export the module
module.exports = environmentToExport;
