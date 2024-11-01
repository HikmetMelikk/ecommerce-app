import { FaRegCopyright } from "react-icons/fa";
import styles from "./footer.module.css";
export default function Footer() {
	const currentYear = new Date().getFullYear();
	return (
		<footer className={styles.footer}>
			<FaRegCopyright /> {currentYear} Hikmet Melik Fırat
		</footer>
	);
}
