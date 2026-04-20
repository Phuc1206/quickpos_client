import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import images from "@/assets/images";
import { useLogin } from "@/services/authServices";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/components/ui/spinner";

const loginSchema = z.object({
	username: z.string().min(1, "Vui lòng nhập tên đăng nhập"),
	password: z.string().min(1, "Vui lòng nhập mật khẩu"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
	const [showPassword, setShowPassword] = useState(false);

	const { mutateAsync: loginMutation, isPending: isLoginPending } = useLogin();

	const { control, handleSubmit } = useForm<LoginForm>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const onSubmit = async (data: LoginForm) => {
		await loginMutation({
			username: data.username,
			password: data.password,
		});
	};


	return (
		<div className="min-h-screen w-full bg-[#7e2a0c] grid grid-cols-1 lg:grid-cols-2">
			{/* LEFT */}
			<div className="hidden lg:flex items-center justify-center overflow-hidden">
				<img
					src={images.background}
					alt="background"
					className="w-full h-full object-cover scale-70 animate-float"
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
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						{/* USERNAME */}
						<Controller
							name="username"
							control={control}
							render={({ field, fieldState }) => (
								<div className="flex flex-col gap-2">
									<label className="text-sm font-medium">Tên đăng nhập</label>
									<Input
										placeholder="Nhập tên đăng nhập"
										value={field.value}
										onChange={field.onChange}
										className="h-11 bg-[#e4e4e4]"

									/>
									{fieldState.error && <p className="text-red-500 text-xs text-right">{fieldState.error.message}</p>}
								</div>
							)}
						/>

						{/* PASSWORD */}
						<Controller
							name="password"
							control={control}
							render={({ field, fieldState }) => (
								<div className="flex flex-col gap-1">
									<label className="text-sm font-medium">Mật khẩu</label>

									<div className="relative">
										<Input
											type={showPassword ? "text" : "password"}
											placeholder="Nhập mật khẩu"
											value={field.value}
											onChange={field.onChange}
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

									{fieldState.error && <p className="text-red-500 text-xs text-right">{fieldState.error.message}</p>}
								</div>
							)}
						/>


						{/* BUTTON */}
						<Button
							type="submit"
							disabled={isLoginPending}
							className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90"
						>
							{isLoginPending ?
								<div className="flex items-center justify-center gap-2">
									<Spinner data-icon="inline-start" className="text-background" />
									<span>Đang đăng nhập...</span>
								</div>

								: "Đăng nhập"
							}
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
}
