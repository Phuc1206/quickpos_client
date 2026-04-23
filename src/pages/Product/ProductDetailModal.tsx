import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

type Props = {
	open: boolean;
	onClose: () => void;
	data?: any;
};

const ProductDetailModal = ({ open, onClose, data }: Props) => {
	if (!data) return null;

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="max-w-lg p-0 overflow-hidden">
				{/* Image */}
				<div className="w-full h-60 bg-gray-100">
					<img src={data.image} className="w-full h-full object-cover" />
				</div>

				<div className="p-5">
					<DialogHeader>
						<DialogTitle className="text-xl font-bold">{data.name}</DialogTitle>
					</DialogHeader>

					<p className="text-red-500 font-semibold mt-2 text-lg">
						{data.price?.toLocaleString()} đ
					</p>

					{/* Mô tả */}
					{data.description && (
						<p className="text-gray-600 mt-3 text-sm leading-relaxed">
							{data.description}
						</p>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ProductDetailModal;
