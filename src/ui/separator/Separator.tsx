import styles from './index.module.scss';

interface SeparatorProps {
	style?: React.CSSProperties;
}

export const Separator = ({ style }: SeparatorProps) => {
	return <div className={styles.separator} style={style}></div>;
};
