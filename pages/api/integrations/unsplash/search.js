
import Unsplash, { toJson } from 'unsplash-js'

export default function searchUnsplash(req, res) {
    const { q } = req.query;

    return new Promise((resolve) => {
        const u = new Unsplash({ accessKey: process.env.UNSPLASH_ACCESS_KEY });

        u.search.photos(q)
            .then(toJson)
            .then((json) => {
                json.results.map((c) => (c.imageUrl = c.urls.small));

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Cache-Control', 'max-age=180000');
                res.end(JSON.stringify(json));
                resolve()
            })
            .catch((error) => {
                res.json(error);
                res.status(405).end();
                resolve()
            })
    })
}