import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import { useSession } from 'next-auth/react';

import { Button, GameCard } from '@/components';
import { fetchGames } from '@/lib';
import { BaseGame } from '@/types';

interface Props {
  games: BaseGame[];
}

const inter = Inter({ subsets: ['latin'] })

const Index = ({ games }: Props) => {


  return (
    <>
      <Head>
        <title>Squid Golf - Home</title>
        <meta property="og:title" content="Squid Golf - Home" key="title" />
      </Head>

      <main className={inter.className}>
        <>
          <div>
            <Link href="/games/create">
              <Button text="Create Game" />
            </Link>
          </div>

          <div className="mt-4">
            {games.map((game: BaseGame, index: number) => <GameCard game={game} key={`${game.id}__${index}`} />)}
          </div>
        </>
      </main>
    </>
  )
};

export default Index;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const games = await fetchGames();

  return { props: { games } };
};
