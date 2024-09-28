import MainPage from "@/components/Home/SwordCoinMain";
import prisma from "@/db";
import WebApp from "@twa-dev/sdk";

export const revalidate = 0; // ISR devre dışı, her istekte yeni veri çeker


export default async function Home() {
  // Telegram kullanıcı verisini al
  let TelegramUser;

  if (WebApp.initDataUnsafe.user) {
    TelegramUser = WebApp.initDataUnsafe.user;
    console.log("Telegram User Data:", TelegramUser);
  }

  const userId = TelegramUser ? TelegramUser.id : 1;

  let user = await prisma.user.findFirst({
    where: { id: userId },
  });


  if (!user) {
    user = await prisma.user.create({
      data: {
        id : TelegramUser?.id || 2,
        userName: TelegramUser?.username || "Anonymous",  
        userImage: null,  
        coins: 0,  
        energy: 100, 
        energyMax: 100,
        league: 1,  
        coinsHourly: 10,  
        coinsPerTap: 1, 
        lastBoostTime: new Date(),  
        dailyBoostCount: 0,
        dailyCardRewardClaimed: false,
        foundCards: "",  
        dailyRewardDate: new Date(),  
        dailyRewardStreak: 1,
        dailyRewardClaimed: false,
      },
    });
  }

  return (
    <div>
      <MainPage user={user}></MainPage>
    </div>
  );
}
