
const { ApifyClient } = require('apify-client');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize the ApifyClient with API token
const client = new ApifyClient({
    token: 'apify_api_J8QFjOM2apHWs6BEnsml1pfEbUnhb90qGste',
});

// Prepare actor input
const input = {};

(async () => {
    // Run the actor and wait for it to finish
    const run = await client.actor("petrpatek/covid-19-aggregator").call(input);

    // Fetch and print actor results from the run's dataset (if any)
    console.log('Results from dataset');
    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    items.forEach((item) => {
        console.dir(item);
    });
})();