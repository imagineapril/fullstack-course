import deleteBtnPng from './deleteBtn.png';
import styles from './deleteBtn.module.css';


function DeleteBtn()  {

  return <img className={styles.deleteBtnIcon} src={deleteBtnPng}></img>
}

export default DeleteBtn;