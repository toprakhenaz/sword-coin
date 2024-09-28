import Earn from '@/components/Earn/Earn'
import prisma from '@/db';
import WebApp from '@twa-dev/sdk';

export default async function earn() {

  let TelegramUser;

  if (WebApp.initDataUnsafe.user) {
    TelegramUser = WebApp.initDataUnsafe.user;
    console.log("Telegram User Data:", TelegramUser);
  }

  const userId = TelegramUser ? TelegramUser.id : 1;

  const data = await prisma.user.findUnique({
    where: { id: userId }, // Kullanıcının ID'sine göre sorgulama yapıyoruz
    include: {
      missions: {
        select: {
          id : true,
          isClaimed: true,
          userId : true,
          missionDate : true,
        },
      }
    },
  });
  
    if(!data) {
      return 'Not found';
    }

  return (
    <Earn user = {data}/>
  )
}
