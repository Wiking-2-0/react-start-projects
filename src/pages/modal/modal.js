import React, { useState } from 'react'
import './modal.scss';

const Modal = () => {
    const [open, setOpen] = useState(false)

    return (
        <div className="modal-app">
            <button className="open-modal-btn" onClick={() => setOpen(true)}>✨ Открыть окно</button>
            <ModalComponent open={open} setOpen={setOpen}>
                <img src="https://media2.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif" alt='Modal Content' />
                <h3>Test modal title</h3>
            </ModalComponent>
        </div>
    )
}

export default Modal

const ModalComponent = ({ open, setOpen, children }) => (
    <div className={`overlay animated ${open ? 'show' : ''}`} onClick={() => setOpen(false)}>
        <div className="modal-new">
            <svg height="200" viewBox="0 0 200 200" width="200">
                <title />
                <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
            </svg>
            {children}
        </div>
    </div>
)
