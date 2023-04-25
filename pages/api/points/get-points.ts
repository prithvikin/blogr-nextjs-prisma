import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/react';

// GET /api/add-points
// Required User and Points
export default async function handle(req, res) {

  const session = await getSession({ req });

  const pts = await prisma.user.findUnique({
    where: {email: session?.user?.email},
    select: { points: true },
  });

  res.json(pts);
}