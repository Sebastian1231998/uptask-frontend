import styles from './css/Message.module.scss'
import useAuth from "../../hooks/useAuth"
import { useEffect } from "react"
import { scroll_message } from "../../helpers"
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const Message = ({ message, nombreRemitente }) => {

    const BlackTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: theme.palette.common.black,
            boxShadow: theme.shadows[1],
            fontSize: 15,
        },
    }));
    
    
    const LightTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: theme.palette.common.white,
            color: 'rgba(0, 0, 0, 0.87)',
            boxShadow: theme.shadows[1],
            fontSize: 15,
        },
    }));

    useEffect(() => {
        scroll_message()
    }, [])
    
    const { auth } = useAuth()


    return (
        <>
            <li className="li-message">
                <div className={`${message.usuario_envia === auth.email ? styles.direction_envia : styles.direction_recibe}`}>
                    <div className={`${message.usuario_envia === auth.email ? 'flex-row-reverse' : ''}  flex justify-center items-center`}>
                        <div className='mx-3'>
                        </div>
                        <div className={`${message.usuario_envia === auth.email ? 'items-end' : 'items-start'}  flex flex-col`}>
                            <p
                                className='my-2 font-bold text-stone-600'
                            >{message.usuario_envia === auth.email ? auth.nombre : nombreRemitente}</p>
                            <div className={`${message.usuario_envia === auth.email ? styles.color_envia : styles.color_recibe}  ${styles.general} flex flex-wrap justify-end gap-2`}>

                                <p
                                    data-tip=''
                                    data-for='hora-mensaje'
                                >{message.contenido}</p>

                                {
                                    message.usuario_envia === auth.email && (
                                        message.estado == "Visto" ?

                                            <BlackTooltip title={`Visto por ${nombreRemitente}`}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            </BlackTooltip>
                                            :
                                            <BlackTooltip title={`Enviado por ${message.usuario_envia}`}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </BlackTooltip>

                                    )
                                }

                            </div>

                            <div>
                                <LightTooltip title={new Date(message.createdAt).toLocaleString('en-US', { hour12: true })}>
                                    <a
                                        className='font-bold text-sm mt-3 text-right'>{new Date(message.createdAt).toLocaleTimeString('en-US', { hour12: true })}</a>
                                </LightTooltip>
                            </div>

                        </div>
                    </div>
                </div>
            </li>
        </>
    )
}

export default Message