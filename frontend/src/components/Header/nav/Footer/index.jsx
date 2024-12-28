import styles from './style.module.css';

export default function Footer() {
    return (
        <div className={styles.footer}>
            <a href="https://www.instagram.com" target="_blank">Instagram</a>
            <a href="https://www.facebook.com" target="_blank">Facebook</a>
            <a href="https://www.linkedin.com" target="_blank">LinkedIn</a>
        </div>
    )
}
