// components/ui/Modal.tsx
import { useEffect } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
};

export default function Modal({ open, onClose, children }: ModalProps) {
	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};

		if (open) document.addEventListener("keydown", handler);
		return () => document.removeEventListener("keydown", handler);
	}, [open, onClose]);

	useEffect(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	if (!open) return null;

	return createPortal(
		<div
			className="fixed inset-0 z-50 flex items-center justify-center"
			onClick={onClose}
		>
			{/* backdrop */}
			<div className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity" />
			{/* content */}
			<div
				className="relative z-10 bg-(--bg-color) p-6 rounded-xl w-full max-w-md"
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</div>
		</div>,
		document.body,
	);
}
