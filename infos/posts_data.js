const education_articles_data = require('./education_articles_data.js');
const entertainment_articles_data = require('./entertainment_articles_data.js');
const fashion_articles_data = require('./fashion_articles_data.js');
const health_articles_data = require('./health_articles_data.js');
const news_articles_data = require('./news_articles_data.js');
const sports_articles_data = require('./sports_articles_data.js');


const posts_data = {
    'health': health_articles_data,
    'fashion': fashion_articles_data,
    'education': education_articles_data,
    'entertainment': entertainment_articles_data,
    'sports': sports_articles_data,
    'news_updates': news_articles_data
};


module.exports = posts_data;