const express = require('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 5000;

//Generate Scrapper URL
const generateScrapperUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

//Parse JSON Input
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Amazon Scrapper API');
})

//GET Product Details
app.get('/products/:productId?api_key', async(req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${generateScrapperUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`)
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
})

//GET Product Reviews
app.get('/products/:productId/reviews?api_key', async(req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${generateScrapperUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`)
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
})

//GET Product Offers
app.get('/products/:productId/offers?api_key', async(req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${generateScrapperUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`)
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
})

//GET Search Results
app.get('/search/:searchQuery?api_key', async(req, res) => {
    const { searchQuery } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${generateScrapperUrl(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`)
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));