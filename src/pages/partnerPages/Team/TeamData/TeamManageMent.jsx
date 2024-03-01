import React, { useEffect, useState } from 'react'
import TeamDetails from './TeamDetails'
import TimeSchedule from './TimeSchedule'
import sty from "./TeamManageMent.module.css"

const TeamManageMent = () => {

    return (<>
        <>
            <div>

                <div className={sty.hideTeamDetails}>
                    <TeamDetails />
                </div>

                <div className={sty.hideTimeSchedule}>
                    <TimeSchedule />
                </div>

            </div>
        </>
    </>
    )
}

export default TeamManageMent