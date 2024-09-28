import MainPage from "@/components/Mine/SwordCoinMine"
import prisma from "@/db";
import WebApp from "@twa-dev/sdk";

export const revalidate = 0; // ISR devre dışı, her istekte yeni veri çeker


export default async function Mine(){
  let TelegramUser;

  if (WebApp.initDataUnsafe.user) {
    TelegramUser = WebApp.initDataUnsafe.user;
    console.log("Telegram User Data:", TelegramUser);
  }

  const userId = TelegramUser ? TelegramUser.id : 1;

  const data = await prisma.user.findUnique({
    where: { id: userId }, // Kullanıcının ID'sine göre sorgulama yapıyoruz
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
