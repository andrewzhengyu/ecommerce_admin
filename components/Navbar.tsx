import { UserButton, auth } from "@clerk/nextjs"
import MainNav from "./MainNav"
import StoreSwitcher from "./StoreSwitcher"
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";


const Navbar = async () => {

  const { userId } = auth();

  if(!userId){
    redirect('/sign-in');
  }

  const stores = await prismadb.store.findMany({
    where:{
        userId,
    }
  });

  return (
    <div  className="border-b">
        <div className="h-16 flex items-center px-4">
            <div>
                <StoreSwitcher items={stores}/>
            </div>
            <MainNav/>
            <div className="ml-auto">
                <UserButton afterSignOutUrl="/"/>
            </div>
        </div>
    </div>
  )
}

export default Navbar