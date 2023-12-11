
import style from './Spinner.module.css'

export function Spinner() {

    return (
        <div className={style.ldsEllipsis}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}