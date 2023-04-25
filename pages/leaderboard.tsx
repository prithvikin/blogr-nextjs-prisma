import React from 'react';
import prisma from '../lib/prisma';
import Head from 'next/head';
import { GetStaticProps } from "next"
import Layout from '../components/Layout';

type User = {
    name: string;
    points: number;
}

type Props = {
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
        <Layout>
            <div>
                <Head>
                    <title>Leaderboard</title>
                </Head>
                <div className="page">
                    <h1>Leaderboard</h1>
                    <table className="styled-table">
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
            <style jsx>{`
                .styled-table {
                    border-collapse: collapse;
                    margin: 25px 0;
                    font-size: 0.9em;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                    Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
                    "Segoe UI Symbol";
                    min-width: 400px;
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
                }
                .styled-table thead tr {
                    background-color:#454d5c;
                    color: #ffffff;
                    text-align: left;
                }
                .styled-table th,
                .styled-table td {
                    padding: 12px 15px;
                }
                .styled-table tbody tr {
                    border-bottom: 1px solid #dddddd;
                }

                .styled-table tbody tr:nth-of-type(even) {
                    background-color: #f3f3f3;
                }

                .styled-table tbody tr:last-of-type {
                    border-bottom: 2px solid#454d5c;
                }
        `}</style>
        </Layout>
    );
};

export default Leaderboard;
