import MainPage from "@/components/Mine/SwordCoinMine"
import prisma from "@/db";

export const revalidate = 0; // ISR devre dışı, her istekte yeni veri çeker


export default async function Mine(){
  const data = await prisma.user.findUnique({
    where: { id: 1 }, // Kullanıcının ID'sine göre sorgulama yapıyoruz
    include: {
      cards: {
        select: {
          id : true,
          cardId: true,
          level: true,
          userId: true,
        },
      }
    },
  });
  
    if(!data) {
      return 'Not found';
    }

  return (
    <MainPage user={data}/>
  )
}
