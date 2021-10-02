import React, { useContext } from 'react'
import AlertContext from '../../context/alert/alertContext'

export const Alerts = () => {
    // Initialize the context
    const alertContext = useContext(AlertContext)

    // Destruction from context
    const { alerts } = alertContext;

    // Check if the alerts is greater than 0, if so, then map through the alerts array and output each alert object in the alerts array.
    return (
        alerts.length > 0 && alerts.map(alert => (
            <div key={alert.id} className={`alert alert-${alert.type}`}>
                <i className="fas fa-info-circle"></i>{' '}{alert.message}
            </div>
        ))
    )
}
