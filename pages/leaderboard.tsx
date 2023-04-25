import React from 'react';
import prisma from '../lib/prisma';
import Head from 'next/head';
import { GetStaticProps } from "next"

type User = {
    name: string;
    points: number;
}

type Props =  {
    users: User[];
}

export const getStaticProps: GetStaticProps = async () => {
    const users = await prisma.user.findMany({
        select: {
            name: true,
            points: true,
        },
    });
    return { props: { users } };
}

const Leaderboard: React.FC<Props> = ({ users }) => {
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

export default Leaderboard;
