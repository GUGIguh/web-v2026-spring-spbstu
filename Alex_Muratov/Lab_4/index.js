import {parseDateToString, restoredEvents} from "./eventsList.js";

function renderEventsCard(events){
    const container = document.querySelector(".events-container");

    container.innerHTML = restoredEvents.map((event)=> {
        const participantsList = event.participants.map(participant => `<span>${participant}</span>`).join('');
        return(
        `<div class="event-card" id=${event.id}>
            <div class="event-card-head">
                <span class="event-name"> ${event.title} </span>
                <span class="event-date"> ${parseDateToString(event.date)}</span>
            </div>
            <div class="event-card-body"> 
                <div class="participants-section">
                    <span class="title">Участники:</span>
                    <div class="participants-container"> 
             
                        ${participantsList}
                    </div>
                </div>
                <div class="title"> 
                    Всего участников: ${event.participantCount} 
                </div>
                <div>
                    <button> Добавить участника</button>
                </div>
            </div>
            
        </div>
       `
    )}).join('')

}

renderEventsCard(restoredEvents)
