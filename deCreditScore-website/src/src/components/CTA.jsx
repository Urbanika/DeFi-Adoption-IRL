import styles from "../style";


const CTA = () => (
  <section className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}>
    <div className="flex-1 flex flex-col">
      <h2 className={styles.heading2}>Thanks to each and every one of you</h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Would not be possible without the support of:
      </p>
    </div>

    <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>

    </div>
  </section>
);

export default CTA;
