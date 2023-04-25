import prisma from '../../../lib/prisma';
import { getSession, useSession } from 'next-auth/react';
// POST /api/add-points
// Required User and Points
export default async function handle(req, res) {
  const  points  = req.body.updated_pts;

  const session = await getSession({ req });

  const updatedUser = await prisma.user.update({
    where: {email: session?.user?.email},
    data: { points: points },
  });
  res.json(updatedUser);
}