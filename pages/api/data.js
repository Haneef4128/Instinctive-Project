import prisma from './prismaClient';
import Cors from 'cors';

// Initialize the CORS middleware
// Include required CORS headers in the middleware
const cors = Cors({
  origin: '*', // Allow only this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Add OPTIONS
  allowedHeaders: ['Content-Type', 'Authorization'], // Add any custom headers you need
});


// Helper function to run middleware
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

// Handle GET request - Fetch all instinctives
async function handleGet(req, res) {
  try {
    const instinctives = await prisma.instinctive.findMany();
    res.status(200).json(instinctives);
  } catch (error) {
    console.error('Error fetching instinctives:', error);
    res.status(500).json({ error: 'Error fetching instinctives' });
  }
}

// Handle POST request - Create a new instinctive
async function handlePost(req, res) {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Request body cannot be empty' });
    }

    const newInstinctive = await prisma.instinctive.create({
      data: req.body,
    });
    res.status(201).json(newInstinctive);
  } catch (error) {
    console.error('Error creating instinctive:', error);
    res.status(500).json({ error: 'Error creating instinctive' });
  }
}

// Handle PUT request - Update an existing instinctive by ID
async function handlePut(req, res) {
  const { id } = req.query;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  try {
    const { id: ignore, ...data } = req.body; // Exclude `id` from the update payload
    const updatedInstinctive = await prisma.instinctive.update({
      where: { id: parseInt(id) },
      data,
    });
    res.status(200).json(updatedInstinctive);
  } catch (error) {
    console.error('Error updating instinctive:', error);

    if (error instanceof prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return res.status(404).json({ error: 'Record not found' });
    }

    res.status(500).json({ error: 'Error updating instinctive' });
  }
}

// Handle DELETE request - Delete an instinctive by ID
async function handleDelete(req, res) {
  const { id } = req.query;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  try {
    await prisma.instinctive.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).end(); // Success with no content
  } catch (error) {
    console.error('Error deleting instinctive:', error);

    if (error instanceof prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return res.status(404).json({ error: 'Record not found' });
    }

    res.status(500).json({ error: 'Error deleting instinctive' });
  }
}

export default async function handler(req, res) {
  try {
    // Run CORS middleware before processing the request
    await runMiddleware(req, res, cors);

    // Handle request methods
    const { method } = req;

    switch (method) {
      case 'OPTIONS':
        res.status(200).end(); // Respond OK to preflight
        break;
      case 'GET':
        await handleGet(req, res);
        break;
      case 'POST':
        await handlePost(req, res);
        break;
      case 'PUT':
        await handlePut(req, res);
        break;
      case 'DELETE':
        await handleDelete(req, res);
        break;
      default:
        res.status(405).json({ error: 'Method Not Allowed' });
        break;
    }
  } catch (error) {
    console.error('Unhandled error in handler:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

