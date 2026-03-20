import { useState } from 'react'
import s from "./CopyTo.module.css"

const email = 'chadhama5@gmail.com'
const confirmed = 'copied!'

function CopyToButton({ principled = false }) {
    const [state, setState] = useState(null) // null | 'up' | 'down'

    function handleCopy() {
        navigator.clipboard.writeText(email);
        setState('up');
        setTimeout(() => setState('down'), 2000);
        setTimeout(() => setState(null), 2500);
    }

    const upClass = principled ? s.upPrincipled : s.up
    const downClass = principled ? s.downPrincipled : s.down

    const renderLetters = (text, step) =>
        text.split('').map((l, i) => (
            <span
                className={`${s.letter} ${state === 'up' ? upClass : ''} ${state === 'down' ? downClass : ''}`}
                style={{ '--i': i, '--step': step }}
                key={i}
            >{l}</span>
        ))

    return (
        <button className={s.button} onClick={handleCopy}>
            <span className={s.clip}>
                <span className={s.row}>{renderLetters(email, '20ms')}</span>
                <span className={s.row}>{renderLetters(confirmed, '40ms')}</span>
            </span>
        </button>
    )
}

export default function CopyTo() {
    return (
        <div className={s.comparison}>
            <div className={s.comparisonRow}>
                <span className={s.badge}>✓</span>
                <CopyToButton principled />
            </div>
            <div className={s.comparisonRow}>
                <span className={s.badge}>✗</span>
                <CopyToButton />
            </div>
        </div>
    )
}
