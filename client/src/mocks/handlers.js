import { rest } from 'msw';

export const handlers = [
    rest.post('http://localhost:5000/api/auth/login', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({ token: 'mock-token' })
        );
    }),
    rest.get('http://localhost:5000/api/games', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
                { _id: '1', title: 'Elden Ring', description: 'Open-world RPG', createdBy: { username: 'testuser' } },
            ])
        );
    }),
    rest.get('http://localhost:5000/api/games/search', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
                { _id: '2', title: 'Zelda', description: 'Adventure game', createdBy: { username: 'RAWG' } },
            ])
        );
    }),
    rest.get('http://localhost:5000/api/reviews/my-reviews', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
                { _id: '1', gameId: { _id: '1', title: 'Elden Ring' }, rating: 4, comment: 'Great game' },
            ])
        );
    }),
    rest.post('http://localhost:5000/api/reviews', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({ _id: '2', gameId: { _id: '1', title: 'Elden Ring' }, rating: Number(req.body.rating), comment: req.body.comment })
        );
    }),
    rest.put('http://localhost:5000/api/reviews/:id', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({ _id: req.params.id, gameId: { _id: '1', title: 'Elden Ring' }, rating: Number(req.body.rating), comment: req.body.comment })
        );
    }),
    rest.delete('http://localhost:5000/api/reviews/:id', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({ message: 'Review deleted' })
        );
    }),
];