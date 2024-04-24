import { card } from "../assets";
import styles, { layout } from "../style";
import Button from "./Button";

const CardDeal = () => (
  <section className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        Fraud-proof <br className="sm:block hidden" /> Authentication.
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        We verify personal data such as Identity, Title Deeds, Municipal Operating Licenses, Personal and Business Addresses,
        Reputation for real customers, local credit history and many other integrations.
        <br />
        We do all of this with zK technology, AI and human verification.
      </p>

    </div>

    <div className={layout.sectionImg}>
      <img src={card} alt="billing" className="w-[100%] h-[100%]" />
    </div>
  </section>
);

export default CardDeal;
