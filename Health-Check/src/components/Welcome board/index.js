import React, { useContext } from 'react'
import styles from "./styles.module.css"
import { AuthContext } from '../../context'

const WelcomeBoard = () => {
    const {user} = useContext(AuthContext)
  return (
    <div className={styles.container} >
        <h1>Welcome {user?.fullname}</h1>
        <p>It's nice seeing you again</p>
    </div>
  )
}

export default WelcomeBoard