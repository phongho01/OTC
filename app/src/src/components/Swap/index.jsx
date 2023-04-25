import styles from './styles.module.scss';

export default function Swap() {
  return (
    <div className={styles.container}>
        <div className={styles.title}>OTC</div>
        <div className={styles.inputControl}>
            <div className={styles.label}>Pay</div>
            <div className={styles.inputWrap}>
              <input  />
              <div className={styles.tokenWrap}>
                <img src="https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Ethereum-ETH-icon.png" />
                <span>ETH</span>
              </div>
            </div>
        </div>
    </div>
  )
}
