import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getServerSession } from "next-auth";

async function Home() {
	const userData = await getServerSession();
	return (
		<div>
			{userData ? (
				<Avatar>
					<AvatarImage src={userData.user?.image || "#"} />
					<AvatarFallback>{userData.user?.name?.slice(0, 2)}</AvatarFallback>
				</Avatar>
			) : (
				""
			)}
			Home
		</div>
	);
}

export default Home;
