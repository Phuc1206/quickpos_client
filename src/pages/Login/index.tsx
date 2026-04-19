import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import images from "@/assets/images";
import api from "@/core/axiosConfig";
import { apiStrings } from "@/services";
import { setAccessToken } from "@/services/token";
import { useAuthStore } from "@/zustand/authStore";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);

		const res = await api.post(`${apiStrings.auth.login}`, {
			username: email,
			password,
		});

		const { accessToken, user } = res.data;
		setAccessToken(accessToken);
		useAuthStore.getState().setUser(user);
		setIsLoading(false);
	};

	return (
		<div className="min-h-screen w-full bg-[#7e2a0c] grid grid-cols-1 lg:grid-cols-2">
			{/* LEFT */}
			<div className="hidden lg:flex items-center justify-center overflow-hidden">
				<img
					src={images.background}
					alt="background"
					className="w-full h-full object-cover scale-85 animate-float"
				/>
			</div>

			{/* RIGHT */}
			<div className="flex items-center justify-center">
				<div className="w-full max-w-md bg-background rounded-md p-12 shadow-lg">
					{/* HEADER */}
					<h1 className="text-3xl font-bold text-primary! text-center">
						Quickpops
					</h1>

					{/* FORM */}
					<form onSubmit={handleSubmit} className="space-y-4 mt-6">
						{/* EMAIL */}
						<div className="flex flex-col gap-2">
							<label className="text-sm font-medium">Tên đăng nhập</label>
							<Input
								// type="email"
								placeholder="Nhập tên đăng nhập"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="h-11 bg-[#e4e4e4]"
							/>
						</div>

						{/* PASSWORD */}
						<div className="flex flex-col gap-2">
							<label className="text-sm font-medium">Mật khẩu</label>

							<div className="relative">
								<Input
									type={showPassword ? "text" : "password"}
									placeholder="Nhập mật khẩu"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="h-11 pr-10 bg-[#e4e4e4]"
								/>

								<button
									type="button"
									onClick={() => setShowPassword((prev) => !prev)}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
								>
									{showPassword ? (
										<EyeOff className="w-5 h-5" />
									) : (
										<Eye className="w-5 h-5" />
									)}
								</button>
							</div>
						</div>

						{/* BUTTON */}
						<Button
							type="submit"
							disabled={isLoading}
							className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90"
						>
							{isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
}
