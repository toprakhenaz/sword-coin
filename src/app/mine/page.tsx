import MainPage from "@/components/Mine/SwordCoinMine"
import prisma from "@/db";


export default async function Mine(){
    const data = await prisma.user.findUnique({
      where: { id: 1 },
      include: { cards: true },
    });

    if(!data) {
      return 'Not found';
    }

  return (
    <MainPage user={data}/>
  )
}
