import styles from './styles.module.scss';

// eslint-disable-next-line react/prop-types
export default function Header({ handleAccountsChanged }) {
  const handleClick = () => {
    window.ethereum
      .request({ method: 'eth_requestAccounts' })
      .then(handleAccountsChanged)
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className={styles.container}>
      <button onClick={handleClick}>Connect Metamask</button>
    </div>
  );
}
