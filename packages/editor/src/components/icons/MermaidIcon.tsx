import { IconProps } from '@/components/icons';

function MermaidIcon(props: IconProps) {
    const { size = 24, color = 'black' } = props;

    return (
        <svg
            width={size}
            height={size}
            viewBox='0 0 491 491'>
            <path
                fill={color}
                d='M407.48,111.18C335.587,108.103 269.573,152.338 245.08,220C220.587,152.338 154.573,108.103 82.68,111.18C80.285,168.229 107.577,222.632 154.74,254.82C178.908,271.419 193.35,298.951 193.27,328.27L193.27,379.13L296.9,379.13L296.9,328.27C296.816,298.953 311.255,271.42 335.42,254.82C382.596,222.644 409.892,168.233 407.48,111.18Z'
            />
        </svg>
    );
}

export default MermaidIcon;
