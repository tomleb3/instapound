import { utilService } from '../../services/utilService'

export const TimeContainer = ({ dateTime }) => {

    return <div className="time-container">
        <time>{utilService.timeSince(dateTime)}</time>
    </div>
}