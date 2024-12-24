import prisma from './prismaClient';
import Cors from 'cors';

// Initialize CORS
const cors = Cors({
  origin: '*', // Replace with the actual frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});

// Helper to run middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  // Run CORS middleware
  await runMiddleware(req, res, cors);

  const { method, query: { id } } = req;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  switch (method) {
    case 'OPTIONS':
      res.status(200).end(); // Respond OK for preflight
      break;

    case 'PUT':
      try {
        const { id: ignore, ...data } = req.body; // Ignore `id` in body
        const updated = await prisma.instinctive.update({
          where: { id: parseInt(id) },
          data,
        });
        res.status(200).json(updated);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating record' });
      }
      break;

    case 'DELETE':
      try {
        await prisma.instinctive.delete({
          where: { id: parseInt(id) },
        });
        res.status(204).end(); // Success with no content
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting record' });
      }
      break;

    default:
      res.setHeader('Allow', ['PUT', 'DELETE', 'OPTIONS']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
