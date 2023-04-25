import React from 'react';
import prisma from '../lib/prisma';



import { PrismaClient } from '@prisma/client';
import type { NextPage } from 'next';
import Head from 'next/head';


interface User {
    name: string;
    points: number;
}

interface Props {
    users: User[];
}

const Leaderboard: NextPage<Props> = ({ users }) => {
    return (
        <div>
            <Head>
                <title>Leaderboard</title>
            </Head>
            <div className="page">
                <h1>Users</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.name}>
                                <td>{user.name}</td>
                                <td>{user.points}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export async function getStaticProps() {
    const users = await prisma.user.findMany({
        select: {
            name: true,
            points: true,
        },
    });
    return { props: { users } };
}

export default Leaderboard;
