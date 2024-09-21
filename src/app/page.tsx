import MainPage from "@/components/Home/SwordCoinMain";

export default async function Home() {
    const date = new Date( 1684275200000);

    const user = {
      userName : 'ali',
      userId : 2,
      coins : 2000,
      energy : 200,
      maxEnergy : 500,
      lig : 1,
      hourlyEarn : 200,
      earnPerTap : 3,
      lastBoostTime: date,
      dailyBoostCount: 3,
    }
    console.log(user);
    if(!user) return 'not found';

    return (
    <div>
      <MainPage user = {user}></MainPage>
    </div>
    )

  
}
