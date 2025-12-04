import type { FC } from "react";

interface Icon {
    className?: string;
    color?: string;
}

export const PickerIcon: FC<Icon> = ({ className, color }) => (
    <>
        <svg
            className={className}
            width="7"
            height="2"
            viewBox="0 0 7 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M3.17808 1.9278C3.07465 1.97376 2.9566 1.97376 2.85317 1.9278L0.238057 0.765525C-0.156737 0.590061 -0.031518 0 0.400511 0L5.63074 0C6.06277 0 6.18799 0.590061 5.79319 0.765525L3.17808 1.9278Z"
                fill={color || "#fff"}
            />
        </svg>
    </>
);
