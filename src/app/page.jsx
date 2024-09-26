import MainPage from "@/components/Home/SwordCoinMain";
import prisma from "@/db";
//import axios from "axios";

export const revalidate = 0; // ISR devre dışı, her istekte yeni veri çeker

export default async function Home() {


  /*const createUser = async () => {
    try {
      await axios.post('api/createUser');
      console.log('User data saved successfully');
    } catch (error) {
      console.error('Error creating user data:', error);
    }
  };
  createUser();*/

    const user = await prisma.user.findFirst ({
      where : { id : 1}
    })
 
    console.log(user);
    if(!user) {
      return 'Not found';
    }

    return (
    <div>
      <MainPage user = {user}></MainPage>
    </div>
    )

  
}
