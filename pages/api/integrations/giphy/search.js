import { GiphyFetch } from '@giphy/js-fetch-api'

export default async function searchGiphy(req, res) {
    const { q, offset } = req.query;

    const gf = new GiphyFetch(process.env.GIPHY_API_KEY);
    const json = await gf.search(q, { offset });
    const results = json.data.map(gif => { return {
        ...gif,
        imageUrl: gif.images.downsized.url,
        description: gif.title
    }});

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'max-age=180000');
    res.end(JSON.stringify({
        results,
        page: json.pagination,
    }))
    // catch (error) {
    //     res.json(error)
    //     res.status(405).end()
    // }
}