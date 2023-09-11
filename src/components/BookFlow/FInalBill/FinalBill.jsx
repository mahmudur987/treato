import styles from '../../../pages/BookFlow/BookFlow.module.css'
import visa from "../../../assets/images/SalonDetail/visa.png"
import phonepe from "../../../assets/images/SalonDetail/phonepe.png"
import paytm from "../../../assets/images/SalonDetail/paytm.png"
import plus from "../../../assets/images/SalonDetail/plus.svg"
import rightBlue from "../../../assets/images/SalonDetail/rightBlue.svg"
import bank from "../../../assets/images/SalonDetail/bank.svg"
import simpl from "../../../assets/images/SalonDetail/simpl.png"

export default function FinalBill() {

    return (
        <div className={styles.final_billMain}>
            <div className={styles.final_billA}>
                <div className={styles.final_billAA}>Mode of payment</div>
                <div className={styles.final_billAB}>
                    <input type="radio" name="payment" id="" />
                    <div className={styles.final_billABA}>
                        <div>Online payment</div>
                        <div>Pay now using UPI, cards, NetBanking or wallets.</div>
                    </div>
                </div>
                <div className={styles.final_billAB}>
                    <input type="radio" name="payment" id="" />
                    <div className={styles.final_billABA}>
                        <div>On-site payment after service</div>
                        <div>Pay directly at the salon.</div>
                    </div>
                </div>
            </div>
            <div className={styles.final_billA}>
                <div className={styles.final_billBA}>Payment methods</div>
                <div className={styles.final_billBB}>Previously used</div>
            </div>
            <div className={styles.final_billC}>
                <div className={styles.final_billCMain}>
                    <div className={styles.final_billCA}>
                        Debit or Credit card
                    </div>
                    <div className={styles.final_billCB}>
                        <div className={styles.final_billCBD}>
                            <div className={styles.final_billCBA}>
                                <img src={visa} alt="" />
                            </div>
                            <div className={styles.final_billCBB}>
                                <div>HDFC Diners Club Credit card</div>
                                <div>XXXX-XXXX-XXXX-4512</div>
                            </div>
                        </div>
                        <div className={styles.final_billCBC}>
                            <input type="radio" name="cardSelect" id="" />
                        </div>
                    </div>
                    <div className={styles.final_billCB}>
                        <div className={styles.final_billCBD}>
                            <div className={styles.final_billCBA}>
                                <img src={visa} alt="" />
                            </div>
                            <div className={styles.final_billCBB}>
                                <div>HDFC Diners Club Credit card</div>
                                <div>XXXX-XXXX-XXXX-4512</div>
                            </div>
                        </div>
                        <div className={styles.final_billCBC}>
                            <input type="radio" name="cardSelect" id="" />
                        </div>
                    </div>
                    <div className={styles.final_billCC}>
                        <img src={plus} alt="" />
                        <div>Add new card</div>
                    </div>
                </div>
                <div className={styles.final_billCMain}>
                    <div className={styles.final_billCA}>
                        UPI 
                    </div>
                    <div className={styles.final_billCB}>
                        <div className={styles.final_billCBD}>
                            <div className={styles.final_billCBA}>
                                <img src={phonepe} alt="" />
                            </div>
                            <div className={styles.final_billCBB}>
                                <div>XXXXXX1294@ybl</div>
                                <div></div>
                            </div>
                        </div>
                        <div className={styles.final_billCBC}>
                            <input type="radio" name="cardSelect" id="" />
                        </div>
                    </div>
                    <div className={styles.final_billCB}>
                        <div className={styles.final_billCBD}>
                            <div className={styles.final_billCBA}>
                                <img src={paytm} alt="" />
                            </div>
                            <div className={styles.final_billCBB}>
                                <div>XXXXXX0122@paytm</div>
                                <div></div>
                            </div>
                        </div>
                        <div className={styles.final_billCBC}>
                            <input type="radio" name="cardSelect" id="" />
                        </div>
                    </div>
                    <div className={`${styles.final_billCC} ${styles.final_billCCC}`}>
                        <img src={plus} alt="" />
                        <div>Add new card</div>
                    </div>
                </div>
            </div>
            <div className={styles.final_billA}>
                <div className={styles.final_billBB}>Other payment methods</div>
            </div>
            <div className={styles.final_billC}>
                <div className={styles.final_billDMain}>
                    <div className={styles.final_billCA}>
                        Wallets
                    </div>
                    <div className={styles.final_billCD}>
                        <div className={styles.final_billCDA}>
                            <img src={paytm} alt="" />
                            <div>Paytm, PhonePe, Amazon Pay and more</div>
                        </div>
                        <div className={styles.final_billCDB}>
                            <img src={rightBlue} alt="" />
                        </div>
                    </div>  
                </div>
                <div className={`${styles.final_billDMain} ${styles.final_billDMainMid}`}>
                    <div className={styles.final_billCA}>
                        Netbanking
                    </div>
                    <div className={styles.final_billCD}>
                        <div className={styles.final_billCDA}>
                            <img src={bank} alt="" />
                            <div>Select from a list of banks.</div>
                        </div>
                        <div className={styles.final_billCDB}>
                            <img src={rightBlue} alt="" />
                        </div>
                    </div>  
                </div>
                <div className={styles.final_billDMain}>
                    <div className={styles.final_billCA}>
                        Simpl
                    </div>
                    <div className={styles.final_billCD}>
                        <div className={styles.final_billCDA}>
                            <img src={simpl} alt="" />
                            <div>Book now, pay later using Simpl. No additional cost.</div>
                        </div>
                        <div className={styles.final_billCDB}>
                            <img src={rightBlue} alt="" />
                        </div>
                    </div>  
                </div>
            </div>
        </div>
    )
}