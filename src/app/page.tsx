import MainPage from "@/components/Home/SwordCoinMain";
import { user } from "@/data/GeneralData";

export default async function Home() {
 
    console.log(user);
    if(!user) return 'not found';

    return (
    <div>
      <MainPage user = {user}></MainPage>
    </div>
    )

  
}
